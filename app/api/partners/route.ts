import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import Partner from "@/lib/models/Partner";

export async function GET() {
  try {
    await connectToDB();

    const partners = await Partner.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: partners,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch partners",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const body = await request.json();

    const partner = await Partner.create({
      heading: body.heading,
      logos: body.logos,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Partner created successfully",
        data: partner,
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
        message: "Failed to create partner",
      },
      {
        status: 500,
      }
    );
  }
}