import { NextRequest, NextResponse } from 'next/server';
import User from '../../../lib/models/user';
import { dbConnect } from '../../../lib/connection';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Имэйл болон нууц үгээ оруулна уу' }, { status: 400 });
    }
    const userAggregate = await User.aggregate([
      { $match: { email: email } },
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
    const user = userAggregate[0];
    if (!user) {
      return NextResponse.json({ success: false, message: 'Хэрэглэгч олдсонгүй' }, { status: 404 });
    }
    if (password !== user.password) {
      return NextResponse.json({ success: false, message: 'Нууц үг буруу байна' }, { status: 401 });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        experience: user.experience,
        department: user.department,
        lastName: user.lastName,
        menteesCount: user.menteesCount,
        name: user.name,
        availableSchedules: user.availableSchedules,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return NextResponse.json({ success: true, token, user: userWithoutPassword }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: `${error}, Серверийн алдаа гарлаа` }, { status: 500 });
  }
} 