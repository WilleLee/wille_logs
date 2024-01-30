import mongoose, { Schema } from "mongoose";

export interface IThread {
  _id?: string;
  text: string;
  tags: [{ _id: string; name: string }];
  book: {
    title: string;
    author: string;
    page: number;
  };
  createdAt?: Date;
}

const threadSchema = new Schema({
  text: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Tag" }],
  book: {
    title: { type: String, required: true },
    author: { type: String, required: true },
    page: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
