"use client";

import ThreadsList, { IThreadsListProps } from "./ThreadsList";
import useThreads from "@hooks/useThreads";
import LoadingFullpage from "@/_components/loading/LoadingFullpage";

export default function Threads() {
  const { threads, status } = useThreads();
  const threadsListProps: IThreadsListProps = {
    threads,
  };
  console.log("status", status);
  return (
    <>
      {status === "success" ? (
        threads.length > 0 ? (
          <ThreadsList {...threadsListProps} />
        ) : (
          <p>no thread</p>
        )
      ) : null}
      {status === "loading" && <LoadingFullpage />}
      {status === "error" && <p>error</p>}
    </>
  );
}
