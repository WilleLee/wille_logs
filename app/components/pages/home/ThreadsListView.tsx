"use client";

import { IThread } from "@models/ThreadModel";
import React, { AllHTMLAttributes } from "react";
import styles from "./threadsListView.module.scss";
export interface IThreadsListProps
  extends React.AllHTMLAttributes<HTMLUListElement> {
  threads: IThread[];
}

const ThreadsListView = ({ threads, ...props }: IThreadsListProps) => {
  return (
    <ul {...props}>
      {threads.map((thread) => {
        return <ThreadsItemView key={thread._id} thread={thread} />;
      })}
    </ul>
  );
};

export default ThreadsListView;

interface ThreadsItemViewProps extends AllHTMLAttributes<HTMLLIElement> {
  thread: IThread;
}

const ThreadsItemView = React.memo(function ThreadsItemView({
  thread,
  ...props
}: ThreadsItemViewProps) {
  const today = new Date();
  const createdAt = new Date(thread.createdAt || "");
  const diffInHour = Math.floor(
    (today.getTime() - createdAt.getTime()) / 1000 / 60 / 60,
  );
  const diff =
    diffInHour === 0
      ? "방금 전"
      : diffInHour < 24
        ? `${diffInHour}시간 전`
        : `${Math.floor(diffInHour / 24)}일 전`;
  return (
    <li {...props}>
      <div>
        <div>
          <h3>Wille</h3>
          <p>{diff}</p>
        </div>
        <p dangerouslySetInnerHTML={{ __html: thread.text }} />
        <div>
          <p>{thread.book.title}</p>
          <p>{thread.book.author}</p>
          <p>{thread.book.page}</p>
        </div>
      </div>
    </li>
  );
});
