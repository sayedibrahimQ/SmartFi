"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StockList from "./StockList"
import AddAssetDialog from "./AddAssetDialog"
import { IndianRupee, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

interface Asset {
  name: string
  value: number
  quantity: number
  purchasePrice: number
  purchaseDate: Date
  type: "stock" | "gold"
}

export default function Portfolio() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      name: "AAPL",
      value: 1500000,
      quantity: 100,
      purchasePrice: 13000,
      purchaseDate: new Date("2023-01-15"),
      type: "stock",
    },
    {
      name: "GOOGL",
      value: 2000000,
      quantity: 20,
      purchasePrice: 90000,
      purchaseDate: new Date("2023-02-20"),
      type: "stock",
    },
    {
      name: "MSFT",
      value: 1800000,
      quantity: 75,
      purchasePrice: 22000,
      purchaseDate: new Date("2023-03-10"),
      type: "stock",
    },
    {
      name: "Gold",
      value: 500000,
      quantity: 3,
      purchasePrice: 150000,
      purchaseDate: new Date("2023-04-05"),
      type: "gold",
    },
  ])

  const formSchema = z.object({
    assetType: z.enum(["stock", "gold"]),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      assetType: "stock",
    },
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addAsset = (newAsset: Asset) => {
    setAssets([...assets, newAsset])
  }

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const totalCost = assets.reduce((sum, asset) => sum + asset.purchasePrice * asset.quantity, 0)
  const totalGain = totalValue - totalCost
  const percentageGain = (totalGain / totalCost) * 100

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2 lg:col-span-3 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-black flex items-center">
            <IndianRupee className="mr-2 text-[#CBFF00] bg-black rounded-lg p-1" />
            Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className="p-4 border-2 border-black rounded-xl bg-white">
            <p className="text-sm font-bold text-gray-600">Total Value</p>
            <p className="text-2xl font-black text-black">₹{totalValue.toLocaleString()}</p>
          </div>
          <div className="p-4 border-2 border-black rounded-xl bg-white">
            <p className="text-sm font-bold text-gray-600">Total Gain/Loss</p>
            <p
              className={`text-2xl font-black flex items-center ${totalGain >= 0 ? "text-[#CBFF00] bg-black" : "text-white bg-black"} rounded-lg px-2 py-1 inline-flex`}
            >
              {totalGain >= 0 ? <ArrowUpRight className="mr-1" /> : <ArrowDownRight className="mr-1" />}₹
              {Math.abs(totalGain).toLocaleString()}
            </p>
          </div>
          <div className="p-4 border-2 border-black rounded-xl bg-white">
            <p className="text-sm font-bold text-gray-600">Percentage Gain/Loss</p>
            <p
              className={`text-2xl font-black flex items-center ${percentageGain >= 0 ? "text-[#CBFF00] bg-black" : "text-white bg-black"} rounded-lg px-2 py-1 inline-flex`}
            >
              {percentageGain >= 0 ? <ArrowUpRight className="mr-1" /> : <ArrowDownRight className="mr-1" />}
              {Math.abs(percentageGain).toFixed(2)}%
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-3 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-black text-black">Assets</CardTitle>
          <div className="flex space-x-4">
            <Button
              onClick={() => {
                form.setValue("assetType", "stock")
                setIsDialogOpen(true)
              }}
              className="bg-[#CBFF00] text-black hover:bg-[#CBFF00] border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl"
            >
              Add Stock
            </Button>
            <Button
              onClick={() => {
                form.setValue("assetType", "gold")
                setIsDialogOpen(true)
              }}
              className="bg-[#CBFF00] text-black hover:bg-[#CBFF00] border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl"
            >
              Add Gold
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <StockList assets={assets} />
        </CardContent>
      </Card>
      <AddAssetDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddAsset={addAsset}
        assetType={form.getValues("assetType")}
      />
    </div>
  )
}

