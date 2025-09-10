"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Ticket,
  Shield,
  Coins,
  Users,
  TrendingUp,
  Zap,
  Globe,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const slides = [
  {
    id: 1,
    title: "TixOne",
    subtitle: "The Future of Sports Ticketing",
    content: "Blockchain-Powered • NFT Tickets • Fan Token Economy",
    type: "title",
  },
  {
    id: 2,
    title: "The Problem",
    content: [
      { icon: Shield, text: "Ticket fraud costs fans $1B+ annually" },
      { icon: TrendingUp, text: "High resale markups (300-500%)" },
      { icon: Users, text: "No connection between fans and teams" },
      { icon: Zap, text: "Poor digital experience" },
      { icon: Star, text: "No proof of attendance or collectibility" },
    ],
    type: "problem",
  },
  {
    id: 3,
    title: "Our Solution: TixOne",
    content: [
      { icon: Shield, text: "Blockchain-verified authentic tickets" },
      { icon: Coins, text: "Fan token economy with rewards" },
      { icon: Ticket, text: "3D NFT tickets as collectibles" },
      { icon: Users, text: "Secure P2P marketplace" },
      { icon: Star, text: "Loyalty rewards for attendance" },
    ],
    type: "solution",
  },
  {
    id: 4,
    title: "How It Works",
    steps: [
      {
        number: "01",
        title: "Connect Wallet",
        description: "Link your crypto wallet to access the platform",
        icon: Users,
      },
      {
        number: "02",
        title: "Buy with Fan Tokens",
        description: "Purchase tickets using team-specific fan tokens",
        icon: Coins,
      },
      {
        number: "03",
        title: "Receive NFT Ticket",
        description: "Get a unique 3D NFT ticket with event details",
        icon: Ticket,
      },
      {
        number: "04",
        title: "Attend & Collect",
        description: "Use ticket for entry and keep as collectible",
        icon: Star,
      },
    ],
    type: "process",
  },
  {
    id: 5,
    title: "Fan Token Economy",
    content: [
      { icon: Coins, text: "10 Team Tokens: BAR, PSG, JUV, ATM, MAN, ACM, INT, NAP, GAL, POR" },
      { icon: TrendingUp, text: "Dynamic pricing based on demand" },
      { icon: Users, text: "Home team discounts (up to 15%)" },
      { icon: Star, text: "Loyalty points for purchases" },
      { icon: Zap, text: "Staking rewards for token holders" },
    ],
    type: "economy",
  },
  {
    id: 6,
    title: "Technical Architecture",
    architecture: {
      frontend: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
      blockchain: ["Solidity Smart Contracts", "ERC-721 NFTs", "ERC-20 Tokens", "OpenZeppelin"],
      features: ["Dynamic Pricing", "Staking Rewards", "Governance DAO", "Marketplace"],
    },
    type: "tech",
  },
  {
    id: 7,
    title: "Smart Contracts",
    contracts: [
      {
        name: "FanToken.sol",
        description: "ERC-20 tokens with staking & rewards",
        features: ["Staking mechanism", "Loyalty points", "Team-specific tokens"],
        icon: Coins,
      },
      {
        name: "TixOneTicket.sol",
        description: "NFT tickets with validation",
        features: ["Event creation", "Ticket minting", "Entry validation"],
        icon: Ticket,
      },
      {
        name: "TixOneMarketplace.sol",
        description: "P2P trading platform",
        features: ["Listings & auctions", "Secure escrow", "Fee management"],
        icon: Users,
      },
    ],
    type: "contracts",
  },
  {
    id: 8,
    title: "Market Opportunity",
    stats: [
      { label: "Global Sports Market", value: "$388B", growth: "+5.9% CAGR", icon: Globe },
      { label: "Event Ticketing Market", value: "$68B", growth: "+4.8% CAGR", icon: Ticket },
      { label: "NFT Market Size", value: "$15B", growth: "+35% CAGR", icon: Star },
      { label: "Crypto Users", value: "420M", growth: "+190% since 2020", icon: Users },
    ],
    type: "market",
  },
  {
    id: 9,
    title: "Competitive Advantages",
    advantages: [
      {
        icon: Shield,
        title: "Fraud Prevention",
        description: "Blockchain verification eliminates counterfeit tickets",
      },
      {
        icon: Ticket,
        title: "3D NFT Experience",
        description: "Interactive 3D tickets with collectible value",
      },
      {
        icon: Coins,
        title: "Fan Token Integration",
        description: "Deep team connection through token economy",
      },
      {
        icon: Users,
        title: "Secure Marketplace",
        description: "Built-in P2P trading with escrow protection",
      },
    ],
    type: "advantages",
  },
  {
    id: 10,
    title: "Demo Highlights",
    features: [
      { icon: Star, text: "Live 3D ticket preview" },
      { icon: TrendingUp, text: "Dynamic pricing in action" },
      { icon: Coins, text: "Fan token purchase flow" },
      { icon: Users, text: "Marketplace trading" },
      { icon: Zap, text: "Mobile-responsive design" },
    ],
    type: "demo",
  },
  {
    id: 11,
    title: "Roadmap",
    phases: [
      {
        phase: "Phase 1",
        title: "MVP Launch",
        items: ["Core platform", "5 major teams", "Basic marketplace"],
        timeline: "Q1 2024",
        icon: Zap,
      },
      {
        phase: "Phase 2",
        title: "Scale Up",
        items: ["20+ teams", "Mobile app", "Advanced features"],
        timeline: "Q2 2024",
        icon: TrendingUp,
      },
      {
        phase: "Phase 3",
        title: "Global Expansion",
        items: ["Multi-sport", "International teams", "Enterprise partnerships"],
        timeline: "Q3-Q4 2024",
        icon: Globe,
      },
    ],
    type: "roadmap",
  },
  {
    id: 12,
    title: "Thank You",
    subtitle: "Questions & Demo",
    content: "Experience the future of sports ticketing",
    cta: "Visit TixOne Platform",
    type: "closing",
  },
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextSlide()
            return 0
          }
          return prev + 1
        })
      }, 100) // 10 second per slide
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setProgress(0)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const resetPresentation = () => {
    setCurrentSlide(0)
    setProgress(0)
    setIsPlaying(false)
  }

  const slide = slides[currentSlide]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 text-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 dark:text-white">
      {/* Presentation Controls */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={togglePlay}
          className="bg-white/90 border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800/90 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetPresentation}
          className="bg-white/90 border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800/90 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <div className="text-sm bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded border border-gray-200 dark:border-gray-700">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-40">
        <Progress value={progress} className="h-1 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="bg-white/90 border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800/90 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-red-600 w-6"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-2"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="bg-white/90 border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800/90 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Slide Content */}
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        {slide.type === "title" && (
          <div className="text-center max-w-4xl">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 text-white rounded-2xl bg-gradient-to-br from-red-600 to-red-800 shadow-2xl">
                <Ticket className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            <h2 className="text-3xl md:text-4xl font-light mb-8 text-gray-600 dark:text-gray-300">{slide.subtitle}</h2>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400">{slide.content}</p>
          </div>
        )}

        {slide.type === "problem" && (
          <div className="max-w-5xl w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center text-red-600">{slide.title}</h1>
            <div className="space-y-6">
              {slide.content?.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-red-600" />
                    </div>
                    <span className="text-2xl md:text-3xl font-medium">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "solution" && (
          <div className="max-w-5xl w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center text-green-600">{slide.title}</h1>
            <div className="space-y-6">
              {slide.content?.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-2xl md:text-3xl font-medium">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "process" && (
          <div className="max-w-6xl w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-16 text-center">{slide.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {slide.steps?.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl md:text-5xl font-bold text-red-600">{step.number}</div>
                      <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <IconComponent className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "economy" && (
          <div className="max-w-5xl w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-12 text-center text-yellow-600">{slide.title}</h1>
            <div className="space-y-6">
              {slide.content?.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="text-2xl md:text-3xl font-medium">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "tech" && (
          <div className="max-w-6xl w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-16 text-center text-blue-600">{slide.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">Frontend</h3>
                <ul className="space-y-2">
                  {slide.architecture?.frontend.map((tech, index) => (
                    <li key={index} className="text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-green-600">Blockchain</h3>
                <ul className="space-y-2">
                  {slide.architecture?.blockchain.map((tech, index) => (
                    <li key={index} className="text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-purple-600">Features</h3>
                <ul className="space-y-2">
                  {slide.architecture?.features.map((feature, index) => (
                    <li key={index} className="text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {slide.type === "contracts" && (
          <div className="max-w-6xl w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-16 text-center text-purple-600">{slide.title}</h1>
            <div className="space-y-8">
              {slide.contracts?.map((contract, index) => {
                const IconComponent = contract.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-purple-600">{contract.name}</h3>
                    </div>
                    <p className="text-lg md:text-xl mb-4 text-gray-600 dark:text-gray-300">{contract.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {contract.features.map((feature, fIndex) => (
                        <span
                          key={fIndex}
                          className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "market" && (
          <div className="max-w-6xl w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-16 text-center text-green-600">{slide.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {slide.stats?.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">{stat.value}</div>
                    <div className="text-xl md:text-2xl font-semibold mb-2">{stat.label}</div>
                    <div className="text-lg text-green-600">{stat.growth}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "advantages" && (
          <div className="max-w-6xl w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-16 text-center text-orange-600">{slide.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {slide.advantages?.map((advantage, index) => {
                const IconComponent = advantage.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-4">
                      <IconComponent className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-orange-600">{advantage.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{advantage.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "demo" && (
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-12 text-cyan-600">{slide.title}</h1>
            <div className="space-y-6 mb-12">
              {slide.features?.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-cyan-600" />
                    </div>
                    <span className="text-2xl md:text-3xl font-medium">{feature.text}</span>
                  </div>
                )
              })}
            </div>
            <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white text-xl px-12 py-6 h-auto">
              <a href="/" target="_blank" rel="noreferrer">
                Launch Demo
              </a>
            </Button>
          </div>
        )}

        {slide.type === "roadmap" && (
          <div className="max-w-6xl w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-16 text-center text-indigo-600">{slide.title}</h1>
            <div className="space-y-8">
              {slide.phases?.map((phase, index) => {
                const IconComponent = phase.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-8"
                  >
                    <div className="text-center flex-shrink-0">
                      <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mb-2">
                        <IconComponent className="w-8 h-8 text-indigo-600" />
                      </div>
                      <div className="text-xl font-bold text-indigo-600 mb-2">{phase.phase}</div>
                      <div className="text-lg text-gray-500 dark:text-gray-400">{phase.timeline}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-600">{phase.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {phase.items.map((item, iIndex) => (
                          <span
                            key={iIndex}
                            className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {slide.type === "closing" && (
          <div className="text-center max-w-4xl">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center justify-center w-20 h-20 text-white rounded-2xl bg-gradient-to-br from-red-600 to-red-800 shadow-2xl">
                <Ticket className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            <h2 className="text-3xl md:text-4xl font-light mb-8 text-gray-600 dark:text-gray-300">{slide.subtitle}</h2>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-12">{slide.content}</p>
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-6 h-auto">
              <a href="/" target="_blank" rel="noreferrer">
                {slide.cta}
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
