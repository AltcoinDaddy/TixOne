import { ArrowDown, ArrowUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface TokenBalanceCardProps {
  token: string
  name: string
  balance: string
  value: string
  change: string
  positive: boolean
}

export function TokenBalanceCard({ token, name, balance, value, change, positive }: TokenBalanceCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <span className="font-bold text-gray-700">${token}</span>
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-xs text-gray-500">${token}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold">{balance}</p>
            <p className="text-sm text-gray-500">{value}</p>
          </div>
          <div className={`flex items-center text-sm ${positive ? "text-green-600" : "text-red-600"}`}>
            {positive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
