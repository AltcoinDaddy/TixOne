"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Wallet,
  Ticket,
  Shield,
  Coins,
  Users,
  TrendingUp,
  CheckCircle,
  Smartphone,
  Globe,
  Lock,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: Wallet,
      title: "Connect Your Wallet",
      description: "Connect your crypto wallet to access the TixOne platform",
      details: "Support for MetaMask, WalletConnect, and Chiliz Chain wallets",
    },
    {
      icon: Coins,
      title: "Get Fan Tokens",
      description: "Purchase or earn fan tokens from your favorite teams",
      details: "Buy tokens directly or earn them through staking and loyalty programs",
    },
    {
      icon: Ticket,
      title: "Buy Tickets",
      description: "Use fan tokens to purchase NFT tickets for events",
      details: "Get discounts when using your team's fan tokens",
    },
    {
      icon: Shield,
      title: "Own & Trade",
      description: "Your tickets are NFTs - own, transfer, or sell them",
      details: "Full ownership with blockchain verification and marketplace trading",
    },
  ]

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-red-500 rounded-full filter blur-[150px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-red-700 rounded-full filter blur-[150px] opacity-15 translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 text-5xl font-extrabold text-white lg:text-6xl"
            >
              How TixOne Works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-3xl mx-auto mb-8 text-xl text-gray-300"
            >
              Discover how blockchain technology revolutionizes sports ticketing with fan tokens, NFT tickets, and a
              secure marketplace
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="#getting-started">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section id="getting-started" className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Getting Started in 4 Simple Steps</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the future of sports ticketing with our easy-to-follow process
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Steps Navigation */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeStep === index
                        ? "bg-red-50 border-2 border-red-200 shadow-lg"
                        : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveStep(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-lg ${
                          activeStep === index ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{step.title}</h3>
                          <span
                            className={`text-sm px-2 py-1 rounded-full ${
                              activeStep === index ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            Step {index + 1}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{step.description}</p>
                        <p className="text-sm text-gray-500">{step.details}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Step Visualization */}
            <div className="relative">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900 to-red-900 rounded-2xl p-8 text-white"
              >
                <div className="flex items-center mb-6">
                  {(() => {
                    const IconComponent = steps[activeStep].icon
                    return <IconComponent className="w-12 h-12 text-red-400 mr-4" />
                  })()}
                  <div>
                    <h3 className="text-2xl font-bold">{steps[activeStep].title}</h3>
                    <p className="text-gray-300">Step {activeStep + 1} of 4</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {activeStep === 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Download a compatible wallet</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Connect to Chiliz Chain</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Verify your connection</span>
                      </div>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Browse available fan tokens</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Purchase tokens with crypto</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Stake tokens to earn rewards</span>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Browse upcoming events</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Select seats and pricing tier</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Pay with fan tokens for discounts</span>
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Receive NFT ticket in wallet</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Transfer or sell on marketplace</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Keep as digital collectible</span>
                      </div>
                    </div>
                  )}
                </div>

                <Button asChild className="w-full mt-6 bg-red-600 hover:bg-red-700">
                  <Link href="/events">
                    Start Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose TixOne?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the benefits of blockchain-powered ticketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Fraud Protection"
              description="Blockchain verification ensures every ticket is authentic and cannot be counterfeited"
              benefits={["Immutable ownership records", "Smart contract security", "Transparent transactions"]}
            />

            <FeatureCard
              icon={Coins}
              title="Fan Token Economy"
              description="Use team-specific tokens to get discounts and exclusive benefits"
              benefits={["Team loyalty rewards", "Staking opportunities", "Governance participation"]}
            />

            <FeatureCard
              icon={TrendingUp}
              title="Investment Potential"
              description="Tickets and tokens can appreciate in value over time"
              benefits={["Collectible NFT tickets", "Token price appreciation", "Marketplace trading"]}
            />

            <FeatureCard
              icon={Users}
              title="Community Benefits"
              description="Connect with other fans and access exclusive experiences"
              benefits={["Fan community access", "Exclusive events", "Team governance voting"]}
            />

            <FeatureCard
              icon={Smartphone}
              title="Mobile Experience"
              description="Seamless mobile app for easy ticket management"
              benefits={["QR code entry", "Digital wallet integration", "Real-time notifications"]}
            />

            <FeatureCard
              icon={Globe}
              title="Global Access"
              description="Buy tickets for events worldwide with any supported token"
              benefits={["Cross-border payments", "Multi-currency support", "24/7 availability"]}
            />
          </div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technology Behind TixOne</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on cutting-edge blockchain technology for security and transparency
            </p>
          </div>

          <Tabs defaultValue="blockchain" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
              <TabsTrigger value="nft">NFT Tickets</TabsTrigger>
              <TabsTrigger value="tokens">Fan Tokens</TabsTrigger>
              <TabsTrigger value="smart-contracts">Smart Contracts</TabsTrigger>
            </TabsList>

            <TabsContent value="blockchain" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-red-600" />
                    Chiliz Blockchain
                  </CardTitle>
                  <CardDescription>
                    Built on Chiliz Chain, the leading blockchain for sports and entertainment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Security Features</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Immutable transaction records</li>
                        <li>• Decentralized validation</li>
                        <li>• Cryptographic security</li>
                        <li>• Transparent operations</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Performance</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Fast transaction processing</li>
                        <li>• Low gas fees</li>
                        <li>• High throughput</li>
                        <li>• Energy efficient</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nft" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ticket className="w-6 h-6 mr-2 text-red-600" />
                    NFT Tickets
                  </CardTitle>
                  <CardDescription>
                    Each ticket is a unique NFT with verifiable ownership and authenticity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Unique Features</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 3D interactive designs</li>
                        <li>• Event-specific metadata</li>
                        <li>• Seat and section details</li>
                        <li>• Collectible after events</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Ownership Rights</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Full ownership control</li>
                        <li>• Transfer to friends/family</li>
                        <li>• Sell on marketplace</li>
                        <li>• Prove authenticity</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Coins className="w-6 h-6 mr-2 text-red-600" />
                    Fan Tokens
                  </CardTitle>
                  <CardDescription>
                    Team-specific tokens that provide utility and benefits within the ecosystem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Token Utility</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Purchase tickets with discounts</li>
                        <li>• Stake for rewards</li>
                        <li>• Vote on team decisions</li>
                        <li>• Access exclusive content</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Earning Opportunities</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Staking rewards</li>
                        <li>• Loyalty point bonuses</li>
                        <li>• Trading on exchanges</li>
                        <li>• Team performance bonuses</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="smart-contracts" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-red-600" />
                    Smart Contracts
                  </CardTitle>
                  <CardDescription>
                    Automated contracts that execute transactions securely and transparently
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Automation</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Automatic ticket issuance</li>
                        <li>• Instant payment processing</li>
                        <li>• Reward distribution</li>
                        <li>• Marketplace transactions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Security</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Audited code</li>
                        <li>• No single point of failure</li>
                        <li>• Transparent execution</li>
                        <li>• Immutable logic</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about TixOne</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="what-is-tixone" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What is TixOne and how is it different from traditional ticketing?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                TixOne is a blockchain-based ticketing platform that uses NFTs for tickets and fan tokens for payments.
                Unlike traditional ticketing, every ticket is verifiably authentic, fully owned by you, and can be
                traded on our marketplace. You also get discounts when using your favorite team's fan tokens.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fan-tokens" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                How do fan tokens work and what benefits do they provide?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Fan tokens are team-specific cryptocurrencies that provide various benefits. You can use them to
                purchase tickets at discounted prices, stake them to earn rewards, participate in team governance
                decisions, and access exclusive content and experiences. Each team has its own token with unique
                benefits.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="nft-tickets" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What makes NFT tickets special compared to regular tickets?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                NFT tickets are unique digital assets that prove authentic ownership on the blockchain. They feature
                interactive 3D designs, contain all event metadata, can be transferred or sold easily, and become
                collectible memorabilia after events. They're also fraud-proof and can't be counterfeited.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="getting-started" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">Do I need technical knowledge to use TixOne?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Not at all! TixOne is designed to be user-friendly. You just need to connect a crypto wallet (we'll
                guide you), get some fan tokens, and you're ready to buy tickets. Our interface is as simple as any
                traditional ticketing platform, but with blockchain benefits.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">How secure is TixOne and my digital assets?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                TixOne is built on the secure Chiliz blockchain with audited smart contracts. Your tickets and tokens
                are stored in your personal wallet, giving you full control. All transactions are cryptographically
                secured and recorded on the blockchain for transparency and immutability.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="marketplace" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Can I sell my tickets if I can't attend an event?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes! Our marketplace allows you to list your NFT tickets for sale at any time. Other users can browse
                and purchase tickets with fan tokens. The blockchain ensures secure, transparent transactions with
                verified authenticity for all parties.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of fans already using TixOne for a better ticketing experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/events">
                Browse Events <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
            >
              <Link href="/dashboard">Connect Wallet</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  benefits,
}: {
  icon: any
  title: string
  description: string
  benefits: string[]
}) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-red-600" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
