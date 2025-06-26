
import mongoose from "mongoose";
const jobTitleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
})

const JobTitle = mongoose.models.JobTitle || mongoose.model("JobTitle", jobTitleSchema);
export default JobTitle; 