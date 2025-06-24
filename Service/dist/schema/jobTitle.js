"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jobTitleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    }
});
const JobTitle = mongoose_1.default.model("JobTitle", jobTitleSchema);
exports.default = JobTitle;
//# sourceMappingURL=jobTitle.js.map