import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    email:{
          type: String,
        required: true
    },
    password:{
          type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["mentor", "new"],
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    hobby: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
     menteesCount: {
        type: Number,
        default: 0
    },
    currentMentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

const User = mongoose.model("User", userSchema);
export default User;