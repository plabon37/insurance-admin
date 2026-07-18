import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import Hero from "@/lib/models/Hero";

// ======================
// GET ALL HERO
// ======================

export async function GET() {
  try {
    await connectToDB();

    const heroes = await Hero.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: heroes,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch heroes",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================
// CREATE HERO
// ======================

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    const {
      badge,
      title,
      description,
      buttonText,
      buttonLink,
      videoText,
      videoUrl,
      backgroundImage,
      isActive,
    } = body;

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero title is required",
        },
        {
          status: 400,
        }
      );
    }

    const hero = await Hero.create({
      badge,
      title,
      description,
      buttonText,
      buttonLink,
      videoText,
      videoUrl,
      backgroundImage,
      isActive,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Hero created successfully",
        data: hero,
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
        message: "Failed to create hero",
      },
      {
        status: 500,
      }
    );
  }
}