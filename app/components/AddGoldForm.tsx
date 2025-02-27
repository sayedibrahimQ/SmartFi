"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DiamondIcon as GoldIcon } from "lucide-react"

interface Gold {
  name: string
  value: number
  quantity: number
  purchasePrice: number
  currentPrice: number
}

export default function AddGoldForm({ onAddGold }: { onAddGold: (gold: Gold) => void }) {
  const [quantity, setQuantity] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [currentPrice, setCurrentPrice] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newGold: Gold = {
      name: "Gold",
      quantity: Number(quantity),
      purchasePrice: Number(purchasePrice),
      currentPrice: Number(currentPrice),
      value: Number(quantity) * Number(currentPrice),
    }
    onAddGold(newGold)
    setQuantity("")
    setPurchasePrice("")
    setCurrentPrice("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center">
        <GoldIcon className="w-5 h-5 mr-2" />
        Add Gold
      </h3>
      <Input
        type="number"
        placeholder="Quantity (oz)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        className="bg-white/70 dark:bg-gray-700/70"
      />
      <Input
        type="number"
        placeholder="Purchase Price per oz"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        required
        className="bg-white/70 dark:bg-gray-700/70"
      />
      <Input
        type="number"
        placeholder="Current Price per oz"
        value={currentPrice}
        onChange={(e) => setCurrentPrice(e.target.value)}
        required
        className="bg-white/70 dark:bg-gray-700/70"
      />
      <Button
        type="submit"
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white transition-all duration-200 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Add Gold
      </Button>
    </form>
  )
}

