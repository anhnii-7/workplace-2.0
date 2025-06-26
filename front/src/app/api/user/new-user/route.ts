import { NextResponse } from 'next/server';
import User from '../../../../lib/models/user';
import { dbConnect } from '../../../../lib/connection';

export async function GET() {
  await dbConnect();
  try {
    const newUsers = await User.find({ role: 'new' });
    return NextResponse.json(newUsers, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 