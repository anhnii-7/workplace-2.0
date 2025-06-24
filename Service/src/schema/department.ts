import mongoose from "mongoose";
const departmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    jobTitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobTitle",
        required: true
    }
})

const Department = mongoose.model("Department", departmentSchema);
export default Department;