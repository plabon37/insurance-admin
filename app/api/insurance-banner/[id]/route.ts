import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import InsuranceBanner from "@/lib/models/InsuranceBanner";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  try {
    await connectToDB();

    const { id } = await params;

    const banner = await InsuranceBanner.findById(id);

    if (!banner) {
      return NextResponse.json(
        {
          success: false,
          message: "Insurance Banner not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch insurance banner",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  try {
    await connectToDB();

    const { id } = await params;

    const body = await request.json();

    const banner = await InsuranceBanner.findByIdAndUpdate(
      id,
      {
        badge: body.badge,
        title: body.title,
        description: body.description,
        buttonText: body.buttonText,
        buttonLink: body.buttonLink,
        email: body.email,
        image: body.image,
        displayOrder: body.displayOrder,
        isActive: body.isActive,
      },
      {
        new: true,
      }
    );

    if (!banner) {
      return NextResponse.json(
        {
          success: false,
          message: "Insurance Banner not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Insurance Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update insurance banner",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    await connectToDB();

    const { id } = await params;

    const banner = await InsuranceBanner.findByIdAndDelete(id);

    if (!banner) {
      return NextResponse.json(
        {
          success: false,
          message: "Insurance Banner not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Insurance Banner deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete insurance banner",
      },
      {
        status: 500,
      }
    );
  }
}