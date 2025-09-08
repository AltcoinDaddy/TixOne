import Link from "next/link"
import { Facebook, Instagram, Twitter, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Curved top separator */}
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="w-full">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0L48 8C96 16 192 32 288 37.3C384 43 480 37 576 34.7C672 32 768 32 864 29.3C960 27 1056 21 1152 21.3C1248 21 1344 27 1392 29.3L1440 32V48H1392C1344 48 1248 48 1152 48C1056 48 960 48 864 48C768 48 672 48 576 48C480 48 384 48 288 48C192 48 96 48 48 48H0V0Z"
            fill="#111827"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-8 space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
                <Ticket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">TixOne</h3>
                <p className="text-sm text-gray-400">The blockchain ticketing platform</p>
              </div>
            </div>

            <p className="text-gray-400 mb-8 max-w-md text-base leading-relaxed">
              TixOne revolutionizes sports ticketing with blockchain technology, fan tokens, and NFTs. Experience the
              future of sports event access and digital collectibles.
            </p>

            <div className="flex space-x-6 mb-10">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-800 p-6 rounded-2xl">
              <h4 className="text-white font-semibold mb-3 text-lg">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                Subscribe to our newsletter for the latest updates and exclusive offers.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                <Button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Platform</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors text-base">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-white transition-colors text-base">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/my-tickets" className="text-gray-400 hover:text-white transition-colors text-base">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="text-gray-400 hover:text-white transition-colors text-base">
                  For Organizers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-base">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-base">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition-colors text-base">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-base">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-base">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors text-base">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-gray-400 hover:text-white transition-colors text-base">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-gray-400 text-base">© {new Date().getFullYear()} TixOne. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
