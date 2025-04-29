import Link from "next/link"
import { Facebook, Instagram, Twitter, Trophy } from "lucide-react"

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

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mr-3">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">FanPay</h3>
                <p className="text-sm text-gray-400">The blockchain ticketing platform</p>
              </div>
            </div>

            <p className="text-gray-400 mb-6 max-w-md">
              FanPay revolutionizes sports ticketing with blockchain technology, fan tokens, and NFTs. Experience the
              future of sports event access and digital collectibles.
            </p>

            <div className="flex space-x-5 mb-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-800 p-5 rounded-xl">
              <h4 className="text-white font-medium mb-2">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-3">Subscribe to our newsletter for the latest updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-3 py-2 rounded-lg border-0 focus:ring-1 focus:ring-red-500"
                />
                <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/my-tickets" className="text-gray-400 hover:text-white transition-colors">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="text-gray-400 hover:text-white transition-colors">
                  For Organizers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-gray-400 hover:text-white transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} FanPay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
