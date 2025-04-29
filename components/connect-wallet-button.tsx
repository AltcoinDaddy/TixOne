"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = (walletType: string) => {
    setSelectedWallet(walletType)
    setIsConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true)
      setIsDialogOpen(false)
      setIsConnecting(false)

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletType} wallet`,
        variant: "default",
      })
    }, 1500)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setSelectedWallet(null)

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
      variant: "default",
    })
  }

  if (isConnected) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-gray-300 hover:border-red-600 hover:bg-red-50 transition-all duration-300"
          onClick={handleDisconnect}
        >
          <Wallet className="h-4 w-4 text-red-600" />
          <span className="hidden sm:inline">0x1a2b...3c4d</span>
          <span className="sm:hidden">Wallet</span>
        </Button>
      </motion.div>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2 btn-hover-effect">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Connect your wallet</DialogTitle>
          <DialogDescription>Choose a wallet to connect to FanPay</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <WalletOption
            name="Chiliz Wallet"
            description="Connect to Chiliz Chain"
            icon="C"
            iconColor="text-red-600"
            iconBg="bg-red-100"
            onClick={() => handleConnect("Chiliz")}
            isLoading={isConnecting && selectedWallet === "Chiliz"}
          />

          <WalletOption
            name="MetaMask"
            description="Connect to Ethereum"
            icon="M"
            iconColor="text-orange-600"
            iconBg="bg-orange-100"
            onClick={() => handleConnect("MetaMask")}
            isLoading={isConnecting && selectedWallet === "MetaMask"}
          />

          <WalletOption
            name="WalletConnect"
            description="Connect with QR code"
            icon="W"
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
            onClick={() => handleConnect("WalletConnect")}
            isLoading={isConnecting && selectedWallet === "WalletConnect"}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface WalletOptionProps {
  name: string
  description: string
  icon: string
  iconColor: string
  iconBg: string
  onClick: () => void
  isLoading: boolean
}

function WalletOption({ name, description, icon, iconColor, iconBg, onClick, isLoading }: WalletOptionProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        variant="outline"
        className="flex justify-start items-center gap-3 h-14 w-full hover:border-red-600 hover:bg-red-50 transition-all duration-300"
        onClick={onClick}
        disabled={isLoading}
      >
        <div className={`h-8 w-8 ${iconBg} rounded-full flex items-center justify-center`}>
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-t-transparent border-red-600 rounded-full animate-spin"></div>
          ) : (
            <span className={`font-bold ${iconColor}`}>{icon}</span>
          )}
        </div>
        <div className="flex flex-col items-start">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-gray-500">{description}</span>
        </div>
      </Button>
    </motion.div>
  )
}
