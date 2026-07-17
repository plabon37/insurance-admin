import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/connectToDB"; // Change the path if your file is elsewhere

export async function GET() {
  try {
    await connectToDB();

    return NextResponse.json({
      success: true,
      message: "MongoDB Connected Successfully",
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      state: mongoose.connection.readyState, // 1 = Connected
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "MongoDB Connection Failed",
        error: error instanceof Error ? error.message : "Unknown Error",
      },
      { status: 500 }
    );
  }
}