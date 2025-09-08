"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, Ticket, Wallet } from "lucide-react"
import { motion, useInView } from "framer-motion"

import { Button } from "@/components/ui/button"

export default function Home() {
  const featuresRef = useRef(null)
  const isInView = useInView(featuresRef, { once: true })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 min-h-screen flex items-center">
        {/* Abstract background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-red-500 rounded-full filter blur-[150px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-red-700 rounded-full filter blur-[150px] opacity-15 translate-x-1/3 translate-y-1/3" />
        </div>

        {/* Animated grid */}
        <svg className="absolute inset-0 w-full h-full z-0 opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Hero content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-2xl mx-auto lg:mx-0"
            >
              <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-white lg:text-7xl leading-tight">
                <span className="block">Experience Sport</span>
                <span className="relative">
                  Through <span className="text-red-500">Blockchain</span>
                </span>
              </h1>

              <p className="mb-10 text-xl text-gray-300 leading-relaxed max-w-lg">
                Purchase tickets using fan tokens. Built on blockchain for ultimate security and collectibility. Own a
                piece of sports history.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  asChild
                  size="lg"
                  className="relative bg-red-600 hover:bg-red-700 group overflow-hidden h-12 px-8 text-base font-semibold"
                >
                  <Link href="/events">
                    <span className="relative z-10 flex items-center">
                      Explore Events{" "}
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 w-0 bg-red-800 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 bg-transparent h-12 px-8 text-base font-semibold"
                >
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </motion.div>

            {/* 3D ticket showcase */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative aspect-square max-w-lg mx-auto"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full perspective-1000">
                  <motion.div
                    animate={{
                      rotateY: [0, 15, 0, -15, 0],
                      rotateX: [0, -15, 0, 15, 0],
                    }}
                    transition={{
                      duration: 20,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="relative w-full h-full"
                  >
                    <div className="absolute inset-0 w-[85%] h-[85%] mx-auto rounded-3xl bg-gradient-to-br from-black to-red-900 shadow-2xl transform -rotate-6 translate-y-8"></div>
                    <div className="absolute inset-0 w-[85%] h-[85%] mx-auto rounded-3xl bg-gradient-to-r from-red-600 to-red-800 shadow-2xl"></div>

                    <div className="absolute inset-0 w-[85%] h-[85%] mx-auto rounded-3xl overflow-hidden border border-red-500/30 bg-black/70 backdrop-blur-sm">
                      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                        <div className="text-white font-bold text-lg">FC Barcelona</div>
                        <div className="text-red-400 text-sm font-semibold bg-red-500/20 px-2 py-1 rounded-full">
                          $BAR
                        </div>
                      </div>

                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-white text-2xl font-bold mb-2">El Clásico</div>
                        <div className="text-gray-400 text-base mb-1">FC Barcelona vs Real Madrid</div>
                        <div className="text-red-400 text-sm">May 15, 2025</div>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                        <div className="text-white text-sm">Section A • Row 10</div>
                        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white text-xs font-bold">NFT</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L40,48C80,64,160,96,240,96C320,96,400,64,480,48C560,32,640,32,720,48C800,64,880,96,960,96C1040,96,1120,64,1200,48C1280,32,1360,32,1400,32L1440,32L1440,100L1400,100C1360,100,1280,100,1200,100C1120,100,1040,100,960,100C880,100,800,100,720,100C640,100,560,100,480,100C400,100,320,100,240,100C160,100,80,100,40,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-24 lg:py-32 overflow-hidden bg-white" id="features">
        <div className="absolute top-0 right-0 -mt-16 opacity-10 rotate-12">
          <svg width="400" height="400" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
              fill="#E11D48"
            />
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 -mb-24 opacity-10 -rotate-12">
          <svg width="300" height="300" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" fill="#E11D48" />
          </svg>
        </div>

        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-4xl font-bold lg:text-6xl text-gray-900 leading-tight"
            >
              Not Just Tickets.
              <br />A New Fan Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl lg:text-2xl text-gray-600 leading-relaxed"
            >
              TixOne enhances the way you connect with your favorite teams through blockchain technology
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:gap-12 md:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 opacity-20 blur-sm group-hover:opacity-100 transition duration-200"></div>
              <div className="relative h-full p-8 lg:p-10 bg-white rounded-2xl shadow-xl">
                <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mb-6 rounded-2xl bg-red-50">
                  <Wallet className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" />
                </div>
                <h3 className="mb-4 text-2xl lg:text-3xl font-bold text-gray-900">Token Economy</h3>
                <p className="mb-6 text-gray-600 text-base lg:text-lg leading-relaxed">
                  Use team fan tokens to purchase tickets and earn rewards. Create a deeper connection with your team.
                </p>
                <ul className="pl-5 space-y-3 text-sm lg:text-base text-gray-600 list-disc">
                  <li>Tickets purchasable with fan tokens</li>
                  <li>Earn rewards for attendance</li>
                  <li>Special offers for token holders</li>
                </ul>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative mt-0 md:mt-12 group"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 opacity-20 blur-sm group-hover:opacity-100 transition duration-200"></div>
              <div className="relative h-full p-8 lg:p-10 bg-white rounded-2xl shadow-xl">
                <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mb-6 rounded-2xl bg-red-50">
                  <Ticket className="w-8 h-8 lg:w-10 lg:h-10 text-red-600" />
                </div>
                <h3 className="mb-4 text-2xl lg:text-3xl font-bold text-gray-900">NFT Tickets</h3>
                <p className="mb-6 text-gray-600 text-base lg:text-lg leading-relaxed">
                  Each ticket is a unique NFT with provable authenticity and built-in anti-fraud technology.
                </p>
                <ul className="pl-5 space-y-3 text-sm lg:text-base text-gray-600 list-disc">
                  <li>3D interactive designs</li>
                  <li>Secure entry verification</li>
                  <li>Digital collectibles after events</li>
                </ul>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 opacity-20 blur-sm group-hover:opacity-100 transition duration-200"></div>
              <div className="relative h-full p-8 lg:p-10 bg-white rounded-2xl shadow-xl">
                <div className="flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 mb-6 rounded-2xl bg-red-50">
                  <svg
                    className="w-8 h-8 lg:w-10 lg:h-10 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13 11.5858V5Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className="mb-4 text-2xl lg:text-3xl font-bold text-gray-900">Marketplace</h3>
                <p className="mb-6 text-gray-600 text-base lg:text-lg leading-relaxed">
                  Buy, sell, and trade tickets in a secure marketplace powered by blockchain technology.
                </p>
                <ul className="pl-5 space-y-3 text-sm lg:text-base text-gray-600 list-disc">
                  <li>Verified peer-to-peer trading</li>
                  <li>Historical price tracking</li>
                  <li>Transparent transaction fees</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col items-center max-w-4xl mx-auto mb-16 text-center md:flex-row md:text-left md:justify-between">
            <h2 className="mb-6 text-3xl font-bold lg:text-5xl md:mb-0 text-gray-900">Supported Teams</h2>
            <Link
              href="/teams"
              className="flex items-center text-red-600 transition-colors hover:text-red-700 text-lg font-semibold"
            >
              View All Teams
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Teams Grid */}
          <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10">
            {[
              { code: "BAR", name: "FC Barcelona" },
              { code: "PSG", name: "Paris Saint-Germain" },
              { code: "JUV", name: "Juventus" },
              { code: "ATM", name: "Atlético Madrid" },
              { code: "MAN", name: "Manchester City" },
              { code: "ACM", name: "AC Milan" },
              { code: "INT", name: "Inter Milan" },
              { code: "NAP", name: "Napoli" },
              { code: "GAL", name: "Galatasaray" },
              { code: "POR", name: "FC Porto" },
            ].map((team) => (
              <motion.div key={team.code} whileHover={{ y: -5, scale: 1.05 }} className="flex flex-col items-center">
                <div className="p-4 mb-3 transition-all duration-300 bg-white rounded-2xl shadow-lg group hover:shadow-xl">
                  <div className="flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 text-sm lg:text-base font-bold transition-colors rounded-xl bg-gray-50 group-hover:bg-red-50 text-gray-700 group-hover:text-red-600">
                    ${team.code}
                  </div>
                </div>
                <p className="text-xs lg:text-sm font-medium text-center text-gray-600 leading-tight">{team.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden text-white bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-2/3 h-2/3 rounded-full opacity-20 bg-red-500 filter blur-[100px] -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-full opacity-20 bg-red-700 filter blur-[100px] translate-y-1/2" />
        </div>

        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 w-full bg-white/30"
              style={{
                top: `${i * 10}%`,
                transform: "rotate(45deg) scale(2)",
                transformOrigin: "center",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-4xl font-bold lg:text-6xl leading-tight"
            >
              Ready to Experience the Next Generation of Ticketing?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 text-xl lg:text-2xl text-gray-300 leading-relaxed"
            >
              Connect your wallet and start exploring upcoming events from your favorite teams
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col justify-center gap-6 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 hover:text-red-600 h-12 px-8 text-base font-semibold"
              >
                <Link href="/connect">Connect Wallet</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 bg-transparent h-12 px-8 text-base font-semibold"
              >
                <Link href="/events">Browse Events</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
