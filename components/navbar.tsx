"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Menu, Trophy, Wallet, ExternalLink, User, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isConnected, setIsConnected] = useState(false) // Mock wallet connection

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  // Temporary mockup function to show connected state
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock a connected wallet after 5 seconds
      // setIsConnected(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md dark:bg-gray-900/90" : "bg-transparent",
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 mr-2 overflow-hidden text-white rounded-full bg-gradient-to-br from-red-600 to-red-800">
              <Trophy className="w-5 h-5" />
            </div>
            <span
              className={cn(
                "font-bold text-xl transition-colors",
                scrolled ? "text-gray-900 dark:text-white" : "text-white",
              )}
            >
              FanPay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            <NavLink href="/events" scrolled={scrolled}>
              Events
            </NavLink>
            <NavLink href="/marketplace" scrolled={scrolled}>
              Marketplace
            </NavLink>
            <NavLink href="/dashboard" scrolled={scrolled}>
              Dashboard
            </NavLink>

            {/* Search button */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "ml-2 px-2",
                scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/70 hover:text-white",
              )}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "relative px-2",
                    scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/70 hover:text-white",
                  )}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Notification examples */}
                <div className="max-h-[300px] overflow-y-auto">
                  <NotificationItem
                    title="New Event Available"
                    description="FC Barcelona vs Real Madrid tickets are now available."
                    time="10 mins ago"
                  />
                  <NotificationItem
                    title="Price Alert"
                    description="BAR token increased by 5% in the last 24 hours."
                    time="2 hours ago"
                  />
                  <NotificationItem
                    title="Ticket Transfer"
                    description="Your ticket transfer was completed successfully."
                    time="Yesterday"
                  />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-red-600 cursor-pointer">
                  View All Notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu - shown when wallet is connected */}
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "ml-2",
                      scrolled ? "text-gray-700 hover:text-gray-900" : "text-white/70 hover:text-white",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium">0x1a2b...3c4d</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Wallet className="w-4 h-4 mr-2" />
                    My Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Explorer
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Disconnect Wallet</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <ConnectWalletButton />
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center md:hidden">
            {/* Search button */}
            <Button variant="ghost" size="sm" className={cn("px-2", scrolled ? "text-gray-700" : "text-white/80")}>
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className={cn("relative px-2", scrolled ? "text-gray-700" : "text-white/80")}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className={cn("px-2", scrolled ? "text-gray-700" : "text-white/80")}>
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-8">
                  <div className="flex items-center mb-8">
                    <div className="flex items-center justify-center w-10 h-10 mr-3 text-white rounded-full bg-gradient-to-br from-red-600 to-red-800">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold">FanPay</span>
                  </div>

                  <nav className="flex flex-col gap-2 mb-8">
                    <MobileNavLink href="/events">Events</MobileNavLink>
                    <MobileNavLink href="/marketplace">Marketplace</MobileNavLink>
                    <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
                    <MobileNavLink href="/how-it-works">How It Works</MobileNavLink>
                    <MobileNavLink href="/faq">FAQ</MobileNavLink>
                  </nav>

                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-500">
                      Connect your wallet to access your tickets and tokens
                    </p>
                    <ConnectWalletButton />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, scrolled, children }: { href: string; scrolled: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors hover:text-red-600",
        scrolled ? "text-gray-700" : "text-white/80 hover:text-white",
      )}
    >
      {children}
      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-red-600 scale-x-0 transition-transform origin-left hover:scale-x-100" />
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center px-2 py-3 text-lg font-medium text-gray-800 transition-colors border-b border-gray-100 hover:text-red-600"
    >
      {children}
    </Link>
  )
}

function NotificationItem({ title, description, time }: { title: string; description: string; time: string }) {
  return (
    <div className="px-4 py-3 transition-colors cursor-pointer hover:bg-gray-50">
      <div className="flex justify-between">
        <p className="font-medium text-sm text-gray-900">{title}</p>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
    </div>
  )
}
