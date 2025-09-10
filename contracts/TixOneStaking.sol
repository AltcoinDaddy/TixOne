// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
 * @title TixOneStaking
 * @dev Staking contract for fan tokens and NFT tickets
 */
contract TixOneStaking is ReentrancyGuard, Pausable, Ownable {
    
    struct StakePool {
        IERC20 stakingToken;
        IERC20 rewardToken;
        uint256 rewardRate; // Rewards per second
        uint256 totalStaked;
        uint256 lastUpdateTime;
        uint256 rewardPerTokenStored;
        bool isActive;
    }

    struct UserStake {
        uint256 amount;
        uint256 rewardPerTokenPaid;
        uint256 rewards;
        uint256 lastStakeTime;
    }

    struct NFTStake {
        uint256 tokenId;
        uint256 stakeTime;
        uint256 multiplier; // Bonus multiplier for NFT staking
    }

    // State variables
    mapping(uint256 => StakePool) public stakePools;
    mapping(uint256 => mapping(address => UserStake)) public userStakes;
    mapping(address => NFTStake[]) public nftStakes;
    mapping(address => bool) public authorizedNFTs;
    
    uint256 public poolCount;
    uint256 public constant PRECISION = 1e18;
    uint256 public nftBonusMultiplier = 150; // 1.5x bonus for NFT holders
    
    // Events
    event PoolCreated(uint256 indexed poolId, address stakingToken, address rewardToken);
    event Staked(uint256 indexed poolId, address indexed user, uint256 amount);
    event Unstaked(uint256 indexed poolId, address indexed user, uint256 amount);
    event RewardsClaimed(uint256 indexed poolId, address indexed user, uint256 amount);
    event NFTStaked(address indexed user, address nftContract, uint256 tokenId);
    event NFTUnstaked(address indexed user, address nftContract, uint256 tokenId);

    /**
     * @dev Create a new staking pool
     */
    function createPool(
        address _stakingToken,
        address _rewardToken,
        uint256 _rewardRate
    ) external onlyOwner returns (uint256) {
        uint256 poolId = poolCount++;
        
        stakePools[poolId] = StakePool({
            stakingToken: IERC20(_stakingToken),
            rewardToken: IERC20(_rewardToken),
            rewardRate: _rewardRate,
            totalStaked: 0,
            lastUpdateTime: block.timestamp,
            rewardPerTokenStored: 0,
            isActive: true
        });

        emit PoolCreated(poolId, _stakingToken, _rewardToken);
        return poolId;
    }

    /**
     * @dev Stake tokens in a pool
     */
    function stake(uint256 _poolId, uint256 _amount) external nonReentrant whenNotPaused {
        require(_amount > 0, "Cannot stake 0");
        require(stakePools[_poolId].isActive, "Pool not active");

        _updateReward(_poolId, msg.sender);

        StakePool storage pool = stakePools[_poolId];
        UserStake storage userStake = userStakes[_poolId][msg.sender];

        pool.stakingToken.transferFrom(msg.sender, address(this), _amount);
        
        pool.totalStaked += _amount;
        userStake.amount += _amount;
        userStake.lastStakeTime = block.timestamp;

        emit Staked(_poolId, msg.sender, _amount);
    }

    /**
     * @dev Unstake tokens from a pool
     */
    function unstake(uint256 _poolId, uint256 _amount) external nonReentrant {
        require(_amount > 0, "Cannot unstake 0");
        require(userStakes[_poolId][msg.sender].amount >= _amount, "Insufficient staked amount");

        _updateReward(_poolId, msg.sender);

        StakePool storage pool = stakePools[_poolId];
        UserStake storage userStake = userStakes[_poolId][msg.sender];

        pool.totalStaked -= _amount;
        userStake.amount -= _amount;

        pool.stakingToken.transfer(msg.sender, _amount);

        emit Unstaked(_poolId, msg.sender, _amount);
    }

    /**
     * @dev Claim rewards from a pool
     */
    function claimRewards(uint256 _poolId) external nonReentrant {
        _updateReward(_poolId, msg.sender);

        UserStake storage userStake = userStakes[_poolId][msg.sender];
        uint256 reward = userStake.rewards;

        if (reward > 0) {
            userStake.rewards = 0;
            
            // Apply NFT bonus if user has staked NFTs
            uint256 bonusReward = _calculateNFTBonus(msg.sender, reward);
            uint256 totalReward = reward + bonusReward;

            stakePools[_poolId].rewardToken.transfer(msg.sender, totalReward);
            emit RewardsClaimed(_poolId, msg.sender, totalReward);
        }
    }

    /**
     * @dev Stake NFT for bonus rewards
     */
    function stakeNFT(address _nftContract, uint256 _tokenId) external nonReentrant {
        require(authorizedNFTs[_nftContract], "NFT contract not authorized");
        
        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);
        
        nftStakes[msg.sender].push(NFTStake({
            tokenId: _tokenId,
            stakeTime: block.timestamp,
            multiplier: nftBonusMultiplier
        }));

        emit NFTStaked(msg.sender, _nftContract, _tokenId);
    }

    /**
     * @dev Unstake NFT
     */
    function unstakeNFT(address _nftContract, uint256 _index) external nonReentrant {
        require(_index < nftStakes[msg.sender].length, "Invalid index");
        
        NFTStake memory nftStake = nftStakes[msg.sender][_index];
        
        // Remove from array
        nftStakes[msg.sender][_index] = nftStakes[msg.sender][nftStakes[msg.sender].length - 1];
        nftStakes[msg.sender].pop();

        IERC721(_nftContract).transferFrom(address(this), msg.sender, nftStake.tokenId);
        
        emit NFTUnstaked(msg.sender, _nftContract, nftStake.tokenId);
    }

    /**
     * @dev Update reward for a user
     */
    function _updateReward(uint256 _poolId, address _account) internal {
        StakePool storage pool = stakePools[_poolId];
        
        pool.rewardPerTokenStored = rewardPerToken(_poolId);
        pool.lastUpdateTime = block.timestamp;

        if (_account != address(0)) {
            UserStake storage userStake = userStakes[_poolId][_account];
            userStake.rewards = earned(_poolId, _account);
            userStake.rewardPerTokenPaid = pool.rewardPerTokenStored;
        }
    }

    /**
     * @dev Calculate reward per token
     */
    function rewardPerToken(uint256 _poolId) public view returns (uint256) {
        StakePool memory pool = stakePools[_poolId];
        
        if (pool.totalStaked == 0) {
            return pool.rewardPerTokenStored;
        }

        return pool.rewardPerTokenStored + 
            (((block.timestamp - pool.lastUpdateTime) * pool.rewardRate * PRECISION) / pool.totalStaked);
    }

    /**
     * @dev Calculate earned rewards for a user
     */
    function earned(uint256 _poolId, address _account) public view returns (uint256) {
        UserStake memory userStake = userStakes[_poolId][_account];
        
        return ((userStake.amount * (rewardPerToken(_poolId) - userStake.rewardPerTokenPaid)) / PRECISION) + 
               userStake.rewards;
    }

    /**
     * @dev Calculate NFT bonus
     */
    function _calculateNFTBonus(address _user, uint256 _baseReward) internal view returns (uint256) {
        uint256 nftCount = nftStakes[_user].length;
        if (nftCount == 0) return 0;

        uint256 bonusPercentage = (nftCount * (nftBonusMultiplier - 100)) / 100;
        return (_baseReward * bonusPercentage) / 100;
    }

    /**
     * @dev Get user's staked NFTs
     */
    function getUserNFTStakes(address _user) external view returns (NFTStake[] memory) {
        return nftStakes[_user];
    }

    /**
     * @dev Add authorized NFT contract
     */
    function addAuthorizedNFT(address _nftContract) external onlyOwner {
        authorizedNFTs[_nftContract] = true;
    }

    /**
     * @dev Remove authorized NFT contract
     */
    function removeAuthorizedNFT(address _nftContract) external onlyOwner {
        authorizedNFTs[_nftContract] = false;
    }

    /**
     * @dev Update NFT bonus multiplier
     */
    function updateNFTBonusMultiplier(uint256 _multiplier) external onlyOwner {
        nftBonusMultiplier = _multiplier;
    }

    /**
     * @dev Update pool reward rate
     */
    function updatePoolRewardRate(uint256 _poolId, uint256 _newRate) external onlyOwner {
        _updateReward(_poolId, address(0));
        stakePools[_poolId].rewardRate = _newRate;
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
     * @dev Emergency withdraw (only owner)
     */
    function emergencyWithdraw(address _token, uint256 _amount) external onlyOwner {
        IERC20(_token).transfer(owner(), _amount);
    }
}
