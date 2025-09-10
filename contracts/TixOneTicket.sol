// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFanToken {
    function awardLoyaltyPoints(address _buyer, uint256 _points) external;
}

/**
 * @title TixOneTicket
 * @dev NFT contract for event tickets with enhanced features
 */
contract TixOneTicket is ERC721, ERC721URIStorage, ERC721Burnable, Ownable, Pausable, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct TicketInfo {
        uint256 eventId;
        string eventName;
        uint256 eventDate;
        string venue;
        string section;
        uint256 row;
        uint256 seat;
        uint256 price;
        address paymentToken;
        bool isUsed;
        bool isTransferable;
        uint256 createdAt;
    }

    struct EventInfo {
        string name;
        uint256 date;
        string venue;
        uint256 totalTickets;
        uint256 soldTickets;
        bool isActive;
        address organizer;
        uint256 createdAt;
    }

    // Mappings
    mapping(uint256 => TicketInfo) public tickets;
    mapping(uint256 => EventInfo) public events;
    mapping(uint256 => bool) public validatedTickets;
    mapping(address => bool) public authorizedValidators;
    mapping(address => bool) public acceptedTokens;
    mapping(uint256 => mapping(address => uint256)) public ticketPrices; // eventId => token => price
    address public fanTokenContract;
    mapping(uint256 => uint256) private _eventTicketCounter;

    // Events
    event TicketMinted(uint256 indexed tokenId, uint256 indexed eventId, address indexed owner);
    event TicketValidated(uint256 indexed tokenId, address indexed validator);
    event EventCreated(uint256 indexed eventId, string name, address indexed organizer);
    event TicketTransferRestricted(uint256 indexed tokenId, bool restricted);
    event TicketPurchased(uint256 indexed tokenId, uint256 indexed eventId, address indexed buyer, uint256 price, address paymentToken);

    constructor() ERC721("TixOne Ticket", "TIXONE") {}

    /**
     * @dev Create a new event
     */
    function createEvent(
        string memory _name,
        uint256 _date,
        string memory _venue,
        uint256 _totalTickets
    ) external returns (uint256) {
        uint256 eventId = _eventTicketCounter[0];
        _eventTicketCounter[0]++;

        events[eventId] = EventInfo({
            name: _name,
            date: _date,
            venue: _venue,
            totalTickets: _totalTickets,
            soldTickets: 0,
            isActive: true,
            organizer: msg.sender,
            createdAt: block.timestamp
        });

        emit EventCreated(eventId, _name, msg.sender);
        return eventId;
    }

    /**
     * @dev Mint a new ticket NFT
     */
    function mintTicket(
        address _to,
        uint256 _eventId,
        string memory _section,
        uint256 _row,
        uint256 _seat,
        uint256 _price,
        address _paymentToken,
        string memory _tokenURI
    ) external nonReentrant returns (uint256) {
        require(events[_eventId].isActive, "Event is not active");
        require(events[_eventId].soldTickets < events[_eventId].totalTickets, "Event sold out");
        require(
            msg.sender == events[_eventId].organizer || msg.sender == owner(),
            "Not authorized to mint"
        );

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        tickets[tokenId] = TicketInfo({
            eventId: _eventId,
            eventName: events[_eventId].name,
            eventDate: events[_eventId].date,
            venue: events[_eventId].venue,
            section: _section,
            row: _row,
            seat: _seat,
            price: _price,
            paymentToken: _paymentToken,
            isUsed: false,
            isTransferable: true,
            createdAt: block.timestamp
        });

        events[_eventId].soldTickets++;

        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        emit TicketMinted(tokenId, _eventId, _to);
        return tokenId;
    }

    /**
     * @dev Purchase a ticket using fan tokens
     */
    function purchaseTicket(
        uint256 _eventId,
        string memory _section,
        uint256 _row,
        uint256 _seat,
        address _paymentToken,
        string memory _tokenURI
    ) external nonReentrant returns (uint256) {
        require(events[_eventId].isActive, "Event is not active");
        require(events[_eventId].soldTickets < events[_eventId].totalTickets, "Event sold out");
        require(acceptedTokens[_paymentToken], "Payment token not accepted");
        
        // Get ticket price for this event and token
        uint256 price = ticketPrices[_eventId][_paymentToken];
        require(price > 0, "Price not set for this token");
        
        // Transfer fan tokens from buyer to contract
        IERC20(_paymentToken).transferFrom(msg.sender, address(this), price);
        
        // Award loyalty points (1 point per token spent)
        if (address(fanTokenContract) != address(0)) {
            IFanToken(fanTokenContract).awardLoyaltyPoints(msg.sender, price / 10**18);
        }
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        tickets[tokenId] = TicketInfo({
            eventId: _eventId,
            eventName: events[_eventId].name,
            eventDate: events[_eventId].date,
            venue: events[_eventId].venue,
            section: _section,
            row: _row,
            seat: _seat,
            price: price,
            paymentToken: _paymentToken,
            isUsed: false,
            isTransferable: true,
            createdAt: block.timestamp
        });

        events[_eventId].soldTickets++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        emit TicketPurchased(tokenId, _eventId, msg.sender, price, _paymentToken);
        return tokenId;
    }

    /**
     * @dev Validate a ticket for entry
     */
    function validateTicket(uint256 _tokenId) external {
        require(authorizedValidators[msg.sender], "Not authorized validator");
        require(_exists(_tokenId), "Ticket does not exist");
        require(!tickets[_tokenId].isUsed, "Ticket already used");
        require(!validatedTickets[_tokenId], "Ticket already validated");

        validatedTickets[_tokenId] = true;
        tickets[_tokenId].isUsed = true;

        emit TicketValidated(_tokenId, msg.sender);
    }

    /**
     * @dev Restrict or allow ticket transfers
     */
    function setTicketTransferability(uint256 _tokenId, bool _transferable) external {
        require(
            msg.sender == events[tickets[_tokenId].eventId].organizer || msg.sender == owner(),
            "Not authorized"
        );
        tickets[_tokenId].isTransferable = _transferable;
        emit TicketTransferRestricted(_tokenId, !_transferable);
    }

    /**
     * @dev Override transfer functions to check transferability
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override whenNotPaused {
        if (from != address(0) && to != address(0)) {
            require(tickets[tokenId].isTransferable, "Ticket transfer restricted");
        }
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev Add authorized validator
     */
    function addValidator(address _validator) external onlyOwner {
        authorizedValidators[_validator] = true;
    }

    /**
     * @dev Remove authorized validator
     */
    function removeValidator(address _validator) external onlyOwner {
        authorizedValidators[_validator] = false;
    }

    /**
     * @dev Get ticket information
     */
    function getTicketInfo(uint256 _tokenId) external view returns (TicketInfo memory) {
        require(_exists(_tokenId), "Ticket does not exist");
        return tickets[_tokenId];
    }

    /**
     * @dev Get event information
     */
    function getEventInfo(uint256 _eventId) external view returns (EventInfo memory) {
        return events[_eventId];
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
     * @dev Set ticket price for an event and payment token
     */
    function setTicketPrice(uint256 _eventId, address _paymentToken, uint256 _price) external {
        require(
            msg.sender == events[_eventId].organizer || msg.sender == owner(),
            "Not authorized"
        );
        ticketPrices[_eventId][_paymentToken] = _price;
    }

    /**
     * @dev Add accepted payment token
     */
    function addAcceptedToken(address _token) external onlyOwner {
        acceptedTokens[_token] = true;
    }

    /**
     * @dev Remove accepted payment token
     */
    function removeAcceptedToken(address _token) external onlyOwner {
        acceptedTokens[_token] = false;
    }

    /**
     * @dev Set fan token contract for loyalty points
     */
    function setFanTokenContract(address _fanTokenContract) external onlyOwner {
        fanTokenContract = _fanTokenContract;
    }

    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
