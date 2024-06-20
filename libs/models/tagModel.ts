import mongoose, { Schema } from "mongoose";

interface TagSchema {
  name: string;
}

const tagSchema = new Schema<TagSchema>({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    maxLength: 20,
  },
});

const tagModel = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default tagModel;
