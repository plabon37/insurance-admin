import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import FooterCTA from "@/lib/models/FooterCTA";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDB();

    const { id } = await params;

    const footerCTA = await FooterCTA.findById(id);

    if (!footerCTA) {
      return NextResponse.json(
        {
          success: false,
          message: "Footer CTA not found.",
        },
        {
          status: 404,
        }
      );
    }

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

export async function PATCH(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDB();

    const { id } = await params;

    const body = await req.json();

    const footerCTA = await FooterCTA.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      }
    );

    if (!footerCTA) {
      return NextResponse.json(
        {
          success: false,
          message: "Footer CTA not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Footer CTA updated successfully.",
      data: footerCTA,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update Footer CTA.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDB();

    const { id } = await params;

    const footerCTA = await FooterCTA.findByIdAndDelete(id);

    if (!footerCTA) {
      return NextResponse.json(
        {
          success: false,
          message: "Footer CTA not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Footer CTA deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete Footer CTA.",
      },
      {
        status: 500,
      }
    );
  }
}