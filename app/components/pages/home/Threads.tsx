"use client";

import { IThread } from "@models/ThreadModel";
import { useHome } from "./HomeContextProvider";
import ThreadsListView, { IThreadsListProps } from "./ThreadsListView";

type Props = {
  threads: IThread[];
};

export default function Threads({ threads = [] }: Props) {
  const { selectedTagId } = useHome();
  const filteredThreads = !threads
    ? []
    : !selectedTagId
      ? threads
      : threads.filter((thread) => {
          return thread.tags.some((tag) => tag._id === selectedTagId);
        });
  const threadsListProps: IThreadsListProps = {
    threads: filteredThreads,
  };
  return (
    <>
      {threads.length > 0 ? (
        <ThreadsListView {...threadsListProps} />
      ) : (
        <p>No threads found.</p>
      )}
    </>
  );
}
