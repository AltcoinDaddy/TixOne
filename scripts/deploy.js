const { ethers, network } = require("hardhat")

async function main() {
  console.log("Deploying TixOne Smart Contracts...")

  // Get deployer account
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with account:", deployer.address)

  // Deploy TixOne Ticket NFT Contract
  console.log("\n1. Deploying TixOneTicket...")
  const TixOneTicket = await ethers.getContractFactory("TixOneTicket")
  const ticketContract = await TixOneTicket.deploy()
  await ticketContract.deployed()
  console.log("TixOneTicket deployed to:", ticketContract.address)

  // Deploy All Fan Token Contracts
  console.log("\n2. Deploying All Fan Tokens...")
  const FanToken = await ethers.getContractFactory("FanToken")

  // Fan token configurations
  const fanTokens = [
    {
      name: "FC Barcelona Fan Token",
      symbol: "BAR",
      supply: "1000000",
      rewardRate: "0.1",
    },
    {
      name: "Paris Saint-Germain Fan Token",
      symbol: "PSG",
      supply: "1000000",
      rewardRate: "0.1",
    },
    {
      name: "Juventus Fan Token",
      symbol: "JUV",
      supply: "800000",
      rewardRate: "0.08",
    },
    {
      name: "Atlético Madrid Fan Token",
      symbol: "ATM",
      supply: "600000",
      rewardRate: "0.07",
    },
    {
      name: "Manchester City Fan Token",
      symbol: "MAN",
      supply: "900000",
      rewardRate: "0.09",
    },
    {
      name: "AC Milan Fan Token",
      symbol: "ACM",
      supply: "700000",
      rewardRate: "0.08",
    },
    {
      name: "Inter Milan Fan Token",
      symbol: "INT",
      supply: "650000",
      rewardRate: "0.07",
    },
    {
      name: "Napoli Fan Token",
      symbol: "NAP",
      supply: "500000",
      rewardRate: "0.06",
    },
    {
      name: "Galatasaray Fan Token",
      symbol: "GAL",
      supply: "400000",
      rewardRate: "0.05",
    },
    {
      name: "FC Porto Fan Token",
      symbol: "POR",
      supply: "350000",
      rewardRate: "0.05",
    },
  ]

  const deployedTokens = {}

  for (const tokenConfig of fanTokens) {
    console.log(`Deploying ${tokenConfig.symbol} Token...`)
    const token = await FanToken.deploy(
      tokenConfig.name,
      tokenConfig.symbol,
      ethers.utils.parseEther(tokenConfig.supply),
      ethers.utils.parseEther(tokenConfig.rewardRate),
      deployer.address,
    )
    await token.deployed()
    deployedTokens[tokenConfig.symbol] = token
    console.log(`${tokenConfig.symbol} Token deployed to:`, token.address)
  }

  // Deploy Marketplace
  console.log("\n4. Deploying TixOneMarketplace...")
  const TixOneMarketplace = await ethers.getContractFactory("TixOneMarketplace")
  const marketplace = await TixOneMarketplace.deploy(
    ticketContract.address,
    deployer.address, // Fee recipient
  )
  await marketplace.deployed()
  console.log("TixOneMarketplace deployed to:", marketplace.address)

  // Deploy Staking Contract
  console.log("\n5. Deploying TixOneStaking...")
  const TixOneStaking = await ethers.getContractFactory("TixOneStaking")
  const staking = await TixOneStaking.deploy()
  await staking.deployed()
  console.log("TixOneStaking deployed to:", staking.address)

  // Deploy Timelock for Governance
  console.log("\n6. Deploying TimelockController...")
  const TimelockController = await ethers.getContractFactory("TimelockController")
  const timelock = await TimelockController.deploy(
    86400, // 1 day delay
    [deployer.address], // Proposers
    [deployer.address], // Executors
    deployer.address, // Admin
  )
  await timelock.deployed()
  console.log("TimelockController deployed to:", timelock.address)

  // Deploy Governance
  console.log("\n7. Deploying TixOneGovernance...")
  const TixOneGovernance = await ethers.getContractFactory("TixOneGovernance")
  const governance = await TixOneGovernance.deploy(
    deployedTokens["BAR"].address, // Voting token (using BAR as example)
    timelock.address,
    4, // 4% quorum
    17280, // ~3 days voting period (assuming 15s blocks)
    1, // 1 block voting delay
  )
  await governance.deployed()
  console.log("TixOneGovernance deployed to:", governance.address)

  // Setup initial configurations
  console.log("\n8. Setting up initial configurations...")

  // Deploy Ticket Purchase Manager
  console.log("Deploying TicketPurchaseManager...")
  const TicketPurchaseManager = await ethers.getContractFactory("TicketPurchaseManager")
  const purchaseManager = await TicketPurchaseManager.deploy(ticketContract.address)
  await purchaseManager.deployed()
  console.log("TicketPurchaseManager deployed to:", purchaseManager.address)

  // Add all accepted fan tokens to purchase manager
  console.log("Adding all fan tokens as accepted...")
  for (const [symbol, token] of Object.entries(deployedTokens)) {
    await purchaseManager.addAcceptedFanToken(token.address)
    console.log(`Added ${symbol} as accepted fan token`)
  }

  // Set fan token discounts based on team popularity/home advantage
  const discounts = {
    BAR: 1000, // 10% - Home team advantage
    PSG: 800, // 8%
    JUV: 600, // 6%
    MAN: 700, // 7%
    ACM: 500, // 5%
    INT: 500, // 5%
    ATM: 400, // 4%
    NAP: 300, // 3%
    GAL: 200, // 2%
    POR: 200, // 2%
  }

  for (const [symbol, discount] of Object.entries(discounts)) {
    if (deployedTokens[symbol]) {
      await purchaseManager.setFanTokenDiscount(deployedTokens[symbol].address, discount)
      console.log(`Set ${discount / 100}% discount for ${symbol} token holders`)
    }
  }

  // Add Hospitality tier for premium experience
  const hospitalityPrices = {
    BAR: "750",
    PSG: "900",
    JUV: "780",
    MAN: "870",
    ACM: "825",
    INT: "825",
    ATM: "930",
    NAP: "975",
    GAL: "1020",
    POR: "1050",
  }

  // Set comprehensive ticket pricing for all fan tokens
  console.log("Setting comprehensive ticket pricing...")

  const allTokenAddresses = Object.values(deployedTokens).map((token) => token.address)
  const allTokenSymbols = Object.keys(deployedTokens)

  // Standard tier pricing (different prices based on team rivalry/popularity)
  const standardPrices = {
    BAR: "150", // Home team advantage
    PSG: "180",
    JUV: "160",
    MAN: "170",
    ACM: "165",
    INT: "165",
    ATM: "175",
    NAP: "185",
    GAL: "190",
    POR: "195",
  }

  const premiumPrices = {
    BAR: "300",
    PSG: "350",
    JUV: "320",
    MAN: "340",
    ACM: "330",
    INT: "330",
    ATM: "360",
    NAP: "370",
    GAL: "380",
    POR: "390",
  }

  const vipPrices = {
    BAR: "500",
    PSG: "600",
    JUV: "520",
    MAN: "580",
    ACM: "550",
    INT: "550",
    ATM: "620",
    NAP: "650",
    GAL: "680",
    POR: "700",
  }

  // Set pricing for each tier
  await purchaseManager.setEventTierPricing(
    0,
    "Standard",
    allTokenAddresses,
    allTokenSymbols.map((symbol) => ethers.utils.parseEther(standardPrices[symbol])),
  )

  await purchaseManager.setEventTierPricing(
    0,
    "Premium",
    allTokenAddresses,
    allTokenSymbols.map((symbol) => ethers.utils.parseEther(premiumPrices[symbol])),
  )

  await purchaseManager.setEventTierPricing(
    0,
    "VIP",
    allTokenAddresses,
    allTokenSymbols.map((symbol) => ethers.utils.parseEther(vipPrices[symbol])),
  )

  await purchaseManager.setEventTierPricing(
    0,
    "Hospitality",
    allTokenAddresses,
    allTokenSymbols.map((symbol) => ethers.utils.parseEther(hospitalityPrices[symbol])),
  )

  // Add purchase manager as authorized minter for tickets
  await ticketContract.addValidator(purchaseManager.address)
  console.log("Added purchase manager as ticket validator")

  // Create sample event and set pricing
  console.log("Creating sample event...")
  const eventTx = await ticketContract.createEvent(
    "FC Barcelona vs Real Madrid",
    Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
    "Camp Nou, Barcelona",
    50000, // Total tickets
  )
  const eventReceipt = await eventTx.wait()
  const eventId = 0 // First event

  // Enable dynamic pricing
  await purchaseManager.enableDynamicPricing(eventId, true)
  console.log("Dynamic pricing enabled")

  // Add all payment tokens to marketplace
  console.log("Adding all tokens as marketplace payment tokens...")
  for (const [symbol, token] of Object.entries(deployedTokens)) {
    await marketplace.addPaymentToken(token.address)
    console.log(`Added ${symbol} as marketplace payment token`)
  }

  console.log("\n✅ All contracts deployed successfully!")
  console.log("\n📋 Contract Addresses:")
  console.log("TixOneTicket:", ticketContract.address)
  console.log("TixOneMarketplace:", marketplace.address)
  console.log("TixOneStaking:", staking.address)
  console.log("TimelockController:", timelock.address)
  console.log("TixOneGovernance:", governance.address)

  // Save all addresses to file
  const addresses = {
    TixOneTicket: ticketContract.address,
    TixOneMarketplace: marketplace.address,
    TixOneStaking: staking.address,
    TimelockController: timelock.address,
    TixOneGovernance: governance.address,
    TicketPurchaseManager: purchaseManager.address,
    FanTokens: {},
    network: network.name,
    deployer: deployer.address,
  }

  // Add all fan token addresses
  for (const [symbol, token] of Object.entries(deployedTokens)) {
    addresses.FanTokens[symbol] = token.address
  }

  const fs = require("fs")
  fs.writeFileSync("deployed-addresses.json", JSON.stringify(addresses, null, 2))
  console.log("\n📄 Contract addresses saved to deployed-addresses.json")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
