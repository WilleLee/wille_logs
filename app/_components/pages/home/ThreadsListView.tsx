import { IThread } from "@/_models/ThreadModel";
import React, { AllHTMLAttributes } from "react";

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
  return (
    <li {...props}>
      <h3>{thread.book.title}</h3>
      <p>{thread.text}</p>
    </li>
  );
});
