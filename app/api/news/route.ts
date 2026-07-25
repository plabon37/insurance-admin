import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import News from "@/lib/models/News";

export async function GET() {
  try {
    await connectToDB();

    const news = await News.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch news.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    const news = await News.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "News created successfully.",
        data: news,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create news.",
      },
      {
        status: 500,
      }
    );
  }
}