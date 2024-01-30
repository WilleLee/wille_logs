"use client";

import React from "react";
import useThreads from "./useThreads";

type Props = {};

const Page = (props: Props) => {
  const { threads, status } = useThreads();
  console.log("threads", threads);
  return (
    <div>
      <h1>Threads</h1>
      <p>Status: {status}</p>
      {threads.length > 0 && (
        <ul>
          {threads.map((thread) => (
            <li key={thread._id}>{thread.book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
