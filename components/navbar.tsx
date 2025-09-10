"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bell, Menu, Ticket, Wallet, ExternalLink, User, Search } from "lucide-react"

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg dark:bg-gray-900/95" : "bg-transparent",
      )}
    >
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-xl bg-gradient-to-br from-red-600 to-red-800 shadow-lg">
              <Ticket className="w-5 h-5" />
            </div>
            <span
              className={cn(
                "font-bold text-xl transition-colors",
                scrolled ? "text-gray-900 dark:text-white" : "text-white",
              )}
            >
              TixOne
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavLink href="/events" scrolled={scrolled}>
              Events
            </NavLink>
            <NavLink href="/marketplace" scrolled={scrolled}>
              Marketplace
            </NavLink>
            <NavLink href="/dashboard" scrolled={scrolled}>
              Dashboard
            </NavLink>
            <NavLink href="/presentation" scrolled={scrolled}>
              Presentation
            </NavLink>

            {/* Search button */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "ml-4 px-3 h-9",
                scrolled
                  ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  : "text-white/70 hover:text-white hover:bg-white/10",
              )}
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "relative px-3 h-9",
                    scrolled
                      ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  )}
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 mt-2">
                <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
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
                <DropdownMenuItem className="justify-center text-red-600 cursor-pointer font-medium">
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
                      "ml-2 px-3 h-9",
                      scrolled
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full">
                        <User className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium">0x1a2b...3c4d</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 mt-2">
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
              <div className="ml-4">
                <ConnectWalletButton />
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Search button */}
            <Button variant="ghost" size="sm" className={cn("px-2 h-9", scrolled ? "text-gray-700" : "text-white/80")}>
              <Search className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className={cn("relative px-2 h-9", scrolled ? "text-gray-700" : "text-white/80")}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("px-2 h-9", scrolled ? "text-gray-700" : "text-white/80")}
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-6">
                  <div className="flex items-center mb-8 space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 text-white rounded-xl bg-gradient-to-br from-red-600 to-red-800">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold">TixOne</span>
                  </div>

                  <nav className="flex flex-col space-y-1 mb-8">
                    <MobileNavLink href="/events">Events</MobileNavLink>
                    <MobileNavLink href="/marketplace">Marketplace</MobileNavLink>
                    <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
                    <MobileNavLink href="/presentation">Presentation</MobileNavLink>
                    <MobileNavLink href="/how-it-works">How It Works</MobileNavLink>
                    <MobileNavLink href="/faq">FAQ</MobileNavLink>
                  </nav>

                  <div className="space-y-4 pt-4 border-t">
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
        "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:text-red-600",
        scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white/80 hover:text-white hover:bg-white/10",
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-3 text-base font-medium text-gray-800 transition-colors rounded-lg hover:text-red-600 hover:bg-gray-50"
    >
      {children}
    </Link>
  )
}

function NotificationItem({ title, description, time }: { title: string; description: string; time: string }) {
  return (
    <div className="px-4 py-3 transition-colors cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between items-start mb-1">
        <p className="font-medium text-sm text-gray-900 line-clamp-1">{title}</p>
        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{time}</span>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
    </div>
  )
}
