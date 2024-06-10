import { IBook } from "@libs/types";
import mongoose, { Schema } from "mongoose";

interface ThreadSchema {
  text: string;
  tags: string[];
  book: IBook;
  createdAt: Date;
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
});

const threadModel =
  mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default threadModel;
