import Hobby from "../schema/hobby";
import { Request, Response } from "express";

export const createHobby = async (req, res) => {
    try {
        const hobby = await Hobby.create(req.body);
        res.status(201).json({ success: true, hobby });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({ success: false, message: "Hobby already exists" });
        } else {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
}

export const getHobby = async (_req: Request, res: Response) => {
    const hobby = await Hobby.find();
    res.status(200).json(hobby);
}

export const updateHobby = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    const hobby = await Hobby.findByIdAndUpdate(id, { title }, { new: true });
    res.status(200).json(hobby);
}