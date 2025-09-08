import type React from "react"
import Link from "next/link"
import { CalendarDays, ChevronRight, Filter, MapPin, List, Grid, ChevronDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { EventCard } from "@/components/event-card"
import { TokenFilter } from "@/components/token-filter"
import { View3dIcon } from "@/components/view-3d-icon"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24">
      {" "}
      {/* Add top padding */}
      {/* Hero Banner */}
      <section className="relative h-[300px] overflow-hidden bg-gradient-to-r from-gray-900 to-black">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-10 flex flex-col items-center justify-center h-full px-4 py-16 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">Upcoming Sports Events</h1>
          <p className="max-w-2xl mb-8 text-lg text-gray-300">
            Browse and purchase tickets for upcoming sports events using fan tokens
          </p>

          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by team, event or location..."
              className="w-full h-12 pl-10 pr-4 text-gray-900 bg-white border-0 rounded-full shadow-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Wave divider */}
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
      <div className="container px-4 pt-4 pb-16 mx-auto">
        {/* Filters & Controls Row */}
        <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
          {/* Left side filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Filter className="w-4 h-4" /> Filters <ChevronDown className="w-4 h-4 ml-1" />
            </Button>

            <FilterTag>Football</FilterTag>
            <FilterTag>Basketball</FilterTag>
            <FilterTag>This Month</FilterTag>
            <FilterTag>Europe</FilterTag>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">View:</span>
            <div className="flex overflow-hidden border rounded-md">
              <Button variant="ghost" size="sm" className="rounded-none border-r border-gray-200">
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-none bg-gray-100">
                <List className="w-4 h-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <span>Sort By</span> <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Filters - Hidden on mobile */}
          <div className="hidden lg:block space-y-7">
            <div className="p-4 border rounded-xl">
              <h3 className="mb-4 text-lg font-semibold">Filter Events</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 text-sm font-medium">Event Type</h4>
                  <div className="space-y-2">
                    <CheckboxFilter id="football" label="Football" />
                    <CheckboxFilter id="basketball" label="Basketball" />
                    <CheckboxFilter id="motorsport" label="Motorsport" />
                    <CheckboxFilter id="tennis" label="Tennis" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3 text-sm font-medium">Date Range</h4>
                  <div className="space-y-2">
                    <RadioFilter id="today" name="date" label="Today" />
                    <RadioFilter id="this-week" name="date" label="This Week" />
                    <RadioFilter id="this-month" name="date" label="This Month" />
                    <RadioFilter id="custom" name="date" label="Custom Range" />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3 text-sm font-medium">Fan Tokens</h4>
                  <TokenFilter />
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3 text-sm font-medium">Location</h4>
                  <div className="space-y-2">
                    <CheckboxFilter id="europe" label="Europe" />
                    <CheckboxFilter id="north-america" label="North America" />
                    <CheckboxFilter id="south-america" label="South America" />
                    <CheckboxFilter id="asia" label="Asia" />
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 bg-red-600 hover:bg-red-700">Apply Filters</Button>
            </div>

            {/* Featured Event */}
            <div className="overflow-hidden bg-white rounded-xl">
              <h3 className="px-4 py-3 text-sm font-semibold text-gray-700 border-b">Featured Event</h3>
              <div className="p-4">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="/packed-stadium-game.png"
                    alt="Featured stadium"
                    className="object-cover w-full h-48 transition-transform hover:scale-105"
                  />
                </div>
                <h4 className="mt-4 mb-1 text-lg font-semibold">El Clásico 2025</h4>
                <p className="text-sm text-gray-600">
                  Be part of the legendary rivalry between FC Barcelona and Real Madrid.
                </p>
                <Button asChild className="w-full mt-4 bg-red-600 hover:bg-red-700">
                  <Link href="/events/barcelona-real-madrid">View Details</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Event Listings */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Event */}
            <div className="relative overflow-hidden rounded-2xl">
              <img src="/packed-stadium-game.png" alt="Featured event" className="object-cover w-full h-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-4 text-white/80">
                    <div className="flex items-center mr-4">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      <span className="text-sm">May 15, 2025 • 20:45</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">Camp Nou, Barcelona</span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <h2 className="mb-2 text-3xl font-bold text-white">FC Barcelona vs Real Madrid</h2>
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-full">$BAR</div>
                        <div className="px-3 py-1 text-xs font-medium text-white bg-black/50 rounded-full backdrop-blur-sm">
                          El Clásico
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-white/30 bg-white/10 hover:bg-white/20"
                      >
                        <View3dIcon className="w-4 h-4 mr-1 text-red-400" />
                        3D Preview
                      </Button>
                      <Button asChild size="sm" className="bg-white text-red-600 hover:bg-gray-100">
                        <Link href="/events/barcelona-real-madrid">View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Heading */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming Matches</h2>
              <Button variant="ghost" size="sm" className="text-red-600">
                See All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                id="psg-lyon"
                title="Paris Saint-Germain vs Lyon"
                date="May 10, 2025"
                time="20:00"
                location="Parc des Princes, Paris"
                image="/football-action.png"
                tokens={["PSG"]}
              />

              <EventCard
                id="juventus-milan"
                title="Juventus vs AC Milan"
                date="May 12, 2025"
                time="20:45"
                location="Allianz Stadium, Turin"
                image="/stadium-lights-evening.png"
                tokens={["JUV", "ACM"]}
              />

              <EventCard
                id="atletico-sevilla"
                title="Atlético Madrid vs Sevilla"
                date="May 14, 2025"
                time="21:00"
                location="Wanda Metropolitano, Madrid"
                image="/atletico-action.png"
                tokens={["ATM"]}
              />

              <EventCard
                id="man-city-liverpool"
                title="Manchester City vs Liverpool"
                date="May 16, 2025"
                time="16:00"
                location="Etihad Stadium, Manchester"
                image="/city-football-action.png"
                tokens={["MAN"]}
              />

              <EventCard
                id="inter-napoli"
                title="Inter Milan vs Napoli"
                date="May 18, 2025"
                time="20:45"
                location="San Siro, Milan"
                image="/inter-milan-stadium.png"
                tokens={["INT", "NAP"]}
              />

              <EventCard
                id="galatasaray-fenerbahce"
                title="Galatasaray vs Fenerbahçe"
                date="May 19, 2025"
                time="19:00"
                location="NEF Stadium, Istanbul"
                image="/galatasaray-supporters.png"
                tokens={["GAL"]}
              />
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <span>Load More Events</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckboxFilter({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center">
      <input type="checkbox" id={id} className="w-4 h-4 border-gray-300 rounded text-red-600 focus:ring-red-500" />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  )
}

function RadioFilter({ id, name, label }: { id: string; name: string; label: string }) {
  return (
    <div className="flex items-center">
      <input type="radio" id={id} name={name} className="w-4 h-4 border-gray-300 text-red-600 focus:ring-red-500" />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  )
}

function FilterTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
      {children}
      <button className="ml-1 text-gray-500 hover:text-red-600">×</button>
    </div>
  )
}
