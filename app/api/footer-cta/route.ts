import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import FooterCTA from "@/lib/models/FooterCTA";

export async function GET() {
  try {
    await connectToDB();

    const footerCTA = await FooterCTA.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: footerCTA,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch Footer CTA.",
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

    const footerCTA = await FooterCTA.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Footer CTA created successfully.",
        data: footerCTA,
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
        message: "Failed to create Footer CTA.",
      },
      {
        status: 500,
      }
    );
  }
}