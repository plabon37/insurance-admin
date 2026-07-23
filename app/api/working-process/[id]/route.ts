import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import WorkingProcess from "@/lib/models/WorkingProcess";

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

    const workingProcess = await WorkingProcess.findById(id);

    if (!workingProcess) {
      return NextResponse.json(
        {
          success: false,
          message: "Working process not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: workingProcess,
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

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectToDB();

    const { id } = await params;

    const body = await req.json();

    const updatedWorkingProcess =
      await WorkingProcess.findByIdAndUpdate(id, body, {
        new: true,
      });

    if (!updatedWorkingProcess) {
      return NextResponse.json(
        {
          success: false,
          message: "Working process not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Working process updated successfully.",
      data: updatedWorkingProcess,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update working process.",
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

    const deletedWorkingProcess =
      await WorkingProcess.findByIdAndDelete(id);

    if (!deletedWorkingProcess) {
      return NextResponse.json(
        {
          success: false,
          message: "Working process not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Working process deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete working process.",
      },
      {
        status: 500,
      }
    );
  }
}