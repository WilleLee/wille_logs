import mongoose, { Schema } from "mongoose";

interface UserSchema {
  email: string;
  password: string;
  nickname: string;
  createdAt: Date;
  threads: mongoose.Schema.Types.ObjectId[];
}

const userSchema = new Schema<UserSchema>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
