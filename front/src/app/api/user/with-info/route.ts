import { NextResponse } from 'next/server';
import User from '../../../../lib/models/user';
import { dbConnect } from '../../../../lib/connection';

export async function GET() {
  await dbConnect();
  try {
    const userWithInfo = await User.aggregate([
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
    return NextResponse.json({ success: true, userWithInfo }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 