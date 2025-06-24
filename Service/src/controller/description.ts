import { Request, Response } from "express"
import Description from "../schema/description"

export const getDescription = async (_req: Request, res: Response) => {
    try {
        const description = await Description.find();
        res.status(200).json({ success: true, description });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createDescription = async (req: Request, res: Response) => {
    try {
        const description = await Description.create(req.body);
        res.status(200).json({ success: true, description });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}