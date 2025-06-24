import { Request, Response } from "express";
import RequestModel from "../schema/request";
import User from "../schema/user";

export const getRequests = async (req: Request, res: Response) => {
    try {
        const { status, userId, type } = req.query;
        
        let query: any = {};
        
        if (status) {
            query.status = status;
        }
        
        if (userId) {
            if (type === 'received') {
                query.to = userId;
            } else if (type === 'sent') {
                query.from = userId;
            }
        }
        
        const requests = await RequestModel.find(query)
            .populate('from', 'name lastName email role')
            .populate('to', 'name lastName email role');
            
        res.status(200).json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createRequest = async (req: Request, res: Response) => {
    try {
        const { from, to, message } = req.body;
        
        
        const [fromUser, toUser] = await Promise.all([
            User.findById(from),
            User.findById(to)
        ]);
        
        if (!fromUser || !toUser) {
             res.status(404).json({ message: "User not found" });
             return
        }
        
        
        if (toUser.role !== 'mentor') {
             res.status(400).json({ message: "Can only send requests to mentors" });
             return
        }
        
       
        const existingRequest = await RequestModel.findOne({
            from,
            to,
            status: 'pending'
        });
        
        if (existingRequest) {
             res.status(400).json({ message: "Request already sent and pending" });
             return
        }
        
        const request = await RequestModel.create({
            from,
            to,
            message,
            status: 'pending'
        });
        
        res.status(201).json({ success: true, request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateRequest = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, mentorNotes, meetingDate, meetingLocation } = req.body;
        
        const request = await RequestModel.findById(id);
        
        if (!request) {
             res.status(404).json({ message: "Request not found" });
             return
        }
        
        if (status === 'accepted') {
            
            const activeMentees = await RequestModel.countDocuments({
                to: request.to,
                isActive: true
            });
            
            
            if (activeMentees >= 3) { 
                 res.status(400).json({ 
                    message: "Mentor has reached maximum number of active mentees" 
                });
                return
            }
            
         
            request.status = 'accepted';
            request.isActive = true;
            request.mentorNotes = mentorNotes;
            request.meetingDate = meetingDate;
            request.meetingLocation = meetingLocation;
            
            
            await Promise.all([
                User.findByIdAndUpdate(request.from, { 
                    currentMentor: request.to 
                }),
                User.findByIdAndUpdate(request.to, { 
                    $inc: { menteesCount: 1 },
                    $push: { pastMentors: request.from }
                })
            ]);
        } else if (status === 'declined') {
            request.status = 'declined';
            request.mentorNotes = mentorNotes || "No reason provided";
        }
        
        await request.save();
        
        res.status(200).json({ success: true, request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const endMentorship = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const request = await RequestModel.findById(id);
        
        if (!request) {
             res.status(404).json({ message: "Request not found" });
             return
        }
        
        if (!request.isActive) {
             res.status(400).json({ message: "Mentorship is not active" });
             return
        }
        
        request.isActive = false;
        await request.save();
        
       
        await User.findByIdAndUpdate(request.from, { 
            currentMentor: null,
            $push: { pastMentors: request.to }
        });
        
        res.status(200).json({ success: true, message: "Mentorship ended successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};