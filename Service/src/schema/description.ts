import mongoose from "mongoose";
const descriptionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
    
})

const Description = mongoose.model("Description", descriptionSchema);
export default Description;