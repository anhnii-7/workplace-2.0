"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endMentorship = exports.updateRequest = exports.createRequest = exports.getRequests = void 0;
const request_1 = __importDefault(require("../schema/request"));
const user_1 = __importDefault(require("../schema/user"));
const getRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, userId, type } = req.query;
        let query = {};
        if (status) {
            query.status = status;
        }
        if (userId) {
            if (type === 'received') {
                query.to = userId;
            }
            else if (type === 'sent') {
                query.from = userId;
            }
        }
        const requests = yield request_1.default.find(query)
            .populate('from', 'name lastName email role')
            .populate('to', 'name lastName email role');
        res.status(200).json({ success: true, requests });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getRequests = getRequests;
const createRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, message } = req.body;
        const [fromUser, toUser] = yield Promise.all([
            user_1.default.findById(from),
            user_1.default.findById(to)
        ]);
        if (!fromUser || !toUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (toUser.role !== 'mentor') {
            res.status(400).json({ message: "Can only send requests to mentors" });
            return;
        }
        const existingRequest = yield request_1.default.findOne({
            from,
            to,
            status: 'pending'
        });
        if (existingRequest) {
            res.status(400).json({ message: "Request already sent and pending" });
            return;
        }
        const request = yield request_1.default.create({
            from,
            to,
            message,
            status: 'pending'
        });
        res.status(201).json({ success: true, request });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createRequest = createRequest;
const updateRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status, mentorNotes, meetingDate, meetingLocation } = req.body;
        const request = yield request_1.default.findById(id);
        if (!request) {
            res.status(404).json({ message: "Request not found" });
            return;
        }
        if (status === 'accepted') {
            const activeMentees = yield request_1.default.countDocuments({
                to: request.to,
                isActive: true
            });
            if (activeMentees >= 3) {
                res.status(400).json({
                    message: "Mentor has reached maximum number of active mentees"
                });
                return;
            }
            request.status = 'accepted';
            request.isActive = true;
            request.mentorNotes = mentorNotes;
            request.meetingDate = meetingDate;
            request.meetingLocation = meetingLocation;
            yield Promise.all([
                user_1.default.findByIdAndUpdate(request.from, {
                    currentMentor: request.to
                }),
                user_1.default.findByIdAndUpdate(request.to, {
                    $inc: { menteesCount: 1 },
                    $push: { pastMentors: request.from }
                })
            ]);
        }
        else if (status === 'declined') {
            request.status = 'declined';
            request.mentorNotes = mentorNotes || "No reason provided";
        }
        yield request.save();
        res.status(200).json({ success: true, request });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateRequest = updateRequest;
const endMentorship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const request = yield request_1.default.findById(id);
        if (!request) {
            res.status(404).json({ message: "Request not found" });
            return;
        }
        if (!request.isActive) {
            res.status(400).json({ message: "Mentorship is not active" });
            return;
        }
        request.isActive = false;
        yield request.save();
        yield user_1.default.findByIdAndUpdate(request.from, {
            currentMentor: null,
            $push: { pastMentors: request.to }
        });
        res.status(200).json({ success: true, message: "Mentorship ended successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.endMentorship = endMentorship;
//# sourceMappingURL=request.js.map