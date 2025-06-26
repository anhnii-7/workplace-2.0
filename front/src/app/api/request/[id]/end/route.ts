import { NextRequest, NextResponse } from 'next/server';
import RequestModel from '../../../../../lib/models/request';
import User from '../../../../../lib/models/user';
import { dbConnect } from '../../../../../lib/connection';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const request = await RequestModel.findById(id);
  if (!request) {
    return NextResponse.json({ message: 'Request not found' }, { status: 404 });
  }
  if (!request.isActive) {
    return NextResponse.json({ message: 'Mentorship is not active' }, { status: 400 });
  }
  request.isActive = false;
  await request.save();
  await User.findByIdAndUpdate(request.from, {
    currentMentor: null,
    $push: { pastMentors: request.to },
  });
  return NextResponse.json({ success: true, message: 'Mentorship ended successfully' }, { status: 200 });
} 