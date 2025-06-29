import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../../lib/models/user';
import { dbConnect } from '../../../../../lib/connection';
import mongoose from 'mongoose';

// Next.js 15-д зориулсан тип
interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  await dbConnect();

  try {
    // params-г await хийх шаардлагатай
    const { id: userId } = await context.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing user ID" },
        { status: 400 }
      );
    }

    const result = await User.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "hobbies", // Must match the actual collection name
          localField: "hobby", // Ensure this matches the field in your User schema
          foreignField: "_id",
          as: "hobbies",
        },
      }
    ]);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // const hobbies = result[0].hobbies || [];

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching user hobbies:', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      error: error.message
    }, { status: 500 });
  }
}