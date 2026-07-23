import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import WorkingProcess from "@/lib/models/WorkingProcess";

export async function GET() {
  try {
    await connectToDB();

    const workingProcesses = await WorkingProcess.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: workingProcesses,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch working process.",
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

    const workingProcess = await WorkingProcess.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Working process created successfully.",
        data: workingProcess,
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
        message: "Failed to create working process.",
      },
      {
        status: 500,
      }
    );
  }
}