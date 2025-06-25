import { Request, Response } from "express";
import User from "../schema/user";
import jwt from "jsonwebtoken";

type User = {
    _id: string,
    name: string,
    lastName: string,
    department: string,
    email: string,
    password: string,
    role: string,
    experience: string,
    hobby: string,
    menteesCount: number,
    currentMentor?: null,
    availableSchedules: []
    hobbyInfo:
    {
        _id: string,
        title: string,
        image: string,
    }[],
    departmentInfo: {
        _id: string,
        title: string,
        jobTitle: string,
        jobTitleInfo: {
            _id: string,
            title: string,
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Имэйл болон нууц үгээ оруулна уу"
            }); return
        }

        // const user = await User.findOne({ email })
        //     .populate('hobby')
        //     .populate('department')
        //     .populate('currentMentor');

        const userAggregate: User[] = await User.aggregate([
            { $match: { email: email } },
            {
                $lookup: {
                    from: "hobbies",
                    localField: "hobby",
                    foreignField: "_id",
                    as: "hobbyInfo"
                }
            },
            {
                $lookup: {
                    from: "departments",
                    localField: "department",
                    foreignField: "_id",
                    as: "departmentInfo",
                    pipeline: [
                        {
                            $lookup: {
                                from: "jobtitles",
                                localField: "jobTitle",
                                foreignField: "_id",
                                as: "jobTitleInfo"
                            }
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: "$departmentInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$departmentInfo.jobTitleInfo",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);
        const user = userAggregate[0]

        // console.log(user)
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Хэрэглэгч олдсонгүй"
            }); return
        }
        // console.log(user.password , "userpass")

        if (password !== user.password) {
            res.status(401).json({
                success: false,
                message: "Нууц үг буруу байна"
            });
            return
        }


        const token = jwt.sign(
            { userId: user._id, role: user.role ,email: user.email ,experience: user.experience , department: user.department , lastName : user.lastName , menteesCount: user.menteesCount , name: user.name, availableSchedules: user.availableSchedules},
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        // const userWithoutPassword = user;.toObject()
        const userWithoutPassword = user;
        delete userWithoutPassword.password;

        res.status(200).json({
            success: true,
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        // console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Серверийн алдаа гарлаа"
        });
    }
};