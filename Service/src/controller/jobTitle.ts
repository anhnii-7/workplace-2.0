import { Request, Response } from "express"
import JobTitle from "../schema/jobTitle"

export const getJobTitle = async (_req: Request, res: Response) => {
    try {
        const jobTitle = await JobTitle.find();
        res.status(200).json({ success: true, jobTitle })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createJobTitle = async (req: Request, res: Response) => {
    try {
        const jobTitle = await JobTitle.create(req.body);
        res.status(200).json({ success: true, jobTitle });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}