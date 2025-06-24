import mongoose from "mongoose";
const hobbySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

const Hobby = mongoose.model("Hobby", hobbySchema);
export default Hobby;