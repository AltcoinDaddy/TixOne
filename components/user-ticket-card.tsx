import Link from "next/link"
import { CalendarDays, MapPin, QrCode, Share2, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserTicketCardProps {
  id: string
  eventName: string
  eventDate: string
  eventLocation: string
  ticketType: string
  section: string
  row: string
  seat: string
  image: string
  status: "upcoming" | "past" | "selling"
  price?: string
  token?: string
}

export function UserTicketCard({
  id,
  eventName,
  eventDate,
  eventLocation,
  ticketType,
  section,
  row,
  seat,
  image,
  status,
  price,
  token,
}: UserTicketCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[3/4]">
        <img src={image || "/placeholder.svg"} alt={`Ticket for ${eventName}`} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          {status === "upcoming" && <Badge className="bg-green-600">Upcoming</Badge>}
          {status === "past" && (
            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
              Past Event
            </Badge>
          )}
          {status === "selling" && <Badge className="bg-blue-600">On Sale</Badge>}
        </div>

        {status === "selling" && (
          <div className="absolute bottom-2 right-2 bg-white text-red-600 text-xs font-bold px-2 py-1 rounded-full">
            {price} ${token}
          </div>
        )}
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

        <div className="grid grid-cols-3 gap-2 text-xs">
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
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between gap-2">
        {status === "upcoming" && (
          <>
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/tickets/${id}/transfer`}>
                <Share2 className="mr-1 h-4 w-4" />
                Transfer
              </Link>
            </Button>
            <Button asChild size="sm" className="flex-1">
              <Link href={`/tickets/${id}/view`}>
                <QrCode className="mr-1 h-4 w-4" />
                View QR
              </Link>
            </Button>
          </>
        )}

        {status === "past" && (
          <Button asChild size="sm" className="w-full">
            <Link href={`/tickets/${id}/view`}>View Collectible</Link>
          </Button>
        )}

        {status === "selling" && (
          <>
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/tickets/${id}/edit-listing`}>
                <Tag className="mr-1 h-4 w-4" />
                Edit Price
              </Link>
            </Button>
            <Button asChild size="sm" variant="destructive" className="flex-1">
              <Link href={`/tickets/${id}/cancel-listing`}>Cancel Sale</Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
