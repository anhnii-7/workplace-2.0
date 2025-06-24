"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestSchema = new mongoose_1.default.Schema({
    from: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending"
    },
    meetingDate: {
        type: Date
    },
    meetingLocation: {
        type: String
    },
    mentorNotes: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const Request = mongoose_1.default.model("Request", requestSchema);
exports.default = Request;
//# sourceMappingURL=request.js.map