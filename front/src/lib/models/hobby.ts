
import mongoose from "mongoose";
const hobbySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    users : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: false
    }
})

const Hobby = mongoose.models.Hobby || mongoose.model("Hobby", hobbySchema);
export default Hobby; 