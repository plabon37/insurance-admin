import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import InsuranceBanner from "@/lib/models/InsuranceBanner";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    await connectToDB();

    const banners = await InsuranceBanner.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: banners,
      },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch insurance banners",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const body = await request.json();

    const banner = await InsuranceBanner.create(body);

    return NextResponse.json(
      {
        success: true,
        data: banner,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create banner",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}