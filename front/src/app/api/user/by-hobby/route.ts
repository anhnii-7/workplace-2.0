import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../lib/models/user';
import { dbConnect } from '../../../../lib/connection';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) { try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing id' 
        }, 
        { status: 400 }
      );
    }
    
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
    
    return NextResponse.json(
      { 
        success: true, 
        data: users,
        count: users.length 
      }, 
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching users by hobby:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch users by hobby" 
      }, 
      { status: 500 }
    );
  }
} 