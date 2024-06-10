import { IThread } from "@libs/types";

export const mockThreads: IThread[] = [
  {
    _id: "1",
    text: "mock thread",
    tags: [
      {
        _id: "1",
        name: "mock tag",
      },
    ],
    book: {
      title: "mock book",
      author: "mock author",
      page: 1,
    },
    createdAt: "2022.22.22",
  },
  {
    _id: "2",
    text: "mock thread",
    tags: [
      {
        _id: "2",
        name: "mock tag",
      },
    ],
    book: {
      title: "mock book",
      author: "mock author",
      page: 1,
    },
    createdAt: "2022.22.22",
  },
];
