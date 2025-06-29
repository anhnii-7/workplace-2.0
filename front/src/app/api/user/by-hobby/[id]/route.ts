import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/user";
import { dbConnect } from "@/lib/connection";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const userId = params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user ID",
        },
        { status: 400 }
      );
    }

    const user = await User.findById(userId)
      .populate("hobby")
      .select("hobby");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user.hobby,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching user hobbies:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user hobbies",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
