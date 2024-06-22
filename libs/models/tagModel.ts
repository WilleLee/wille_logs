import mongoose, { Schema } from "mongoose";

export interface TagSchema {
  name: string;
  threads: mongoose.Schema.Types.ObjectId[];
  usedCount: number;
}

const tagSchema = new Schema<TagSchema>({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    maxLength: 20,
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  usedCount: {
    type: Number,
    default: 1,
  },
});

const tagModel = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default tagModel;
