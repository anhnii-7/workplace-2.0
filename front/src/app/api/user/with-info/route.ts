import { NextResponse } from 'next/server';
import User from '../../../../lib/models/user';
import { dbConnect } from '../../../../lib/connection';

export async function GET() {
  try {
    await dbConnect();
    
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
    
    return NextResponse.json(
      { 
        success: true, 
        data: userWithInfo,
        count: userWithInfo.length 
      }, 
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching users with info:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch users with info" 
      }, 
      { status: 500 }
    );
  }
} 