const { ethers } = require("hardhat")

async function main() {
  console.log("Creating sample events for all teams...")

  // Load deployed contract addresses
  const addresses = require("../deployed-addresses.json")

  const [deployer] = await ethers.getSigners()

  // Get contract instances
  const ticketContract = await ethers.getContractAt("TixOneTicket", addresses.TixOneTicket)
  const purchaseManager = await ethers.getContractAt("TicketPurchaseManager", addresses.TicketPurchaseManager)

  // Sample events configuration
  const events = [
    {
      name: "FC Barcelona vs Real Madrid",
      venue: "Camp Nou, Barcelona",
      homeTeam: "BAR",
      awayTeam: "RMA",
      totalTickets: 50000,
    },
    {
      name: "Paris Saint-Germain vs Lyon",
      venue: "Parc des Princes, Paris",
      homeTeam: "PSG",
      awayTeam: "OL",
      totalTickets: 47000,
    },
    {
      name: "Juventus vs AC Milan",
      venue: "Allianz Stadium, Turin",
      homeTeam: "JUV",
      awayTeam: "ACM",
      totalTickets: 41000,
    },
    {
      name: "Atlético Madrid vs Sevilla",
      venue: "Wanda Metropolitano, Madrid",
      homeTeam: "ATM",
      awayTeam: "SEV",
      totalTickets: 68000,
    },
    {
      name: "Manchester City vs Liverpool",
      venue: "Etihad Stadium, Manchester",
      homeTeam: "MAN",
      awayTeam: "LIV",
      totalTickets: 55000,
    },
    {
      name: "Inter Milan vs Napoli",
      venue: "San Siro, Milan",
      homeTeam: "INT",
      awayTeam: "NAP",
      totalTickets: 80000,
    },
    {
      name: "Galatasaray vs Fenerbahçe",
      venue: "NEF Stadium, Istanbul",
      homeTeam: "GAL",
      awayTeam: "FEN",
      totalTickets: 52000,
    },
    {
      name: "FC Porto vs Benfica",
      venue: "Estádio do Dragão, Porto",
      homeTeam: "POR",
      awayTeam: "BEN",
      totalTickets: 50000,
    },
  ]

  // Create events and set pricing
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    console.log(`\nCreating event: ${event.name}`)

    // Create event
    const eventDate = Math.floor(Date.now() / 1000) + (i + 1) * 7 * 24 * 60 * 60 // Weekly intervals
    await ticketContract.createEvent(event.name, eventDate, event.venue, event.totalTickets)

    const eventId = i + 1 // Event IDs start from 1

    // Set pricing with home team advantage
    const fanTokenAddresses = Object.values(addresses.FanTokens)
    const fanTokenSymbols = Object.keys(addresses.FanTokens)

    // Home team gets better pricing
    const getPrice = (basePrice, symbol, homeTeam) => {
      if (symbol === homeTeam) {
        return Math.floor(basePrice * 0.85) // 15% discount for home team
      }
      return basePrice
    }

    // Standard pricing
    const standardPrices = fanTokenSymbols.map((symbol) =>
      ethers.utils.parseEther(getPrice(150, symbol, event.homeTeam).toString()),
    )

    // Premium pricing
    const premiumPrices = fanTokenSymbols.map((symbol) =>
      ethers.utils.parseEther(getPrice(300, symbol, event.homeTeam).toString()),
    )

    // VIP pricing
    const vipPrices = fanTokenSymbols.map((symbol) =>
      ethers.utils.parseEther(getPrice(500, symbol, event.homeTeam).toString()),
    )

    // Set all pricing tiers
    await purchaseManager.setEventTierPricing(eventId, "Standard", fanTokenAddresses, standardPrices)
    await purchaseManager.setEventTierPricing(eventId, "Premium", fanTokenAddresses, premiumPrices)
    await purchaseManager.setEventTierPricing(eventId, "VIP", fanTokenAddresses, vipPrices)

    // Enable dynamic pricing
    await purchaseManager.enableDynamicPricing(eventId, true)

    console.log(`✅ Event ${eventId}: ${event.name} created with pricing`)
  }

  console.log("\n🎉 All sample events created successfully!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
