"use client"

import { useState } from "react"

export function TokenFilter() {
  const [selectedTokens, setSelectedTokens] = useState<string[]>([])

  const tokens = [
    { code: "PSG", name: "Paris Saint-Germain" },
    { code: "JUV", name: "Juventus" },
    { code: "BAR", name: "FC Barcelona" },
    { code: "ATM", name: "Atlético Madrid" },
    { code: "MAN", name: "Manchester City" },
    { code: "ACM", name: "AC Milan" },
    { code: "INT", name: "Inter Milan" },
    { code: "NAP", name: "Napoli" },
    { code: "GAL", name: "Galatasaray" },
    { code: "POR", name: "FC Porto" },
  ]

  const toggleToken = (code: string) => {
    if (selectedTokens.includes(code)) {
      setSelectedTokens(selectedTokens.filter((t) => t !== code))
    } else {
      setSelectedTokens([...selectedTokens, code])
    }
  }

  return (
    <div className="space-y-2">
      {tokens.map((token) => (
        <div key={token.code} className="flex items-center">
          <input
            type="checkbox"
            id={`token-${token.code}`}
            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            checked={selectedTokens.includes(token.code)}
            onChange={() => toggleToken(token.code)}
          />
          <label htmlFor={`token-${token.code}`} className="ml-2 text-sm text-gray-700 flex items-center">
            <span className="font-medium">${token.code}</span>
            <span className="ml-1 text-gray-500">- {token.name}</span>
          </label>
        </div>
      ))}
    </div>
  )
}
