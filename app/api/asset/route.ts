import { NextRequest, NextResponse } from "next/server";
import { Asset } from "@/models/assets";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { newAsset, userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const asset = await Asset.create({
      userId,
      name: newAsset.name,
      value: newAsset.value,
      quantity: newAsset.quantity,
      purchasePrice: newAsset.purchasePrice,
      purchaseDate: new Date(newAsset.purchaseDate),
      type: newAsset.type,
    });

    return NextResponse.json(
      { message: "Asset created successfully", asset },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating asset:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error },
      { status: 500 }
    );
  }
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

    const assets = await Asset.find({ userId });

    return NextResponse.json({ assets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching assets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
