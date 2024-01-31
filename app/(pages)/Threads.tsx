"use client";

import ThreadsList, { IThreadsListProps } from "./ThreadsList";
import useThreads from "./useThreads";

export default function Threads() {
  const { threads, status } = useThreads();
  const threadsListProps: IThreadsListProps = {
    threads,
  };
  return (
    <>
      {status === "success" ? (
        threads.length > 0 ? (
          <ThreadsList {...threadsListProps} />
        ) : (
          <p>no thread</p>
        )
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}
