    import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
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

const Request = mongoose.model("Request", requestSchema);
export default Request;