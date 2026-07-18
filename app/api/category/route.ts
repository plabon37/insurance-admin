import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import Category from "@/lib/models/Category";

export async function GET() {
  try {
    await connectToDB();

    const categories = await Category.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
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
        }
      );
    }

    return NextResponse.json(
  {
    success: true,
    data: categories,
  },
  {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3001",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  }
);
  }
}
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3001",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}