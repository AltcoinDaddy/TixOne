"use client"

import { useState } from "react"
import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PurchaseTicketFormProps {
  event: any // In a real app, we would use a proper type
}

export function PurchaseTicketForm({ event }: PurchaseTicketFormProps) {
  const [selectedTicket, setSelectedTicket] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("1")
  const [paymentToken, setPaymentToken] = useState<string>("")
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleTicketChange = (value: string) => {
    setSelectedTicket(value)
    // Set default payment token to the first available token for this ticket type
    const ticket = event.ticketTypes.find((t: any) => t.name === value)
    if (ticket && ticket.tokens.length > 0) {
      setPaymentToken(ticket.tokens[0])
    }
  }

  const handlePurchase = () => {
    // In a real app, we would handle the purchase here
    setIsConfirmDialogOpen(true)
  }

  const getTicketPrice = () => {
    if (!selectedTicket) return null

    const ticket = event.ticketTypes.find((t: any) => t.name === selectedTicket)
    if (!ticket) return null

    return {
      price: ticket.price,
      token: paymentToken || ticket.tokens[0],
    }
  }

  const ticketPrice = getTicketPrice()
  const totalPrice = ticketPrice ? Number.parseInt(ticketPrice.price) * Number.parseInt(quantity || "1") : 0

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="ticket-type" className="block text-sm font-medium text-gray-700 mb-1">
          Ticket Type
        </label>
        <Select value={selectedTicket} onValueChange={handleTicketChange}>
          <SelectTrigger id="ticket-type">
            <SelectValue placeholder="Select ticket type" />
          </SelectTrigger>
          <SelectContent>
            {event.ticketTypes.map((ticket: any) => (
              <SelectItem key={ticket.name} value={ticket.name}>
                {ticket.name} - {ticket.price} {ticket.tokens[0]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTicket && (
        <>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger id="quantity">
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center mb-1">
              <label htmlFor="payment-token" className="block text-sm font-medium text-gray-700">
                Payment Token
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-1 text-gray-400 hover:text-gray-500">
                      <Info className="h-4 w-4" />
                      <span className="sr-only">Payment token information</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Select which token you want to use for payment. Different tokens may have different prices.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Select value={paymentToken} onValueChange={setPaymentToken}>
              <SelectTrigger id="payment-token">
                <SelectValue placeholder="Select payment token" />
              </SelectTrigger>
              <SelectContent>
                {event.ticketTypes
                  .find((t: any) => t.name === selectedTicket)
                  ?.tokens.map((token: string) => (
                    <SelectItem key={token} value={token}>
                      ${token}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Price per ticket:</span>
              <span className="font-medium">
                {ticketPrice?.price} ${ticketPrice?.token}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total:</span>
              <span className="font-bold text-lg">
                {totalPrice} ${ticketPrice?.token}
              </span>
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handlePurchase}
              disabled={!selectedTicket || !quantity || !paymentToken}
            >
              Purchase Tickets
            </Button>
          </div>
        </>
      )}

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
            <DialogDescription>You need to connect your wallet to purchase tickets</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <p className="text-sm text-gray-600">
              You're about to purchase {quantity} {selectedTicket} ticket(s) for {event.title}.
            </p>
            <p className="text-sm text-gray-600">
              Total cost: {totalPrice} ${paymentToken}
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">Connect Wallet</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
