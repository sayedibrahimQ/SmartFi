import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DiamondIcon as GoldIcon, TrendingUp } from "lucide-react"

interface Asset {
  name: string
  value: number
  quantity: number
  purchasePrice: number
  purchaseDate: Date
  type: "stock" | "gold"
}

export default function StockList({ assets }: { assets: Asset[] }) {
  return (
    <div className="border-2 border-black rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-black hover:bg-black">
            <TableHead className="text-[#CBFF00] font-black">Asset</TableHead>
            <TableHead className="text-[#CBFF00] font-black">Quantity</TableHead>
            <TableHead className="text-[#CBFF00] font-black">Purchase Price</TableHead>
            <TableHead className="text-[#CBFF00] font-black">Purchase Date</TableHead>
            <TableHead className="text-[#CBFF00] font-black">Total Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => (
            <TableRow key={asset.name} className="hover:bg-gray-50">
              <TableCell className="font-black text-black flex items-center">
                {asset.type === "stock" ? (
                  <TrendingUp className="w-5 h-5 mr-2 text-[#CBFF00] bg-black rounded-lg p-1" />
                ) : (
                  <GoldIcon className="w-5 h-5 mr-2 text-[#CBFF00] bg-black rounded-lg p-1" />
                )}
                {asset.name}
              </TableCell>
              <TableCell className="font-bold text-black">{asset.quantity}</TableCell>
              <TableCell className="font-bold text-black">₹{asset.purchasePrice.toLocaleString()}</TableCell>
              <TableCell className="font-bold text-black">{asset.purchaseDate.toLocaleDateString()}</TableCell>
              <TableCell className="font-bold text-black">₹{asset.value.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

