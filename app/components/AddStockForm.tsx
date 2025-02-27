"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

interface Stock {
  name: string
  value: number
  quantity: number
  purchasePrice: number
  currentPrice: number
}

export default function AddStockForm({ onAddStock }: { onAddStock: (stock: Stock) => void }) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [currentPrice, setCurrentPrice] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newStock: Stock = {
      name,
      quantity: Number(quantity),
      purchasePrice: Number(purchasePrice),
      currentPrice: Number(currentPrice),
      value: Number(quantity) * Number(currentPrice),
    }
    onAddStock(newStock)
    setName("")
    setQuantity("")
    setPurchasePrice("")
    setCurrentPrice("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        Add Stock
      </h3>
      <Input
        type="text"
        placeholder="Stock Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="bg-white/70 dark:bg-gray-700/70"
      />
      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        className="bg-white/70 dark:bg-gray-700/70"
      />
      <Input
        type="number"
        placeholder="Purchase Price"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        required
        className="bg-white/70 dark:bg-gray-700/70"
      />
      <Input
        type="number"
        placeholder="Current Price"
        value={currentPrice}
        onChange={(e) => setCurrentPrice(e.target.value)}
        required
        className="bg-white/70 dark:bg-gray-700/70"
      />
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Add Stock
      </Button>
    </form>
  )
}

