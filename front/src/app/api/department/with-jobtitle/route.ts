import { NextResponse } from 'next/server';
import Department from '../../../../lib/models/department';
import { dbConnect } from '../../../../lib/connection';

export async function GET() {
  await dbConnect();
  try {
    const department = await Department.aggregate([
      {
        $lookup: {
          from: 'jobtitles',
          localField: 'jobTitle',
          foreignField: '_id',
          as: 'jobTitleInfo',
        },
      },
      {
        $unwind: {
          path: '$jobTitleInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return NextResponse.json({ success: true, department }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
} 