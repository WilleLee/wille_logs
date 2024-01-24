import mongoose, { Schema } from "mongoose";

const threadSchema = new Schema({
  text: { type: String, required: true },
  tags: { type: [String], required: true },
  book: {
    title: { type: String, required: true },
    author: { type: String, required: true },
    page: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
