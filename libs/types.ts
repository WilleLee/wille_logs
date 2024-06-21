import mongoose from "mongoose";

export interface ITag {
  _id: string;
  name: string;
  usedCount: number;
  threads: string[];
}

export interface IBook {
  title: string;
  author: string;
  page: number;
}

export interface IThread {
  _id: string;
  text: string;
  tags: string[];
  book: {
    title: string;
    author: string;
    page: number;
  };
  createdAt: string;
  creator: string;
}
