"use client";

import ThreadsListView, { IThreadsListProps } from "./ThreadsListView";
import useThreads from "@hooks/useThreads";

export default function Threads() {
  const { threads, status } = useThreads();
  const threadsListProps: IThreadsListProps = {
    threads,
  };
  return (
    <>
      {status === "success" ? (
        threads.length > 0 ? (
          <ThreadsListView {...threadsListProps} />
        ) : (
          <p>no thread</p>
        )
      ) : null}
      {status === "loading" && <p>loading&hellip;</p>}
    </>
  );
}
