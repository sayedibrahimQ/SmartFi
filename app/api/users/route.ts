import { NextRequest, NextResponse } from "next/server";
import { usersCollection, type User } from "@/lib/connect";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const user: Partial<User> = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(user);

    return NextResponse.json(
      { message: "User created successfully", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
