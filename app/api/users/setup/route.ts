import { NextRequest, NextResponse } from "next/server";
import { usersCollection, type User } from "@/lib/connect";
import { User as MongoUser } from "@/models/user";
import { connectDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    // Save to Astra DB
    const user: Partial<User> = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
    };
    await usersCollection.insertOne(user);

    // Update MongoDB user
    const updatedUser = await MongoUser.findOneAndUpdate(
      { email: data.email },
      {
        fullName: data.fullName,
        age: data.age,
        occupation: data.occupation,
        phone: data.phone,
        monthlyIncome: data.monthlyIncome,
        monthlyExpenses: data.monthlyExpenses,
        existingSavings: data.existingSavings,
        monthlyInvestmentCapacity: data.monthlyInvestmentCapacity,
        primaryGoal: data.primaryGoal,
        riskTolerance: data.riskTolerance,
        updatedAt: new Date(),
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found in MongoDB" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User data saved successfully",
        data: user,
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
