import { NextRequest, NextResponse } from 'next/server';
import JobTitle from '../../../lib/models/jobTitle';
import { dbConnect } from '../../../lib/connection';

export async function GET() {
  await dbConnect();
  try {
    const jobTitle = await JobTitle.find();
    return NextResponse.json({ success: true, jobTitle }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const jobTitle = await JobTitle.create(body);
    return NextResponse.json({ success: true, jobTitle }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 