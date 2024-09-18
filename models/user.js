import mongoose from "mongoose";

//Schema for User
const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    image: {
        type: String
    },
    liked: [{ type: mongoose.Types.ObjectId, ref: "Prompts" }],
    saved: [{ type: mongoose.Types.ObjectId, ref: "Prompts" }]
})

const Users = mongoose.models.User || mongoose.model("User", Schema)

export default Users;