import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../lib/models/user';
import { dbConnect } from '../../../../lib/connection';
import mongoose from 'mongoose';
import { se } from 'date-fns/locale';

// export async function GET(req: NextRequest) { try {
//     await dbConnect();
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get('id');
//     if (!id) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: 'Missing id' 
//         }, 
//         { status: 400 }
//       );
//     }
    
//     const users = await User.aggregate([
//       { $match: { hobby: new mongoose.Types.ObjectId(id) } },
//       {
//         $lookup: {
//           from: 'hobbies',
//           localField: 'hobby',
//           foreignField: '_id',
//           as: 'hobbyInfo',
//         },
//       },
//       {
//         $lookup: {
//           from: 'departments',
//           localField: 'department',
//           foreignField: '_id',
//           as: 'departmentInfo',
//           pipeline: [
//             {
//               $lookup: {
//                 from: 'jobtitles',
//                 localField: 'jobTitle',
//                 foreignField: '_id',
//                 as: 'jobTitleInfo',
//               },
//             },
//           ],
//         },
//       },
//       {
//         $unwind: {
//           path: '$hobbyInfo',
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $unwind: {
//           path: '$departmentInfo',
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $unwind: {
//           path: '$departmentInfo.jobTitleInfo',
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//     ]);
    
//     return NextResponse.json(
//       { 
//         success: true, 
//         data: users,
//         count: users.length 
//       }, 
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error fetching users by hobby:", error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: "Failed to fetch users by hobby" 
//       }, 
//       { status: 500 }
//     );
//   }
// } 

// Хэрэглэгчийн хобби нэмэх
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { userId, hobbyId } = await req.json();

    // Хоосон шалгалт
    if (!userId || !hobbyId) {
      return NextResponse.json({ message: 'Missing userId or hobbyId' }, { status: 400 });
    }

    // ObjectId хэлбэр зөв эсэх шалгах
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(hobbyId)) {
      return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
    }

    // Хэрэглэгч байгаа эсэхийг шалгах
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const hobbyObjectId = new mongoose.Types.ObjectId(hobbyId);

    // Hobby field-ийн төрлийг шалгаж, зөв хэлбэрт оруулах
    let currentHobbies: mongoose.Types.ObjectId[] = [];
    
    if (Array.isArray(user.hobby)) {
      // Хэрвээ аль хэдийн массив бол
      currentHobbies = user.hobby;
    } else if (user.hobby) {
      // Хэрвээ нэг ObjectId бол массив болгох
      currentHobbies = [user.hobby as mongoose.Types.ObjectId];
      console.log(`Converting hobby from single ObjectId to array for user ${userId}`);
    }
    // Хоосон бол хоосон массив үлдэнэ

    // Хобби аль хэдийн байгаа эсэхийг шалгах
    const isHobbyExists = currentHobbies.some(
      (h: mongoose.Types.ObjectId) => h.toString() === hobbyObjectId.toString()
    );

    if (isHobbyExists) {
      return NextResponse.json({
        message: 'Hobby already exists for this user'
      }, { status: 400 });
    }

    // Шинэ хобби нэмэх
    currentHobbies.push(hobbyObjectId);

    // Database-д шууд массив болгон update хийх
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { hobby: currentHobbies } },
      { 
        new: true, 
        runValidators: true,
        select: '-password'
      }
    ).populate('hobby', 'name');

    if (!updatedUser) {
      return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Hobby added successfully',
      user: updatedUser
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error adding hobby:', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      error: error.message
    }, { status: 500 });
  }
}



