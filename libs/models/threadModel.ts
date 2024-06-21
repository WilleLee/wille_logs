import { IBook } from "@libs/types";
import mongoose, { ObjectId, Schema } from "mongoose";

export interface ThreadSchema {
  text: string;
  tags: mongoose.Schema.Types.ObjectId[];
  book: IBook;
  createdAt: Date;
  creator: mongoose.Schema.Types.ObjectId;
}

const threadSchema = new Schema<ThreadSchema>({
  text: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Tag" }],
  book: {
    title: { type: String, required: true },
    author: { type: String, required: true },
    page: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const threadModel =
  mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default threadModel;
