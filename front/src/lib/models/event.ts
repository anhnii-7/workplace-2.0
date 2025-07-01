import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventType: {
        type: mongoose.Schema.Types.ObjectId,
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
        required: true,
        min: 1
    },
    participants: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "completed"],
        default: "active"
    }
}, { 
    timestamps: true 
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event; 