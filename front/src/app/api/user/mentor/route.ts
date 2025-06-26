import { NextResponse } from 'next/server';
import User from '../../../../lib/models/user';
import { dbConnect } from '../../../../lib/connection';

export async function GET() {
  await dbConnect();
  try {
    const mentors = await User.find({ role: 'mentor' });
    return NextResponse.json(mentors, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 