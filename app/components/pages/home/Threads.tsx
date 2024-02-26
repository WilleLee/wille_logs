"use client";

import { IThread } from "@models/ThreadModel";
import { useHome } from "./HomeContextProvider";
import ThreadsListView, { IThreadsListProps } from "./ThreadsListView";
import Box from "@components/boxes/Box";

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
        <Box>
          <p
            style={{
              textAlign: "center",
            }}
          >
            No thread has been created yet.
          </p>
        </Box>
      )}
    </>
  );
}
