import Link from "next/link"
import { CalendarDays, MapPin, Star, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface MarketplaceTicketCardProps {
  id: string
  eventName: string
  eventDate: string
  eventLocation: string
  ticketType: string
  section: string
  row: string
  seat: string
  price: string
  token: string
  image: string
  seller: {
    address: string
    rating: number
  }
}

export function MarketplaceTicketCard({
  id,
  eventName,
  eventDate,
  eventLocation,
  ticketType,
  section,
  row,
  seat,
  price,
  token,
  image,
  seller,
}: MarketplaceTicketCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[3/4]">
        <img src={image || "/placeholder.svg"} alt={`Ticket for ${eventName}`} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">${token}</div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{eventName}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-1">
          <CalendarDays className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{eventDate}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{eventLocation}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
          <div className="bg-gray-100 p-2 rounded">
            <span className="block text-gray-500">Type</span>
            <span className="font-medium truncate">{ticketType}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <span className="block text-gray-500">Section</span>
            <span className="font-medium truncate">{section}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <span className="block text-gray-500">Seat</span>
            <span className="font-medium truncate">
              {row}-{seat}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-xs mb-1">
          <User className="h-3 w-3 mr-1" />
          <span>Seller: {seller.address}</span>
        </div>
        <div className="flex items-center text-gray-600 text-xs">
          <Star className="h-3 w-3 mr-1 text-yellow-500" />
          <span>{seller.rating}/5.0</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-bold text-lg">
          {price} ${token}
        </div>
        <Button asChild size="sm">
          <Link href={`/marketplace/${id}`}>Buy Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
