import Link from "next/link"
import { ArrowLeft, CalendarDays, MapPin, Share2, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PurchaseTicketForm } from "@/components/purchase-ticket-form"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  // In a real app, we would fetch the event data based on the ID
  const event = getEventById(params.id)

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Event not found</h1>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-64 md:h-96">
        <img src={event.bannerImage || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <Link href="/events" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/80">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                <span>
                  {event.date} • {event.time}
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Event Details</TabsTrigger>
                <TabsTrigger value="venue">Venue Info</TabsTrigger>
                <TabsTrigger value="tickets">Ticket Info</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                  <p className="text-gray-700">{event.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-bold mb-3">Teams</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {event.teams.map((team) => (
                      <div key={team.name} className="flex items-center p-4 border rounded-lg">
                        <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                          <span className="font-bold text-gray-700">{team.shortName}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{team.name}</h4>
                          <p className="text-sm text-gray-600">{team.tokenSymbol}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="venue" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Venue Information</h2>
                  <p className="text-gray-700 mb-4">{event.venue.description}</p>

                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={event.venue.image || "/placeholder.svg"}
                      alt={event.venue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-bold mb-3">Location & Directions</h3>
                  <p className="text-gray-700 mb-2">{event.venue.address}</p>
                  <p className="text-gray-700 mb-4">{event.venue.directions}</p>

                  <Button variant="outline">View on Map</Button>
                </div>
              </TabsContent>

              <TabsContent value="tickets" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Ticket Information</h2>
                  <p className="text-gray-700 mb-4">
                    All tickets are issued as NFTs on the Chiliz blockchain. Each ticket is a unique digital asset that
                    can be transferred or resold.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {event.ticketTypes.map((ticket) => (
                      <div key={ticket.name} className="border rounded-lg p-4">
                        <h4 className="font-bold text-lg mb-1">{ticket.name}</h4>
                        <p className="text-gray-600 mb-2">{ticket.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {ticket.tokens.map((token) => (
                              <div
                                key={token}
                                className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded"
                              >
                                ${token}
                              </div>
                            ))}
                          </div>
                          <div className="font-bold">
                            {ticket.price} {ticket.tokens[0]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-bold mb-3">NFT Benefits</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Verifiable authenticity and ownership</li>
                    <li>Easy transfer to friends or family</li>
                    <li>Ability to resell on the secondary marketplace</li>
                    <li>Collectible value after the event</li>
                    <li>Potential for exclusive perks and rewards</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white border rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Ticket className="mr-2 h-5 w-5" />
                Purchase Tickets
              </h3>

              <PurchaseTicketForm event={event} />

              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock data function
function getEventById(id: string) {
  const events = {
    "barcelona-real-madrid": {
      title: "FC Barcelona vs Real Madrid",
      date: "May 15, 2025",
      time: "20:45",
      location: "Camp Nou, Barcelona",
      bannerImage:
        "/placeholder.svg?height=500&width=1200&query=football match barcelona vs real madrid in camp nou stadium",
      description:
        "Experience El Clásico live at Camp Nou! FC Barcelona faces off against their historic rivals Real Madrid in this highly anticipated La Liga match. This is more than just a game—it's a cultural phenomenon and one of the most watched sporting events in the world.",
      teams: [
        { name: "FC Barcelona", shortName: "BAR", tokenSymbol: "$BAR" },
        { name: "Real Madrid", shortName: "RMA", tokenSymbol: "N/A" },
      ],
      venue: {
        name: "Camp Nou",
        description:
          "Camp Nou is the home stadium of FC Barcelona and the largest stadium in Europe with a seating capacity of 99,354. It has been the home of Barcelona since its completion in 1957.",
        image: "/placeholder.svg?height=400&width=800&query=camp nou stadium barcelona aerial view",
        address: "C. d'Arístides Maillol, 12, 08028 Barcelona, Spain",
        directions:
          "The stadium is easily accessible by metro (Line 3 or Line 5 to Collblanc or Badal) or bus (Lines H8, 50, 54, 57, 70, 75, and 157).",
      },
      ticketTypes: [
        {
          name: "Standard Seat",
          description: "Regular seating in the stadium",
          price: "150",
          tokens: ["BAR"],
        },
        {
          name: "Premium Seat",
          description: "Better view and more comfortable seating",
          price: "300",
          tokens: ["BAR"],
        },
        {
          name: "VIP Experience",
          description: "Includes lounge access and premium services",
          price: "500",
          tokens: ["BAR"],
        },
        {
          name: "Hospitality Package",
          description: "Full hospitality experience with catering",
          price: "750",
          tokens: ["BAR", "CHZ"],
        },
      ],
    },
    "psg-lyon": {
      title: "Paris Saint-Germain vs Lyon",
      date: "May 10, 2025",
      time: "20:00",
      location: "Parc des Princes, Paris",
      bannerImage:
        "/placeholder.svg?height=500&width=1200&query=football match PSG vs Lyon in Parc des Princes stadium",
      description:
        "Watch Paris Saint-Germain take on Olympique Lyonnais in this exciting Ligue 1 match at the iconic Parc des Princes. This fixture always delivers high-quality football and intense competition.",
      teams: [
        { name: "Paris Saint-Germain", shortName: "PSG", tokenSymbol: "$PSG" },
        { name: "Olympique Lyonnais", shortName: "OL", tokenSymbol: "N/A" },
      ],
      venue: {
        name: "Parc des Princes",
        description:
          "Parc des Princes is the home stadium of Paris Saint-Germain with a capacity of 47,929. It has hosted numerous international matches and has been PSG's home since 1974.",
        image: "/placeholder.svg?height=400&width=800&query=parc des princes stadium paris aerial view",
        address: "24 Rue du Commandant Guilbaud, 75016 Paris, France",
        directions:
          "The stadium is accessible by metro (Line 9 to Porte de Saint-Cloud) or bus (Lines 22, 62, and 72).",
      },
      ticketTypes: [
        {
          name: "Standard Seat",
          description: "Regular seating in the stadium",
          price: "120",
          tokens: ["PSG"],
        },
        {
          name: "Premium Seat",
          description: "Better view and more comfortable seating",
          price: "250",
          tokens: ["PSG"],
        },
        {
          name: "VIP Experience",
          description: "Includes lounge access and premium services",
          price: "450",
          tokens: ["PSG"],
        },
        {
          name: "Hospitality Package",
          description: "Full hospitality experience with catering",
          price: "700",
          tokens: ["PSG", "CHZ"],
        },
      ],
    },
    // Add more events as needed
  }

  return events[id as keyof typeof events]
}
