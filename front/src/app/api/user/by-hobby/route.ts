import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../lib/models/user';
import { dbConnect } from '../../../../lib/connection';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ message: 'Missing id' }, { status: 400 });
  }
  try {
    const users = await User.aggregate([
      { $match: { hobby: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'hobbies',
          localField: 'hobby',
          foreignField: '_id',
          as: 'hobbyInfo',
        },
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'departmentInfo',
          pipeline: [
            {
              $lookup: {
                from: 'jobtitles',
                localField: 'jobTitle',
                foreignField: '_id',
                as: 'jobTitleInfo',
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: '$hobbyInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$departmentInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$departmentInfo.jobTitleInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 