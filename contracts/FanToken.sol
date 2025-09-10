// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title FanToken
 * @dev ERC20 token for sports teams with staking and rewards
 */
contract FanToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ReentrancyGuard {
    
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 lastRewardTime;
        uint256 pendingRewards;
    }

    struct TeamInfo {
        string name;
        string symbol;
        uint256 totalSupply;
        uint256 rewardRate; // Rewards per second per token
        bool isActive;
        address teamWallet;
    }

    // State variables
    TeamInfo public teamInfo;
    uint256 public constant REWARD_PRECISION = 1e18;
    uint256 public minimumStakeAmount = 100 * 10**18; // 100 tokens
    uint256 public stakingRewardPool;
    
    // Mappings
    mapping(address => StakeInfo) public stakes;
    mapping(address => bool) public authorizedMinters;
    mapping(address => uint256) public loyaltyPoints;
    
    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event LoyaltyPointsEarned(address indexed user, uint256 points);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        uint256 _rewardRate,
        address _teamWallet
    ) ERC20(_name, _symbol) {
        teamInfo = TeamInfo({
            name: _name,
            symbol: _symbol,
            totalSupply: _initialSupply,
            rewardRate: _rewardRate,
            isActive: true,
            teamWallet: _teamWallet
        });

        _mint(msg.sender, _initialSupply);
        stakingRewardPool = _initialSupply / 10; // 10% for rewards
    }

    /**
     * @dev Stake tokens to earn rewards
     */
    function stake(uint256 _amount) external nonReentrant whenNotPaused {
        require(_amount >= minimumStakeAmount, "Amount below minimum");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");

        // Update pending rewards before staking
        _updateRewards(msg.sender);

        // Transfer tokens to contract
        _transfer(msg.sender, address(this), _amount);

        // Update stake info
        stakes[msg.sender].amount += _amount;
        stakes[msg.sender].startTime = block.timestamp;
        stakes[msg.sender].lastRewardTime = block.timestamp;

        emit Staked(msg.sender, _amount);
    }

    /**
     * @dev Unstake tokens
     */
    function unstake(uint256 _amount) external nonReentrant {
        require(stakes[msg.sender].amount >= _amount, "Insufficient staked amount");

        // Update and claim rewards
        _updateRewards(msg.sender);
        _claimRewards(msg.sender);

        // Update stake info
        stakes[msg.sender].amount -= _amount;

        // Transfer tokens back to user
        _transfer(address(this), msg.sender, _amount);

        emit Unstaked(msg.sender, _amount);
    }

    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external nonReentrant {
        _updateRewards(msg.sender);
        _claimRewards(msg.sender);
    }

    /**
     * @dev Internal function to update rewards
     */
    function _updateRewards(address _user) internal {
        StakeInfo storage userStake = stakes[_user];
        
        if (userStake.amount > 0) {
            uint256 timeElapsed = block.timestamp - userStake.lastRewardTime;
            uint256 rewards = (userStake.amount * teamInfo.rewardRate * timeElapsed) / REWARD_PRECISION;
            
            userStake.pendingRewards += rewards;
            userStake.lastRewardTime = block.timestamp;
        }
    }

    /**
     * @dev Internal function to claim rewards
     */
    function _claimRewards(address _user) internal {
        uint256 rewards = stakes[_user].pendingRewards;
        
        if (rewards > 0 && stakingRewardPool >= rewards) {
            stakes[_user].pendingRewards = 0;
            stakingRewardPool -= rewards;
            
            _mint(_user, rewards);
            
            // Award loyalty points
            loyaltyPoints[_user] += rewards / 10**18;
            
            emit RewardsClaimed(_user, rewards);
            emit LoyaltyPointsEarned(_user, rewards / 10**18);
        }
    }

    /**
     * @dev Get pending rewards for a user
     */
    function getPendingRewards(address _user) external view returns (uint256) {
        StakeInfo memory userStake = stakes[_user];
        
        if (userStake.amount == 0) return userStake.pendingRewards;
        
        uint256 timeElapsed = block.timestamp - userStake.lastRewardTime;
        uint256 newRewards = (userStake.amount * teamInfo.rewardRate * timeElapsed) / REWARD_PRECISION;
        
        return userStake.pendingRewards + newRewards;
    }

    /**
     * @dev Award loyalty points for ticket purchases
     */
    function awardLoyaltyPoints(address _user, uint256 _points) external {
        require(authorizedMinters[msg.sender], "Not authorized");
        loyaltyPoints[_user] += _points;
        emit LoyaltyPointsEarned(_user, _points);
    }

    /**
     * @dev Mint tokens (only authorized)
     */
    function mint(address _to, uint256 _amount) external {
        require(authorizedMinters[msg.sender], "Not authorized to mint");
        _mint(_to, _amount);
    }

    /**
     * @dev Add authorized minter
     */
    function addMinter(address _minter) external onlyOwner {
        authorizedMinters[_minter] = true;
    }

    /**
     * @dev Remove authorized minter
     */
    function removeMinter(address _minter) external onlyOwner {
        authorizedMinters[_minter] = false;
    }

    /**
     * @dev Update reward rate
     */
    function updateRewardRate(uint256 _newRate) external onlyOwner {
        teamInfo.rewardRate = _newRate;
    }

    /**
     * @dev Add to reward pool
     */
    function addToRewardPool(uint256 _amount) external onlyOwner {
        stakingRewardPool += _amount;
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

    // Override required functions
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
