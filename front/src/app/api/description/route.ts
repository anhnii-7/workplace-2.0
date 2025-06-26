import { NextRequest, NextResponse } from 'next/server';
import Description from '../../../lib/models/description';
import { dbConnect } from '../../../lib/connection';

export async function GET() {
  await dbConnect();
  try {
    const description = await Description.find();
    return NextResponse.json({ success: true, description }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const description = await Description.create(body);
    return NextResponse.json({ success: true, description }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 