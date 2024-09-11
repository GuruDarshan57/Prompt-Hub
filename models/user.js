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
    favourites: [{ type: mongoose.Types.ObjectId, ref: "Prompt" }]
})

const Users = mongoose.models.User || mongoose.model("User", Schema)

export default Users;