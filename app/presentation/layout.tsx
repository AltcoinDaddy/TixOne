import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TixOne Presentation - Hackathon Pitch Deck",
  description: "Interactive presentation showcasing TixOne's blockchain-powered sports ticketing platform",
}

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="presentation-layout">{children}</div>
}
