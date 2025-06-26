import { NextRequest, NextResponse } from 'next/server';
import Department from '../../../lib/models/department';
import { dbConnect } from '../../../lib/connection';

export async function GET() {
  await dbConnect();
  try {
    const department = await Department.find();
    return NextResponse.json({ success: true, department }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    const department = await Department.create(body);
    return NextResponse.json({ success: true, department }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 