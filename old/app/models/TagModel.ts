import mongoose, { Schema } from "mongoose";

export interface ITag {
  _id?: string;
  name: string;
}

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    maxLength: 20,
  },
});

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default Tag;
