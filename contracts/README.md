# TixOne Smart Contracts

This directory contains all the smart contracts for the TixOne platform - a blockchain-based ticketing system using NFT tickets and fan tokens.

## Contracts Overview

### Core Contracts

1. **TixOneTicket.sol** - Main NFT contract for event tickets
2. **FanToken.sol** - ERC20 token for sports teams with staking rewards
3. **TixOneMarketplace.sol** - Marketplace for buying/selling ticket NFTs
4. **TicketPurchaseManager.sol** - Manages ticket purchases with pricing tiers

### Governance & Staking

5. **TixOneGovernance.sol** - DAO governance for platform decisions
6. **TixOneStaking.sol** - Staking contract for fan tokens and NFTs

### Interfaces

7. **IFanToken.sol** - Interface for fan token interactions

## Deployment

### Prerequisites

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create `.env` file:
\`\`\`bash
cp .env.example .env
# Add your private key and API keys
\`\`\`

### Deploy to Local Network

\`\`\`bash
# Start local Hardhat node
npx hardhat node

# Deploy contracts
npm run deploy:local
\`\`\`

### Deploy to Chiliz Testnet

\`\`\`bash
npm run deploy:testnet
\`\`\`

### Deploy to Chiliz Mainnet

\`\`\`bash
npm run deploy:chiliz
\`\`\`

## Contract Features

### TixOneTicket (NFT Tickets)
- Mint unique NFT tickets for events
- Validate tickets for venue entry
- Transfer restrictions for security
- Event management system

### FanToken (Team Tokens)
- ERC20 tokens for each sports team
- Staking mechanism with rewards
- Loyalty points system
- Team-specific benefits

### TixOneMarketplace
- Buy/sell NFT tickets
- Auction system
- Offer system
- Escrow for secure transactions

### TicketPurchaseManager
- Multi-tier pricing (Standard, Premium, VIP, Hospitality)
- Fan token discounts
- Dynamic pricing based on demand
- Team-specific pricing advantages

## Supported Teams

The platform currently supports fan tokens for:
- FC Barcelona (BAR)
- Paris Saint-Germain (PSG)
- Juventus (JUV)
- Atlético Madrid (ATM)
- Manchester City (MAN)
- AC Milan (ACM)
- Inter Milan (INT)
- Napoli (NAP)
- Galatasaray (GAL)
- FC Porto (POR)

## Security Features

- ReentrancyGuard protection
- Pausable contracts for emergency stops
- Access control with Ownable
- Validated ticket authenticity
- Secure marketplace transactions

## Testing

\`\`\`bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/TixOneTicket.test.js
\`\`\`

## Verification

After deployment, verify contracts on block explorers:

\`\`\`bash
npx hardhat verify --network chiliz CONTRACT_ADDRESS "constructor_arg1" "constructor_arg2"
\`\`\`

## Gas Optimization

Contracts are optimized for gas efficiency:
- Batch operations where possible
- Efficient storage patterns
- Minimal external calls
- Optimized loops and conditionals

## Upgrade Path

Contracts use a proxy pattern for upgradability:
- Implementation contracts can be upgraded
- Storage layout preservation
- Governance-controlled upgrades

## License

MIT License - see LICENSE file for details
