import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Asset } from "@/models/assets";
import { connectDB } from "@/lib/db";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// async function getPredictedValue(asset: any) {
//   // Simple prediction based on historical trend
//   const dailyReturn =
//     (asset.value - asset.purchasePrice) /
//     Math.max(
//       1,
//       Math.floor(
//         (new Date().getTime() - new Date(asset.purchaseDate).getTime()) /
//           (1000 * 60 * 60 * 24)
//       )
//     );

//   // Project value for next week
//   const projectedValue = asset.value + dailyReturn * 7;
//   return Math.max(projectedValue, asset.value * 0.95); // Assume max 5% loss
// }

async function getPredictedGainLoss(assets: any[]) {
  const prompt = `
    Given these assets:
    ${assets
      .map(
        (asset) => `
      ${asset.name} (${asset.type}):
      - Current Value: ₹${asset.value}
      - Purchase Price: ₹${asset.purchasePrice}
      - Quantity: ${asset.quantity}
      - Purchase Date: ${asset.purchaseDate.toLocaleDateString()}
    `
      )
      .join("\n")}

    Based on historical market trends and current market conditions:
    1. Calculate and predict the total gain/loss value
    2. Calculate and predict the percentage gain/loss
    3. Consider market volatility and asset type performance
    4. Provide realistic predictions based on historical data

    Return only the numerical predictions in this format:
    predictedGain: [number]
    predictedPercentage: [number]
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Parse the response to get numerical values
  const gainMatch = text.match(/predictedGain:\s*([-\d.]+)/);
  const percentageMatch = text.match(/predictedPercentage:\s*([-\d.]+)/);

  return {
    predictedGain: gainMatch ? parseFloat(gainMatch[1]) : 0,
    predictedPercentage: percentageMatch ? parseFloat(percentageMatch[1]) : 0,
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const assets = await Asset.find({ userId }).sort({ purchaseDate: 1 });

    // Calculate current metrics
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    const totalCost = assets.reduce(
      (sum, asset) => sum + asset.purchasePrice * asset.quantity,
      0
    );

    // Get AI predictions
    const predictions = await getPredictedGainLoss(assets);

    // Use the higher of actual or predicted gain/loss
    const totalGain = Math.max(
      totalValue - totalCost,
      predictions.predictedGain
    );
    const percentageGain = Math.max(
      totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0,
      predictions.predictedPercentage
    );

    return NextResponse.json(
      {
        metrics: {
          totalValue,
          totalCost,
          totalGain,
          percentageGain,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error analyzing assets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
