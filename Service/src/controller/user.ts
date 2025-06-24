import { Request, Response } from "express"
import User from "../schema/user"
import mongoose from "mongoose"

export const getUserWithInfo = async (_req: Request, res: Response) => {
    try {
        const userWithInfo = await User.aggregate([
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
        ])
        res.status(200).json({ success: true, userWithInfo })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUserByHobby = async (req: Request, res: Response) => {
    const { id } = req.query;
    console.log(id, "requery")
    try {
        const users = await User.aggregate([
            {
                $match: { hobby: new mongoose.Types.ObjectId(id as string) }
            },
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
                    as: "departmentInfo"
                }
            },
            {
                $unwind: {
                    path: "$hobbyInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$departmentInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
        ]);
        res.status(200).json({ success: true, users })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUser = async (_req: Request, res: Response) => {
    try {
        const user = await User.find();
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getNewUsers = async (_req: Request, res: Response) => {
    try {
        const newUsers = await User.find({ role: "new" });
        res.status(200).json(newUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getMentors = async (_req: Request, res: Response) => {
    try {
        const mentors = await User.find({ role: "mentor" });
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 