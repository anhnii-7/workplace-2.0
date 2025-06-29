import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: [
            "unread", "read", "accepted", "declined"
        ],
        default: "unread"
    },
    type: {
        type: String,
        required: true,
        enum: ['Request', 'Event'] // reference model нэрс
    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "type" // энэ нь type талбараас model нэр авна
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notification = mongoose.models.Notification || mongoose.model(
    "Notification",
    notificationSchema
);
export default Notification;