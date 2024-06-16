import mongoose from "mongoose";

export interface ITag {
  _id: string;
  name: string;
}

export interface IBook {
  title: string;
  author: string;
  page: number;
}

export interface IThread {
  _id: string;
  text: string;
  tags: mongoose.Schema.Types.ObjectId[];
  book: {
    title: string;
    author: string;
    page: number;
  };
  createdAt: string;
  creator: mongoose.Schema.Types.ObjectId;
}
