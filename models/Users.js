import mongoose from "mongoose";

const UsersSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false },
});

const userModel = mongoose.model("usuarios", UsersSchema);

export default userModel;