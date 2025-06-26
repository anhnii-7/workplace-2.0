import { NextRequest, NextResponse } from 'next/server';
import User from '../../../lib/models/user';
import { dbConnect } from '../../../lib/connection';

export async function GET() {
  await dbConnect();
  try {
    const user = await User.find();
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const user = await User.create(body);
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 