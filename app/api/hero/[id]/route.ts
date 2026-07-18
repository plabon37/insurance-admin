import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import Hero from "@/lib/models/Hero";

// =======================
// UPDATE HERO
// PATCH /api/hero/:id
// =======================

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;
    const body = await req.json();

    const hero = await Hero.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!hero) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Hero updated successfully",
        data: hero,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH HERO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update hero",
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE HERO
// DELETE /api/hero/:id
// =======================

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    const hero = await Hero.findByIdAndDelete(id);

    if (!hero) {
      return NextResponse.json(
        {
          success: false,
          message: "Hero not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Hero deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE HERO ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete hero",
      },
      { status: 500 }
    );
  }
}