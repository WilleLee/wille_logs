import { IThread } from "@/_models/ThreadModel";
import React from "react";

export interface IThreadsListProps
  extends React.AllHTMLAttributes<HTMLUListElement> {
  threads: IThread[];
}

const ThreadsList = ({ threads, ...props }: IThreadsListProps) => {
  return (
    <ul {...props}>
      {threads.map((thread) => {
        return (
          <li key={thread._id}>
            <h3>{thread.book.title}</h3>
            <p>{thread.text}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default ThreadsList;
