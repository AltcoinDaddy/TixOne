// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/**
 * @title TixOneMarketplace
 * @dev Marketplace for buying and selling ticket NFTs
 */
contract TixOneMarketplace is ReentrancyGuard, Pausable, Ownable, IERC721Receiver {
    
    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 price;
        address paymentToken;
        bool isActive;
        uint256 createdAt;
        uint256 expiresAt;
    }

    struct Auction {
        uint256 tokenId;
        address seller;
        uint256 startingPrice;
        uint256 currentBid;
        address highestBidder;
        address paymentToken;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        mapping(address => uint256) bids;
    }

    struct Offer {
        uint256 tokenId;
        address buyer;
        uint256 price;
        address paymentToken;
        uint256 expiresAt;
        bool isActive;
    }

    // State variables
    IERC721 public ticketContract;
    uint256 public marketplaceFee = 250; // 2.5%
    uint256 public constant FEE_DENOMINATOR = 10000;
    address public feeRecipient;
    
    // Mappings
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => Offer[]) public offers;
    mapping(address => bool) public acceptedPaymentTokens;
    mapping(address => uint256) public userEscrow;
    
    // Counters
    uint256 public totalListings;
    uint256 public totalAuctions;
    
    // Events
    event ItemListed(uint256 indexed tokenId, address indexed seller, uint256 price, address paymentToken);
    event ItemSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event ListingCancelled(uint256 indexed tokenId, address indexed seller);
    event AuctionCreated(uint256 indexed tokenId, address indexed seller, uint256 startingPrice, uint256 endTime);
    event BidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed tokenId, address indexed winner, uint256 amount);
    event OfferMade(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event OfferAccepted(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);

    constructor(address _ticketContract, address _feeRecipient) {
        ticketContract = IERC721(_ticketContract);
        feeRecipient = _feeRecipient;
    }

    /**
     * @dev List an item for sale
     */
    function listItem(
        uint256 _tokenId,
        uint256 _price,
        address _paymentToken,
        uint256 _duration
    ) external nonReentrant whenNotPaused {
        require(ticketContract.ownerOf(_tokenId) == msg.sender, "Not token owner");
        require(_price > 0, "Price must be greater than 0");
        require(acceptedPaymentTokens[_paymentToken], "Payment token not accepted");
        require(!listings[_tokenId].isActive, "Item already listed");

        // Transfer NFT to marketplace
        ticketContract.safeTransferFrom(msg.sender, address(this), _tokenId);

        listings[_tokenId] = Listing({
            tokenId: _tokenId,
            seller: msg.sender,
            price: _price,
            paymentToken: _paymentToken,
            isActive: true,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + _duration
        });

        totalListings++;
        emit ItemListed(_tokenId, msg.sender, _price, _paymentToken);
    }

    /**
     * @dev Buy a listed item
     */
    function buyItem(uint256 _tokenId) external nonReentrant whenNotPaused {
        Listing storage listing = listings[_tokenId];
        require(listing.isActive, "Item not for sale");
        require(block.timestamp <= listing.expiresAt, "Listing expired");
        require(msg.sender != listing.seller, "Cannot buy own item");

        uint256 totalPrice = listing.price;
        uint256 fee = (totalPrice * marketplaceFee) / FEE_DENOMINATOR;
        uint256 sellerAmount = totalPrice - fee;

        // Transfer payment
        IERC20(listing.paymentToken).transferFrom(msg.sender, listing.seller, sellerAmount);
        IERC20(listing.paymentToken).transferFrom(msg.sender, feeRecipient, fee);

        // Transfer NFT to buyer
        ticketContract.safeTransferFrom(address(this), msg.sender, _tokenId);

        // Mark listing as inactive
        listing.isActive = false;

        emit ItemSold(_tokenId, listing.seller, msg.sender, totalPrice);
    }

    /**
     * @dev Cancel a listing
     */
    function cancelListing(uint256 _tokenId) external nonReentrant {
        Listing storage listing = listings[_tokenId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.isActive, "Listing not active");

        // Return NFT to seller
        ticketContract.safeTransferFrom(address(this), msg.sender, _tokenId);

        listing.isActive = false;
        emit ListingCancelled(_tokenId, msg.sender);
    }

    /**
     * @dev Create an auction
     */
    function createAuction(
        uint256 _tokenId,
        uint256 _startingPrice,
        address _paymentToken,
        uint256 _duration
    ) external nonReentrant whenNotPaused {
        require(ticketContract.ownerOf(_tokenId) == msg.sender, "Not token owner");
        require(_startingPrice > 0, "Starting price must be greater than 0");
        require(acceptedPaymentTokens[_paymentToken], "Payment token not accepted");
        require(!auctions[_tokenId].isActive, "Auction already exists");

        // Transfer NFT to marketplace
        ticketContract.safeTransferFrom(msg.sender, address(this), _tokenId);

        Auction storage auction = auctions[_tokenId];
        auction.tokenId = _tokenId;
        auction.seller = msg.sender;
        auction.startingPrice = _startingPrice;
        auction.currentBid = 0;
        auction.paymentToken = _paymentToken;
        auction.startTime = block.timestamp;
        auction.endTime = block.timestamp + _duration;
        auction.isActive = true;

        totalAuctions++;
        emit AuctionCreated(_tokenId, msg.sender, _startingPrice, auction.endTime);
    }

    /**
     * @dev Place a bid on an auction
     */
    function placeBid(uint256 _tokenId, uint256 _bidAmount) external nonReentrant whenNotPaused {
        Auction storage auction = auctions[_tokenId];
        require(auction.isActive, "Auction not active");
        require(block.timestamp <= auction.endTime, "Auction ended");
        require(msg.sender != auction.seller, "Cannot bid on own auction");
        require(_bidAmount >= auction.startingPrice, "Bid below starting price");
        require(_bidAmount > auction.currentBid, "Bid too low");

        // Return previous bid to previous bidder
        if (auction.highestBidder != address(0)) {
            userEscrow[auction.highestBidder] += auction.currentBid;
        }

        // Transfer new bid to escrow
        IERC20(auction.paymentToken).transferFrom(msg.sender, address(this), _bidAmount);

        auction.currentBid = _bidAmount;
        auction.highestBidder = msg.sender;
        auction.bids[msg.sender] = _bidAmount;

        emit BidPlaced(_tokenId, msg.sender, _bidAmount);
    }

    /**
     * @dev End an auction
     */
    function endAuction(uint256 _tokenId) external nonReentrant {
        Auction storage auction = auctions[_tokenId];
        require(auction.isActive, "Auction not active");
        require(block.timestamp > auction.endTime, "Auction still ongoing");

        auction.isActive = false;

        if (auction.highestBidder != address(0)) {
            uint256 fee = (auction.currentBid * marketplaceFee) / FEE_DENOMINATOR;
            uint256 sellerAmount = auction.currentBid - fee;

            // Transfer payment to seller and fee to recipient
            IERC20(auction.paymentToken).transfer(auction.seller, sellerAmount);
            IERC20(auction.paymentToken).transfer(feeRecipient, fee);

            // Transfer NFT to winner
            ticketContract.safeTransferFrom(address(this), auction.highestBidder, _tokenId);

            emit AuctionEnded(_tokenId, auction.highestBidder, auction.currentBid);
        } else {
            // No bids, return NFT to seller
            ticketContract.safeTransferFrom(address(this), auction.seller, _tokenId);
        }
    }

    /**
     * @dev Make an offer on a token
     */
    function makeOffer(
        uint256 _tokenId,
        uint256 _price,
        address _paymentToken,
        uint256 _duration
    ) external nonReentrant whenNotPaused {
        require(acceptedPaymentTokens[_paymentToken], "Payment token not accepted");
        require(_price > 0, "Price must be greater than 0");

        // Transfer payment to escrow
        IERC20(_paymentToken).transferFrom(msg.sender, address(this), _price);

        offers[_tokenId].push(Offer({
            tokenId: _tokenId,
            buyer: msg.sender,
            price: _price,
            paymentToken: _paymentToken,
            expiresAt: block.timestamp + _duration,
            isActive: true
        }));

        emit OfferMade(_tokenId, msg.sender, _price);
    }

    /**
     * @dev Accept an offer
     */
    function acceptOffer(uint256 _tokenId, uint256 _offerIndex) external nonReentrant {
        require(ticketContract.ownerOf(_tokenId) == msg.sender, "Not token owner");
        require(_offerIndex < offers[_tokenId].length, "Invalid offer index");

        Offer storage offer = offers[_tokenId][_offerIndex];
        require(offer.isActive, "Offer not active");
        require(block.timestamp <= offer.expiresAt, "Offer expired");

        uint256 fee = (offer.price * marketplaceFee) / FEE_DENOMINATOR;
        uint256 sellerAmount = offer.price - fee;

        // Transfer payment
        IERC20(offer.paymentToken).transfer(msg.sender, sellerAmount);
        IERC20(offer.paymentToken).transfer(feeRecipient, fee);

        // Transfer NFT
        ticketContract.safeTransferFrom(msg.sender, offer.buyer, _tokenId);

        offer.isActive = false;
        emit OfferAccepted(_tokenId, msg.sender, offer.buyer, offer.price);
    }

    /**
     * @dev Withdraw from escrow
     */
    function withdrawEscrow() external nonReentrant {
        uint256 amount = userEscrow[msg.sender];
        require(amount > 0, "No funds in escrow");

        userEscrow[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    /**
     * @dev Add accepted payment token
     */
    function addPaymentToken(address _token) external onlyOwner {
        acceptedPaymentTokens[_token] = true;
    }

    /**
     * @dev Remove accepted payment token
     */
    function removePaymentToken(address _token) external onlyOwner {
        acceptedPaymentTokens[_token] = false;
    }

    /**
     * @dev Update marketplace fee
     */
    function updateMarketplaceFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 1000, "Fee too high"); // Max 10%
        marketplaceFee = _newFee;
    }

    /**
     * @dev Update fee recipient
     */
    function updateFeeRecipient(address _newRecipient) external onlyOwner {
        feeRecipient = _newRecipient;
    }

    /**
     * @dev Get offers for a token
     */
    function getOffers(uint256 _tokenId) external view returns (Offer[] memory) {
        return offers[_tokenId];
    }

    /**
     * @dev Pause contract
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Handle NFT transfers
     */
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
