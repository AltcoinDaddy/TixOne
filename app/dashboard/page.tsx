import Link from "next/link"
import { ArrowRight, Calendar, CreditCard, QrCode, Ticket, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserTicketCard } from "@/components/user-ticket-card"
import { TokenBalanceCard } from "@/components/token-balance-card"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your tickets and fan tokens</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link href="/marketplace">
              <Ticket className="h-4 w-4" />
              <span>Browse Marketplace</span>
            </Link>
          </Button>
          <Button asChild className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
            <Link href="/events">
              <Calendar className="h-4 w-4" />
              <span>Find Events</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Token Balances */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Fan Tokens</h2>
          <Button asChild variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Link href="/tokens">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TokenBalanceCard
            token="PSG"
            name="Paris Saint-Germain"
            balance="120.5"
            value="$602.50"
            change="+2.3%"
            positive={true}
          />

          <TokenBalanceCard
            token="BAR"
            name="FC Barcelona"
            balance="85.2"
            value="$426.00"
            change="-1.5%"
            positive={false}
          />

          <TokenBalanceCard token="JUV" name="Juventus" balance="50.0" value="$250.00" change="+0.8%" positive={true} />

          <TokenBalanceCard token="CHZ" name="Chiliz" balance="500.0" value="$125.00" change="+5.2%" positive={true} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Buy Fan Tokens</CardTitle>
            <CardDescription>Purchase tokens for your favorite teams</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/tokens/buy">
                <Wallet className="mr-2 h-4 w-4" />
                Buy Tokens
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Swap Tokens</CardTitle>
            <CardDescription>Exchange between different fan tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tokens/swap">
                <CreditCard className="mr-2 h-4 w-4" />
                Swap Tokens
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Validate Tickets</CardTitle>
            <CardDescription>Generate QR codes for venue entry</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/tickets/validate">
                <QrCode className="mr-2 h-4 w-4" />
                Validate Tickets
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tickets */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Tickets</h2>

        <Tabs defaultValue="upcoming">
          <TabsList className="mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="marketplace">On Marketplace</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UserTicketCard
                id="1"
                eventName="FC Barcelona vs Real Madrid"
                eventDate="May 15, 2025"
                eventLocation="Camp Nou, Barcelona"
                ticketType="Premium Seat"
                section="Main Stand"
                row="10"
                seat="15"
                image="/placeholder.svg?height=400&width=300&query=football ticket NFT barcelona design"
                status="upcoming"
              />

              <UserTicketCard
                id="2"
                eventName="Paris Saint-Germain vs Lyon"
                eventDate="May 10, 2025"
                eventLocation="Parc des Princes, Paris"
                ticketType="VIP Experience"
                section="VIP Box"
                row="2"
                seat="7"
                image="/placeholder.svg?height=400&width=300&query=football ticket NFT PSG design"
                status="upcoming"
              />
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UserTicketCard
                id="3"
                eventName="Juventus vs AC Milan"
                eventDate="April 15, 2025"
                eventLocation="Allianz Stadium, Turin"
                ticketType="Standard Seat"
                section="Curva Sud"
                row="15"
                seat="22"
                image="/placeholder.svg?height=400&width=300&query=football ticket NFT juventus design"
                status="past"
              />
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <UserTicketCard
                id="4"
                eventName="Atlético Madrid vs Sevilla"
                eventDate="May 14, 2025"
                eventLocation="Wanda Metropolitano, Madrid"
                ticketType="Premium Seat"
                section="Lateral"
                row="8"
                seat="12"
                image="/placeholder.svg?height=400&width=300&query=football ticket NFT atletico madrid design"
                status="selling"
                price="220"
                token="ATM"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
