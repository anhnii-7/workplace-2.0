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

    // ObjectId хэлбэр зөв эсэх шалгах
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ 
        message: 'Invalid userId format' 
      }, { status: 400 });
    }

    // Хэрэглэгчийн хоббиудыг олох
    const user = await User.findById(userId)
      .select('hobby')
      .populate('hobby', 'name title image');

    if (!user) {
      return NextResponse.json({ 
        message: 'User not found' 
      }, { status: 404 });
    }

    // Хобби массив хэлбэрт буцаах
    const hobbies = Array.isArray(user.hobby) ? user.hobby : (user.hobby ? [user.hobby] : []);

    return NextResponse.json({
      success: true,
      hobbies: hobbies,
      count: hobbies.length
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching user hobbies:', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      error: error.message
    }, { status: 500 });
  }
}