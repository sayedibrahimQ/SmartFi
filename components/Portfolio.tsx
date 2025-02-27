"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddAssetDialog from "./AddAssetDialog";
import { IndianRupee, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import StockList from "@/app/components/StockList";
import { useUserContext } from "@/app/contexts/AppContext";
import axios from "axios";

interface Asset {
  id?: string;
  name: string;
  value: number;
  quantity: number;
  purchasePrice: number;
  purchaseDate: Date;
  type: "stock" | "gold";
}

interface AnalysisData {
  analysis: string;
  metrics: {
    totalValue: number;
    totalCost: number;
    totalGain: number;
    percentageGain: number;
    weeklyChange: number;
    weeklyPercentageChange: number;
    historicalPerformance: Array<{
      date: Date;
      value: number;
      gainLoss: number;
      percentageChange: number;
    }>;
    predictions: {
      predictedTotalValue: number;
      predictedGain: number;
      predictedPercentageGain: number;
      predictedValues: Array<{
        predictedValue: number;
        predictedGain: number;
        predictedPercentage: number;
      }>;
    };
  };
}

export default function Portfolio() {
  const { user } = useUserContext();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.id) {
          // Fetch assets
          const assetsResponse = await axios.get(
            `/api/asset?userId=${user.id}`
          );
          const assetsWithDates = assetsResponse.data.assets.map(
            (asset: Asset) => ({
              ...asset,
              purchaseDate: new Date(asset.purchaseDate),
            })
          );
          setAssets(assetsWithDates);

          // Fetch analysis
          const analysisResponse = await axios.get(
            `/api/asset/analyze?userId=${user.id}`
          );
          setAnalysis(analysisResponse.data);
          console.log(analysisResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  const formSchema = z.object({
    assetType: z.enum(["stock", "gold"]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      assetType: "stock",
    },
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addAsset = (newAsset: Asset) => {
    const assetWithId = {
      ...newAsset,
      id: newAsset.id || crypto.randomUUID(),
    };
    setAssets([...assets, assetWithId]);
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  if (loading) {
    return <div>Loading assets...</div>; // Add a proper loading component
  }

  return (
    <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
      <Card className='md:col-span-2 lg:col-span-3 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all'>
        <CardHeader>
          <CardTitle className='text-2xl font-black text-black flex items-center'>
            <IndianRupee className='mr-2 text-[#CBFF00] bg-black rounded-lg p-1' />
            Portfolio Summary
          </CardTitle>
        </CardHeader>
        <CardContent className='grid gap-6 md:grid-cols-3'>
          <div className='p-4 border-2 border-black rounded-xl bg-white'>
            <p className='text-sm font-bold text-gray-600'>Total Value</p>
            <p className='text-2xl font-black text-black'>
              ₹{analysis?.metrics.totalValue.toLocaleString() ?? 0}
            </p>
          </div>
          <div className='p-4 border-2 border-black rounded-xl bg-white'>
            <p className='text-sm font-bold text-gray-600'>Total Gain/Loss</p>
            <p
              className={`text-2xl font-black flex items-center ${
                analysis && analysis?.metrics.totalGain >= totalValue
                  ? "text-[#CBFF00] bg-black"
                  : "text-white bg-black"
              } rounded-lg px-2 py-1 inline-flex`}
            >
              {analysis && analysis?.metrics.totalGain >= totalValue ? (
                <ArrowUpRight className='mr-1' />
              ) : (
                <ArrowDownRight className='mr-1' />
              )}
              ₹{Math.abs(analysis?.metrics.totalGain ?? 0).toLocaleString()}
            </p>
          </div>
          <div className='p-4 border-2 border-black rounded-xl bg-white'>
            <p className='text-sm font-bold text-gray-600'>
              Percentage Gain/Loss
            </p>
            <p
              className={`text-2xl font-black flex items-center ${
                analysis && analysis?.metrics.percentageGain >= totalValue
                  ? "text-[#CBFF00] bg-black"
                  : "text-white bg-black"
              } rounded-lg px-2 py-1 inline-flex`}
            >
              {analysis && analysis?.metrics.percentageGain >= totalValue ? (
                <ArrowUpRight className='mr-1' />
              ) : (
                <ArrowDownRight className='mr-1' />
              )}
              {Math.abs(analysis?.metrics.percentageGain ?? 0).toFixed(2)}%
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className='md:col-span-2 lg:col-span-3 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-2xl font-black text-black'>
            Assets
          </CardTitle>
          <div className='flex space-x-4'>
            <Button
              onClick={() => {
                form.setValue("assetType", "stock");
                setIsDialogOpen(true);
              }}
              className='bg-[#CBFF00] text-black hover:bg-[#CBFF00] border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl'
            >
              Add Stock
            </Button>
            <Button
              onClick={() => {
                form.setValue("assetType", "gold");
                setIsDialogOpen(true);
              }}
              className='bg-[#CBFF00] text-black hover:bg-[#CBFF00] border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl'
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
  );
}
