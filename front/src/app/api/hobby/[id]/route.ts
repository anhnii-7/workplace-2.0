import { NextRequest, NextResponse } from 'next/server';
import Hobby from '../../../../lib/models/hobby';
import { dbConnect } from '../../../../lib/connection';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const { title } = await req.json();
  const hobby = await Hobby.findByIdAndUpdate(id, { title }, { new: true });
  return NextResponse.json({ success: true, hobby }, { status: 200 });
}
 