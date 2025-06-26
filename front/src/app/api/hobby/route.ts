import { NextRequest, NextResponse } from 'next/server';
import Hobby from '../../../lib/models/hobby';
import { dbConnect } from '../../../lib/connection';

export async function GET() {
  await dbConnect();
  const hobby = await Hobby.find();
  return NextResponse.json(hobby, { status: 200 });
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const hobby = await Hobby.create(body);
    return NextResponse.json({ success: true, hobby }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: 'Hobby already exists' }, { status: 400 });
    } else {
      return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
  }
} 