import mongoose from "mongoose";

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
    liked: [{ type: mongoose.Types.ObjectId, ref: "Prompts" }]
})

const Users = mongoose.models.Users || mongoose.model("Users", Schema)

export default Users;