import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import Category from "@/lib/models/Category";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    await connectToDB();

    const categories = await Category.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: categories,
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
        message: "Failed to fetch categories",
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

    const category = await Category.create({
      title: body.title,
      slug: body.slug,
      description: body.description,
      image: body.image,
      buttonText: body.buttonText,
      buttonLink: body.buttonLink,
      displayOrder: body.displayOrder,
      isActive: body.isActive,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        data: category,
      },
      {
        status: 201,
        headers: corsHeaders,
      }
    );
  } catch (error: any) {
    console.error(error);

    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug already exists",
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create category",
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}