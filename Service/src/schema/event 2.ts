import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    eventType:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Hobby',
        required : true
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
})
export default mongoose.model('Event', eventSchema);