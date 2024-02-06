"use client";

import { useHome } from "./HomeContextProvider";
import ThreadsListView, { IThreadsListProps } from "./ThreadsListView";
import useThreads from "@hooks/useThreads";

export default function Threads() {
  const { selectedTagId } = useHome();
  const { threads, status } = useThreads();
  const filteredThreads = !threads
    ? []
    : !selectedTagId
      ? threads
      : threads.filter((thread) => {
          console.log(thread._id);
          return thread.tags.some((tag) => tag._id === selectedTagId);
        });
  const threadsListProps: IThreadsListProps = {
    threads: filteredThreads,
  };
  return (
    <>
      {status === "success" ? (
        threads.length > 0 ? (
          <ThreadsListView {...threadsListProps} />
        ) : (
          <p>
            You haven&rsquo;t selected any tag OR there&rsquo;s no thread yet.
          </p>
        )
      ) : null}
      {status === "loading" && <p>loading&hellip;</p>}
    </>
  );
}
