"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from "lucide-react"
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
      "🎫 Ticket fraud costs fans $1B+ annually",
      "💸 High resale markups (300-500%)",
      "🔒 No connection between fans and teams",
      "📱 Poor digital experience",
      "🎭 No proof of attendance or collectibility",
    ],
    type: "problem",
  },
  {
    id: 3,
    title: "Our Solution: TixOne",
    content: [
      "🔐 Blockchain-verified authentic tickets",
      "🪙 Fan token economy with rewards",
      "🎨 3D NFT tickets as collectibles",
      "💱 Secure P2P marketplace",
      "🏆 Loyalty rewards for attendance",
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
      },
      {
        number: "02",
        title: "Buy with Fan Tokens",
        description: "Purchase tickets using team-specific fan tokens",
      },
      {
        number: "03",
        title: "Receive NFT Ticket",
        description: "Get a unique 3D NFT ticket with event details",
      },
      {
        number: "04",
        title: "Attend & Collect",
        description: "Use ticket for entry and keep as collectible",
      },
    ],
    type: "process",
  },
  {
    id: 5,
    title: "Fan Token Economy",
    content: [
      "💰 10 Team Tokens: BAR, PSG, JUV, ATM, MAN, ACM, INT, NAP, GAL, POR",
      "🎯 Dynamic pricing based on demand",
      "🏠 Home team discounts (up to 15%)",
      "⭐ Loyalty points for purchases",
      "📈 Staking rewards for token holders",
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
      },
      {
        name: "TixOneTicket.sol",
        description: "NFT tickets with validation",
        features: ["Event creation", "Ticket minting", "Entry validation"],
      },
      {
        name: "TixOneMarketplace.sol",
        description: "P2P trading platform",
        features: ["Listings & auctions", "Secure escrow", "Fee management"],
      },
    ],
    type: "contracts",
  },
  {
    id: 8,
    title: "Market Opportunity",
    stats: [
      { label: "Global Sports Market", value: "$388B", growth: "+5.9% CAGR" },
      { label: "Event Ticketing Market", value: "$68B", growth: "+4.8% CAGR" },
      { label: "NFT Market Size", value: "$15B", growth: "+35% CAGR" },
      { label: "Crypto Users", value: "420M", growth: "+190% since 2020" },
    ],
    type: "market",
  },
  {
    id: 9,
    title: "Competitive Advantages",
    advantages: [
      {
        icon: "🔐",
        title: "Fraud Prevention",
        description: "Blockchain verification eliminates counterfeit tickets",
      },
      {
        icon: "🎨",
        title: "3D NFT Experience",
        description: "Interactive 3D tickets with collectible value",
      },
      {
        icon: "🪙",
        title: "Fan Token Integration",
        description: "Deep team connection through token economy",
      },
      {
        icon: "💱",
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
      "✨ Live 3D ticket preview",
      "🎯 Dynamic pricing in action",
      "💰 Fan token purchase flow",
      "🏪 Marketplace trading",
      "📱 Mobile-responsive design",
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
      },
      {
        phase: "Phase 2",
        title: "Scale Up",
        items: ["20+ teams", "Mobile app", "Advanced features"],
        timeline: "Q2 2024",
      },
      {
        phase: "Phase 3",
        title: "Global Expansion",
        items: ["Multi-sport", "International teams", "Enterprise partnerships"],
        timeline: "Q3-Q4 2024",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white">
      {/* Presentation Controls */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={togglePlay}
          className="bg-black/50 border-white/20 text-white hover:bg-white/10"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetPresentation}
          className="bg-black/50 border-white/20 text-white hover:bg-white/10"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <div className="text-sm bg-black/50 px-3 py-1 rounded">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-40">
        <Progress value={progress} className="h-1 bg-transparent" />
      </div>

      {/* Navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="bg-black/50 border-white/20 text-white hover:bg-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-red-500 w-6" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="bg-black/50 border-white/20 text-white hover:bg-white/10"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Slide Content */}
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        {slide.type === "title" && (
          <div className="text-center max-w-4xl">
            <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            <h2 className="text-4xl font-light mb-8 text-gray-300">{slide.subtitle}</h2>
            <p className="text-2xl text-gray-400">{slide.content}</p>
          </div>
        )}

        {slide.type === "problem" && (
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-12 text-center text-red-400">{slide.title}</h1>
            <div className="space-y-6">
              {slide.content?.map((item, index) => (
                <div key={index} className="text-3xl flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "solution" && (
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-12 text-center text-green-400">{slide.title}</h1>
            <div className="space-y-6">
              {slide.content?.map((item, index) => (
                <div key={index} className="text-3xl flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "process" && (
          <div className="max-w-6xl">
            <h1 className="text-6xl font-bold mb-16 text-center">{slide.title}</h1>
            <div className="grid grid-cols-2 gap-8">
              {slide.steps?.map((step, index) => (
                <div key={index} className="bg-black/30 p-8 rounded-xl">
                  <div className="text-6xl font-bold text-red-400 mb-4">{step.number}</div>
                  <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-xl text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "economy" && (
          <div className="max-w-4xl">
            <h1 className="text-6xl font-bold mb-12 text-center text-yellow-400">{slide.title}</h1>
            <div className="space-y-6">
              {slide.content?.map((item, index) => (
                <div key={index} className="text-3xl flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "tech" && (
          <div className="max-w-6xl">
            <h1 className="text-6xl font-bold mb-16 text-center text-blue-400">{slide.title}</h1>
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-black/30 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Frontend</h3>
                <ul className="space-y-2">
                  {slide.architecture?.frontend.map((tech, index) => (
                    <li key={index} className="text-lg">
                      • {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black/30 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-green-300">Blockchain</h3>
                <ul className="space-y-2">
                  {slide.architecture?.blockchain.map((tech, index) => (
                    <li key={index} className="text-lg">
                      • {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black/30 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Features</h3>
                <ul className="space-y-2">
                  {slide.architecture?.features.map((feature, index) => (
                    <li key={index} className="text-lg">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {slide.type === "contracts" && (
          <div className="max-w-6xl">
            <h1 className="text-6xl font-bold mb-16 text-center text-purple-400">{slide.title}</h1>
            <div className="space-y-8">
              {slide.contracts?.map((contract, index) => (
                <div key={index} className="bg-black/30 p-6 rounded-xl">
                  <h3 className="text-3xl font-bold mb-2 text-purple-300">{contract.name}</h3>
                  <p className="text-xl mb-4 text-gray-300">{contract.description}</p>
                  <div className="flex gap-4">
                    {contract.features.map((feature, fIndex) => (
                      <span key={fIndex} className="bg-purple-600/20 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "market" && (
          <div className="max-w-6xl">
            <h1 className="text-6xl font-bold mb-16 text-center text-green-400">{slide.title}</h1>
            <div className="grid grid-cols-2 gap-8">
              {slide.stats?.map((stat, index) => (
                <div key={index} className="bg-black/30 p-8 rounded-xl text-center">
                  <div className="text-5xl font-bold text-green-400 mb-2">{stat.value}</div>
                  <div className="text-2xl font-semibold mb-2">{stat.label}</div>
                  <div className="text-lg text-green-300">{stat.growth}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "advantages" && (
          <div className="max-w-6xl">
            <h1 className="text-6xl font-bold mb-16 text-center text-orange-400">{slide.title}</h1>
            <div className="grid grid-cols-2 gap-8">
              {slide.advantages?.map((advantage, index) => (
                <div key={index} className="bg-black/30 p-6 rounded-xl">
                  <div className="text-4xl mb-4">{advantage.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-orange-300">{advantage.title}</h3>
                  <p className="text-lg text-gray-300">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "demo" && (
          <div className="max-w-4xl text-center">
            <h1 className="text-6xl font-bold mb-12 text-cyan-400">{slide.title}</h1>
            <div className="space-y-6 mb-12">
              {slide.features?.map((feature, index) => (
                <div key={index} className="text-3xl p-4 bg-black/30 rounded-lg">
                  {feature}
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-2xl px-12 py-6">
              <a href="/" target="_blank" rel="noreferrer">
                Launch Demo
              </a>
            </Button>
          </div>
        )}

        {slide.type === "roadmap" && (
          <div className="max-w-6xl">
            <h1 className="text-6xl font-bold mb-16 text-center text-indigo-400">{slide.title}</h1>
            <div className="space-y-8">
              {slide.phases?.map((phase, index) => (
                <div key={index} className="bg-black/30 p-6 rounded-xl flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-300 mb-2">{phase.phase}</div>
                    <div className="text-lg text-gray-400">{phase.timeline}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4 text-indigo-300">{phase.title}</h3>
                    <div className="flex gap-4">
                      {phase.items.map((item, iIndex) => (
                        <span key={iIndex} className="bg-indigo-600/20 px-3 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "closing" && (
          <div className="text-center max-w-4xl">
            <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              {slide.title}
            </h1>
            <h2 className="text-4xl font-light mb-8 text-gray-300">{slide.subtitle}</h2>
            <p className="text-2xl text-gray-400 mb-12">{slide.content}</p>
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-2xl px-12 py-6">
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
