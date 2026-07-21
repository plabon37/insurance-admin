import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import InsuranceBanner from "@/lib/models/InsuranceBanner";

export async function GET() {
  try {
    await connectToDB();

    const banners = await InsuranceBanner.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch insurance banners",
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

    const banner = await InsuranceBanner.create({
      badge: body.badge,
      title: body.title,
      description: body.description,
      buttonText: body.buttonText,
      buttonLink: body.buttonLink,
      email: body.email,
      image: body.image,
      displayOrder: body.displayOrder,
      isActive: body.isActive,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Insurance Banner created successfully",
        data: banner,
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
        message: "Failed to create insurance banner",
      },
      {
        status: 500,
      }
    );
  }
}