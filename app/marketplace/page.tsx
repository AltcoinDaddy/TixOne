import { Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceTicketCard } from "@/components/marketplace-ticket-card"

export default function MarketplacePage() {
  return (
    <div className="pt-20 md:pt-24">
      {" "}
      {/* Add top padding for fixed header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">NFT Ticket Marketplace</h1>
            <p className="text-gray-600 mt-1">Buy and sell event tickets as NFTs</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search tickets..." className="pl-8" />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
            </TabsList>

            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Date: Newest</option>
                <option>Date: Oldest</option>
              </select>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <MarketplaceTicketCard
                id="1"
                eventName="FC Barcelona vs Real Madrid"
                eventDate="May 15, 2025"
                eventLocation="Camp Nou, Barcelona"
                ticketType="Premium Seat"
                section="Main Stand"
                row="10"
                seat="15"
                price="350"
                token="BAR"
                image="/football-ticket-nft-barcelona-design.jpg"
                seller={{
                  address: "0x1a2b...3c4d",
                  rating: 4.8,
                }}
              />

              <MarketplaceTicketCard
                id="2"
                eventName="Paris Saint-Germain vs Lyon"
                eventDate="May 10, 2025"
                eventLocation="Parc des Princes, Paris"
                ticketType="VIP Experience"
                section="VIP Box"
                row="2"
                seat="7"
                price="500"
                token="PSG"
                image="/football-ticket-nft-psg-design.jpg"
                seller={{
                  address: "0x4e5f...6g7h",
                  rating: 4.9,
                }}
              />

              <MarketplaceTicketCard
                id="3"
                eventName="Juventus vs AC Milan"
                eventDate="May 12, 2025"
                eventLocation="Allianz Stadium, Turin"
                ticketType="Standard Seat"
                section="Curva Sud"
                row="15"
                seat="22"
                price="180"
                token="JUV"
                image="/football-ticket-nft-juventus-design.jpg"
                seller={{
                  address: "0x8i9j...0k1l",
                  rating: 4.7,
                }}
              />

              <MarketplaceTicketCard
                id="4"
                eventName="Atlético Madrid vs Sevilla"
                eventDate="May 14, 2025"
                eventLocation="Wanda Metropolitano, Madrid"
                ticketType="Premium Seat"
                section="Lateral"
                row="8"
                seat="12"
                price="220"
                token="ATM"
                image="/football-ticket-nft-atletico-madrid-design.jpg"
                seller={{
                  address: "0x2m3n...4o5p",
                  rating: 4.6,
                }}
              />

              <MarketplaceTicketCard
                id="5"
                eventName="Manchester City vs Liverpool"
                eventDate="May 16, 2025"
                eventLocation="Etihad Stadium, Manchester"
                ticketType="Hospitality Package"
                section="Platinum Suite"
                row="1"
                seat="5"
                price="650"
                token="MAN"
                image="/football-ticket-nft-manchester-city-design.jpg"
                seller={{
                  address: "0x6q7r...8s9t",
                  rating: 5.0,
                }}
              />

              <MarketplaceTicketCard
                id="6"
                eventName="Inter Milan vs Napoli"
                eventDate="May 18, 2025"
                eventLocation="San Siro, Milan"
                ticketType="Standard Seat"
                section="Curva Nord"
                row="20"
                seat="18"
                price="150"
                token="INT"
                image="/football-ticket-nft-inter-milan-design.jpg"
                seller={{
                  address: "0xu1v...2w3x",
                  rating: 4.5,
                }}
              />

              <MarketplaceTicketCard
                id="7"
                eventName="Galatasaray vs Fenerbahçe"
                eventDate="May 19, 2025"
                eventLocation="NEF Stadium, Istanbul"
                ticketType="VIP Experience"
                section="VIP Area"
                row="3"
                seat="9"
                price="400"
                token="GAL"
                image="/football-ticket-nft-galatasaray-design.jpg"
                seller={{
                  address: "0x4y5z...6a7b",
                  rating: 4.8,
                }}
              />

              <MarketplaceTicketCard
                id="8"
                eventName="FC Barcelona vs Real Madrid"
                eventDate="May 15, 2025"
                eventLocation="Camp Nou, Barcelona"
                ticketType="Standard Seat"
                section="Lateral"
                row="25"
                seat="30"
                price="200"
                token="BAR"
                image="/football-ticket-nft-barcelona-design-alternative.jpg"
                seller={{
                  address: "0x8c9d...0e1f",
                  rating: 4.7,
                }}
              />
            </div>

            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Similar content to "all" tab but filtered for upcoming events */}
              <p className="col-span-full text-center py-8 text-gray-500">Showing only tickets for upcoming events</p>
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Similar content to "all" tab but filtered for past events */}
              <p className="col-span-full text-center py-8 text-gray-500">
                Showing only tickets from past events (collectibles)
              </p>
            </div>
          </TabsContent>

          <TabsContent value="collectibles" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Similar content to "all" tab but filtered for collectibles */}
              <p className="col-span-full text-center py-8 text-gray-500">Showing only special collectible tickets</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
