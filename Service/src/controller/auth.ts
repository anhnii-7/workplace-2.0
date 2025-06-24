import { Request, Response } from "express";
import User from "../schema/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email , password)
        if (!email || !password) {
             res.status(400).json({ 
                success: false,
                message: "Имэйл болон нууц үгээ оруулна уу" 
            });return
        }

     
        const user = await User.findOne({ email })
            .populate('hobby')
            .populate('department')
            .populate('currentMentor');
        console.log(user)
        if (!user) {
             res.status(404).json({ 
                success: false,
                message: "Хэрэглэгч олдсонгүй" 
            });return
        }
        console.log(user.password , "userpass")
        
      if (password !== user.password) {
             res.status(401).json({ 
                success: false,
                message: "Нууц үг буруу байна" 
            });
            return
        }

       
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

      
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({
            success: true,
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            success: false,
            message: "Серверийн алдаа гарлаа" 
        });
    }
};