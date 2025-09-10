import type React from "react"
export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="presentation-mode">{children}</div>
}
