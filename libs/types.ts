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
  tags: ITag[];
  book: {
    title: string;
    author: string;
    page: number;
  };
  createdAt: string;
}
