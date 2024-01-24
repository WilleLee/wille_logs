import { IThread } from "@/_models/ThreadModel";

const threads: IThread[] = [];

export const getThreads = () => {
  return threads;
};

export const getThread = (id: string) => {
  return threads.find((thread) => thread._id === id);
};

export const addThread = ({ text, tags, book }: IThread) => {
  return true;
};

export const putThread = (id: string, thread: IThread) => {
  return true;
};

export const deleteThread = (id: string) => {
  return true;
};
