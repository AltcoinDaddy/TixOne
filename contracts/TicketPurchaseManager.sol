// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TixOneTicket.sol";
import "./IFanToken.sol";

/**
 * @title TicketPurchaseManager
 * @dev Manages ticket purchases with fan tokens and pricing
 */
contract TicketPurchaseManager is ReentrancyGuard, Ownable {
    
    struct PricingTier {
        string name; // "Standard", "Premium", "VIP", "Hospitality"
        uint256 basePrice; // Base price in USD (scaled by 1e18)
        mapping(address => uint256) tokenPrices; // Fan token specific prices
        bool isActive;
    }

    struct EventPricing {
        mapping(string => PricingTier) tiers;
        string[] tierNames;
        bool dynamicPricing; // Enable demand-based pricing
        uint256 demandMultiplier; // Current demand multiplier (1e18 = 1x)
    }

    TixOneTicket public ticketContract;
    
    // Mappings
    mapping(uint256 => EventPricing) public eventPricing; // eventId => pricing
    mapping(address => bool) public acceptedFanTokens;
    mapping(address => uint256) public tokenDiscounts; // Fan token => discount percentage (100 = 1%)
    mapping(address => bool) public authorizedPriceSetters;
    
    // Events
    event TicketPurchased(
        uint256 indexed eventId,
        uint256 indexed tokenId,
        address indexed buyer,
        string tier,
        uint256 price,
        address paymentToken
    );
    event PriceUpdated(uint256 indexed eventId, string tier, address token, uint256 newPrice);
    event DiscountUpdated(address indexed token, uint256 discount);

    constructor(address _ticketContract) {
        ticketContract = TixOneTicket(_ticketContract);
    }

    /**
     * @dev Purchase ticket with fan tokens
     */
    function purchaseTicket(
        uint256 _eventId,
        string memory _tier,
        string memory _section,
        uint256 _row,
        uint256 _seat,
        address _fanToken,
        string memory _tokenURI
    ) external nonReentrant returns (uint256) {
        require(acceptedFanTokens[_fanToken], "Fan token not accepted");
        
        // Calculate final price with discounts and demand
        uint256 finalPrice = calculateTicketPrice(_eventId, _tier, _fanToken);
        require(finalPrice > 0, "Price not set");
        
        // Check user has enough tokens
        require(IERC20(_fanToken).balanceOf(msg.sender) >= finalPrice, "Insufficient token balance");
        
        // Transfer fan tokens to contract
        IERC20(_fanToken).transferFrom(msg.sender, address(this), finalPrice);
        
        // Mint ticket NFT
        uint256 tokenId = ticketContract.mintTicket(
            msg.sender,
            _eventId,
            _section,
            _row,
            _seat,
            finalPrice,
            _fanToken,
            _tokenURI
        );
        
        // Award loyalty points
        _awardLoyaltyPoints(msg.sender, _fanToken, finalPrice);
        
        // Update demand-based pricing
        _updateDemandPricing(_eventId);
        
        emit TicketPurchased(_eventId, tokenId, msg.sender, _tier, finalPrice, _fanToken);
        return tokenId;
    }

    /**
     * @dev Calculate ticket price with all modifiers
     */
    function calculateTicketPrice(
        uint256 _eventId,
        string memory _tier,
        address _fanToken
    ) public view returns (uint256) {
        EventPricing storage pricing = eventPricing[_eventId];
        PricingTier storage tier = pricing.tiers[_tier];
        
        require(tier.isActive, "Tier not active");
        
        uint256 basePrice = tier.tokenPrices[_fanToken];
        require(basePrice > 0, "Price not set for this token");
        
        // Apply fan token discount
        uint256 discount = tokenDiscounts[_fanToken];
        if (discount > 0) {
            basePrice = basePrice - (basePrice * discount / 10000);
        }
        
        // Apply demand-based pricing
        if (pricing.dynamicPricing) {
            basePrice = (basePrice * pricing.demandMultiplier) / 1e18;
        }
        
        return basePrice;
    }

    /**
     * @dev Set pricing for an event tier
     */
    function setEventTierPricing(
        uint256 _eventId,
        string memory _tierName,
        address[] memory _fanTokens,
        uint256[] memory _prices
    ) external {
        require(
            authorizedPriceSetters[msg.sender] || msg.sender == owner(),
            "Not authorized to set prices"
        );
        require(_fanTokens.length == _prices.length, "Arrays length mismatch");
        
        EventPricing storage pricing = eventPricing[_eventId];
        PricingTier storage tier = pricing.tiers[_tierName];
        
        // Add tier name if new
        bool tierExists = false;
        for (uint i = 0; i < pricing.tierNames.length; i++) {
            if (keccak256(bytes(pricing.tierNames[i])) == keccak256(bytes(_tierName))) {
                tierExists = true;
                break;
            }
        }
        if (!tierExists) {
            pricing.tierNames.push(_tierName);
        }
        
        tier.name = _tierName;
        tier.isActive = true;
        
        for (uint i = 0; i < _fanTokens.length; i++) {
            tier.tokenPrices[_fanTokens[i]] = _prices[i];
            emit PriceUpdated(_eventId, _tierName, _fanTokens[i], _prices[i]);
        }
    }

    /**
     * @dev Set fan token discount
     */
    function setFanTokenDiscount(address _fanToken, uint256 _discountBps) external onlyOwner {
        require(_discountBps <= 5000, "Discount too high"); // Max 50%
        tokenDiscounts[_fanToken] = _discountBps;
        emit DiscountUpdated(_fanToken, _discountBps);
    }

    /**
     * @dev Enable dynamic pricing for an event
     */
    function enableDynamicPricing(uint256 _eventId, bool _enabled) external onlyOwner {
        eventPricing[_eventId].dynamicPricing = _enabled;
        if (_enabled) {
            eventPricing[_eventId].demandMultiplier = 1e18; // Start at 1x
        }
    }

    /**
     * @dev Add accepted fan token
     */
    function addAcceptedFanToken(address _fanToken) external onlyOwner {
        acceptedFanTokens[_fanToken] = true;
    }

    /**
     * @dev Remove accepted fan token
     */
    function removeAcceptedFanToken(address _fanToken) external onlyOwner {
        acceptedFanTokens[_fanToken] = false;
    }

    /**
     * @dev Add authorized price setter
     */
    function addPriceSetter(address _setter) external onlyOwner {
        authorizedPriceSetters[_setter] = true;
    }

    /**
     * @dev Award loyalty points for purchase
     */
    function _awardLoyaltyPoints(address _user, address _fanToken, uint256 _amount) internal {
        try IFanToken(_fanToken).awardLoyaltyPoints(_user, _amount / 1e18) {
            // Loyalty points awarded successfully
        } catch {
            // Silently fail if fan token doesn't support loyalty points
        }
    }

    /**
     * @dev Update demand-based pricing
     */
    function _updateDemandPricing(uint256 _eventId) internal {
        EventPricing storage pricing = eventPricing[_eventId];
        if (!pricing.dynamicPricing) return;
        
        // Simple demand algorithm - increase price by 1% per purchase
        // In production, this would be more sophisticated
        pricing.demandMultiplier = (pricing.demandMultiplier * 101) / 100;
        
        // Cap at 2x original price
        if (pricing.demandMultiplier > 2e18) {
            pricing.demandMultiplier = 2e18;
        }
    }

    /**
     * @dev Get event tier information
     */
    function getEventTiers(uint256 _eventId) external view returns (string[] memory) {
        return eventPricing[_eventId].tierNames;
    }

    /**
     * @dev Get tier price for specific fan token
     */
    function getTierPrice(
        uint256 _eventId,
        string memory _tier,
        address _fanToken
    ) external view returns (uint256) {
        return eventPricing[_eventId].tiers[_tier].tokenPrices[_fanToken];
    }

    /**
     * @dev Withdraw collected fan tokens
     */
    function withdrawTokens(address _token, uint256 _amount) external onlyOwner {
        IERC20(_token).transfer(owner(), _amount);
    }
}
