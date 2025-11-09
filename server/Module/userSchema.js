import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: { type: String },
    text: { type: String }
}, { timestamps: true })
const User = mongoose.model("acctodo", UserSchema)
export { User }