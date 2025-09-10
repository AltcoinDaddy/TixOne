"use client"

import { useState } from "react"
import { Search, HelpCircle, MessageCircle, Mail } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = {
    general: [
      {
        question: "What is TixOne?",
        answer:
          "TixOne is a revolutionary blockchain-based ticketing platform that uses NFT tickets and fan tokens to create a more secure, transparent, and fan-friendly ticketing experience for sports events.",
      },
      {
        question: "How is TixOne different from traditional ticketing platforms?",
        answer:
          "TixOne offers several advantages: tickets are NFTs that you truly own, fan tokens provide discounts and rewards, blockchain technology prevents fraud, and you can trade tickets on our marketplace. Traditional platforms don't offer these benefits.",
      },
      {
        question: "Is TixOne available worldwide?",
        answer:
          "Yes! TixOne operates globally. As long as you have a compatible crypto wallet and internet connection, you can purchase tickets for events worldwide using any supported fan token.",
      },
      {
        question: "What sports and teams are supported?",
        answer:
          "We currently support major football clubs including FC Barcelona, PSG, Juventus, Atlético Madrid, Manchester City, AC Milan, Inter Milan, Napoli, Galatasaray, and FC Porto. We're constantly adding new teams and sports.",
      },
    ],
    wallet: [
      {
        question: "What wallets are compatible with TixOne?",
        answer:
          "TixOne supports MetaMask, WalletConnect, Chiliz Chain wallets, and other Web3 wallets. We recommend using wallets that support the Chiliz blockchain for the best experience.",
      },
      {
        question: "How do I connect my wallet?",
        answer:
          "Click the 'Connect Wallet' button, select your wallet type, and follow the prompts. Make sure your wallet is connected to the Chiliz Chain network. We provide step-by-step guidance during the process.",
      },
      {
        question: "Is my wallet secure on TixOne?",
        answer:
          "Yes! TixOne never stores your private keys or has access to your wallet. We only interact with your wallet when you explicitly approve transactions. Always keep your seed phrase secure and never share it.",
      },
      {
        question: "Can I use multiple wallets?",
        answer:
          "Yes, you can connect different wallets to TixOne, but each session uses one wallet at a time. Your tickets and tokens are tied to specific wallet addresses.",
      },
    ],
    tokens: [
      {
        question: "What are fan tokens?",
        answer:
          "Fan tokens are team-specific cryptocurrencies that provide utility within the TixOne ecosystem. Each team has its own token (like $BAR for Barcelona or $PSG for Paris Saint-Germain) that offers unique benefits.",
      },
      {
        question: "How do I get fan tokens?",
        answer:
          "You can purchase fan tokens directly on TixOne using cryptocurrency, earn them through staking rewards, or buy them on supported exchanges. Some tokens may also be earned through loyalty programs.",
      },
      {
        question: "What benefits do fan tokens provide?",
        answer:
          "Fan tokens offer discounts on tickets (especially for your team's home games), staking rewards, governance voting rights, access to exclusive content, and potential price appreciation as collectible assets.",
      },
      {
        question: "Can I stake my fan tokens?",
        answer:
          "Yes! Staking fan tokens earns you rewards over time and loyalty points. Different tokens have different staking rates and reward structures. You can unstake your tokens at any time.",
      },
      {
        question: "Do fan tokens have real value?",
        answer:
          "Yes, fan tokens are real cryptocurrencies with market value. Their prices can fluctuate based on team performance, demand, and market conditions. They can be traded on various exchanges.",
      },
    ],
    tickets: [
      {
        question: "What makes NFT tickets special?",
        answer:
          "NFT tickets are unique digital assets that prove authentic ownership on the blockchain. They feature interactive 3D designs, contain all event details, can't be counterfeited, and become collectible memorabilia after events.",
      },
      {
        question: "How do I use my NFT ticket for entry?",
        answer:
          "Your NFT ticket contains a QR code that venue staff scan for entry. The blockchain instantly verifies authenticity. You can display the QR code from your mobile wallet or the TixOne app.",
      },
      {
        question: "Can I transfer my ticket to someone else?",
        answer:
          "Yes! NFT tickets can be easily transferred to friends or family through your wallet or the TixOne platform. The new owner gets full access and entry rights.",
      },
      {
        question: "What happens to my ticket after the event?",
        answer:
          "Your NFT ticket becomes a digital collectible! It retains all the event information and can appreciate in value, especially for memorable games or historic events. You own it forever.",
      },
      {
        question: "Can I get a refund for my NFT ticket?",
        answer:
          "Refund policies depend on the event organizer. However, you can always sell your ticket on our marketplace to other fans if you can't attend.",
      },
    ],
    marketplace: [
      {
        question: "How does the TixOne marketplace work?",
        answer:
          "Our marketplace allows you to buy and sell NFT tickets using fan tokens. Sellers list their tickets with prices, and buyers can purchase them instantly. All transactions are secured by smart contracts.",
      },
      {
        question: "What fees are charged on the marketplace?",
        answer:
          "TixOne charges a small marketplace fee (typically 2.5%) on successful sales. This fee helps maintain the platform and ensure security. Buyers and sellers can see all fees before confirming transactions.",
      },
      {
        question: "How do I know tickets on the marketplace are authentic?",
        answer:
          "All tickets on TixOne are NFTs verified on the blockchain. It's impossible to create fake tickets because each NFT has a unique, verifiable signature that proves its authenticity and ownership history.",
      },
      {
        question: "Can I set my own price when selling tickets?",
        answer:
          "Yes! Sellers have full control over pricing. You can set fixed prices or create auctions. The marketplace shows price history and suggestions to help you price competitively.",
      },
    ],
    technical: [
      {
        question: "What blockchain does TixOne use?",
        answer:
          "TixOne is built on the Chiliz blockchain, which is specifically designed for sports and entertainment applications. It offers fast transactions, low fees, and high security.",
      },
      {
        question: "What are smart contracts?",
        answer:
          "Smart contracts are automated programs on the blockchain that execute transactions when conditions are met. They handle ticket sales, transfers, and marketplace transactions without human intervention, ensuring security and transparency.",
      },
      {
        question: "How are transaction fees calculated?",
        answer:
          "Transaction fees (gas fees) depend on network congestion and transaction complexity. Chiliz blockchain typically has very low fees. You'll see the exact fee before confirming any transaction.",
      },
      {
        question: "What happens if there's a technical issue?",
        answer:
          "TixOne has robust technical support and monitoring systems. If you experience issues, contact our support team immediately. Blockchain transactions are permanent, so we provide guidance to prevent errors.",
      },
    ],
  }

  const filteredFAQs = Object.entries(faqCategories).reduce(
    (acc, [category, faqs]) => {
      const filtered = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, typeof faqCategories.general>,
  )

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-red-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 mb-8">Find answers to common questions about TixOne</p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-6xl">
          <Tabs defaultValue="general" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            {Object.entries(filteredFAQs).map(([category, faqs]) => (
              <TabsContent key={category} value={category}>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`${category}-${index}`} className="bg-gray-50 rounded-lg px-6">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>

          {/* No Results */}
          {searchQuery && Object.keys(filteredFAQs).length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">Try different keywords or browse our categories above</p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl text-gray-600">Our support team is here to assist you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-red-600" />
                  Live Chat
                </CardTitle>
                <CardDescription>Get instant help from our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Available 24/7 for urgent issues and general questions</p>
                <Button className="w-full bg-red-600 hover:bg-red-700">Start Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-red-600" />
                  Email Support
                </CardTitle>
                <CardDescription>Send us a detailed message about your issue</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">We typically respond within 24 hours</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
