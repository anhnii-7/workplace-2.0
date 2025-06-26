import { NextRequest, NextResponse } from 'next/server';
import RequestModel from '../../../../lib/models/request';
import User from '../../../../lib/models/user';
import { dbConnect } from '../../../../lib/connection';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;
  const { status, mentorNotes, meetingDate, meetingLocation } = await req.json();
  const request = await RequestModel.findById(id);
  if (!request) {
    return NextResponse.json({ message: 'Request not found' }, { status: 404 });
  }
  if (status === 'accepted') {
    const activeMentees = await RequestModel.countDocuments({
      to: request.to,
      isActive: true,
    });
    if (activeMentees >= 3) {
      return NextResponse.json({ message: 'Mentor has reached maximum number of active mentees' }, { status: 400 });
    }
    request.status = 'accepted';
    request.isActive = true;
    request.mentorNotes = mentorNotes;
    request.meetingDate = meetingDate;
    request.meetingLocation = meetingLocation;
    await Promise.all([
      User.findByIdAndUpdate(request.from, { currentMentor: request.to }),
      User.findByIdAndUpdate(request.to, { $inc: { menteesCount: 1 }, $push: { pastMentors: request.from } }),
    ]);
  } else if (status === 'declined') {
    request.status = 'declined';
    request.mentorNotes = mentorNotes || 'No reason provided';
  }
  await request.save();
  return NextResponse.json({ success: true, request }, { status: 200 });
} 