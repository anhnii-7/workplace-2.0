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
exports.getMentors = exports.getNewUsers = exports.createUser = exports.getUser = exports.getUserByHobby = exports.getUserWithInfo = void 0;
const user_1 = __importDefault(require("../schema/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const getUserWithInfo = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userWithInfo = yield user_1.default.aggregate([
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
        res.status(200).json({ success: true, userWithInfo });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserWithInfo = getUserWithInfo;
const getUserByHobby = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    console.log(id, "requery");
    try {
        const users = yield user_1.default.aggregate([
            {
                $match: { hobby: new mongoose_1.default.Types.ObjectId(id) }
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
        res.status(200).json({ success: true, users });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUserByHobby = getUserByHobby;
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.find();
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.create(req.body);
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createUser = createUser;
const getNewUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUsers = yield user_1.default.find({ role: "new" });
        res.status(200).json(newUsers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getNewUsers = getNewUsers;
const getMentors = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mentors = yield user_1.default.find({ role: "mentor" });
        res.status(200).json(mentors);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMentors = getMentors;
//# sourceMappingURL=user.js.map