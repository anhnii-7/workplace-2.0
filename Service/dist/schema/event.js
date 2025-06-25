"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    eventType: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Hobby',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    maxParticipants: {
        type: Number,
        required: true
    },
    participants: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('Event', eventSchema);
//# sourceMappingURL=event.js.map