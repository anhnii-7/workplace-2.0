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
exports.createDepartment = exports.getDepartment = exports.getDepartmentWithJobTitle = void 0;
const department_1 = __importDefault(require("../schema/department"));
const getDepartmentWithJobTitle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield department_1.default.aggregate([
            {
                $lookup: {
                    from: "jobtitles",
                    localField: "jobTitle",
                    foreignField: "_id",
                    as: "jobTitleInfo"
                }
            },
            {
                $unwind: {
                    path: "$jobTitleInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
        ]);
        res.status(500).json({ success: true, department });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getDepartmentWithJobTitle = getDepartmentWithJobTitle;
const getDepartment = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield department_1.default.find();
        res.status(200).json({ success: true, department });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getDepartment = getDepartment;
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const department = yield department_1.default.create(req.body);
        res.status(200).json({ success: true, department });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createDepartment = createDepartment;
//# sourceMappingURL=department.js.map