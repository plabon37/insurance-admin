import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import News from "@/lib/models/News";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectToDB();

    const { id } = await params;

    const news = await News.findById(id);

    if (!news) {
      return NextResponse.json(
        {
          success: false,
          message: "News not found.",
        },
        {
          status: 404,
        }
      );
    }

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

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectToDB();

    const { id } = await params;

    const body = await req.json();

    const updatedNews = await News.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      }
    );

    if (!updatedNews) {
      return NextResponse.json(
        {
          success: false,
          message: "News not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "News updated successfully.",
      data: updatedNews,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update news.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectToDB();

    const { id } = await params;

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json(
        {
          success: false,
          message: "News not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "News deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete news.",
      },
      {
        status: 500,
      }
    );
  }
}