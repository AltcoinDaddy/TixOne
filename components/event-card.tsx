import Link from "next/link"
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { View3dIcon } from "@/components/view-3d-icon"
import { cn } from "@/lib/utils"

interface EventCardProps {
  id: string
  title: string
  date: string
  time: string
  location: string
  image: string
  tokens: string[]
  className?: string
}

export function EventCard({ id, title, date, time, location, image, tokens, className }: EventCardProps) {
  return (
    <div
      className={cn(
        "group overflow-hidden bg-white border rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className,
      )}
    >
      {/* Card image with gradient overlay */}
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Tokens displayed on the image */}
        <div className="absolute top-3 left-3 flex gap-1">
          {tokens.map((token) => (
            <div key={token} className="px-2 py-0.5 text-xs font-medium text-white bg-red-600 rounded">
              ${token}
            </div>
          ))}
        </div>

        {/* Preview button - shown on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <Button size="sm" variant="outline" className="text-white border-white/30 bg-black/30 hover:bg-black/50">
            <View3dIcon className="w-4 h-4 mr-1 text-red-400" />
            3D Preview
          </Button>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="mb-3 text-lg font-bold line-clamp-2 group-hover:text-red-600 transition-colors">{title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{date}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{time}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <Button
          asChild
          className="w-full bg-gray-900 hover:bg-red-600 transition-colors flex items-center justify-center"
        >
          <Link href={`/events/${id}`}>
            View Details
            <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
