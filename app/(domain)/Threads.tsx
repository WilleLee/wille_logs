"use client";

import { fetcher } from "@libs/fetcher";
import { IThread } from "@libs/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Status = "idle" | "loading" | "success" | "error";

interface IThreadsContext {
  threads: IThread[];
}

const ThreadsContext = createContext<IThreadsContext | null>(null);

export default function Threads() {
  return (
    <>
      <Controller>
        <ThreadsView />
      </Controller>
    </>
  );
}

function Controller({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [threads, setThreads] = useState<IThread[]>([]);

  useEffect(() => {
    let isValidCall = true;
    (async function () {
      setStatus("loading");
      try {
        const data = await fetcher<IThread[]>("/api/threads");
        if (!isValidCall) return;
        setThreads(data);
        setStatus("success");
      } catch (err) {
        console.log(err);
        setStatus("error");
      }
    })();

    return () => {
      isValidCall = false;
    };
  }, []);

  if (status === "loading" || status === "idle") return <div>loading...</div>;

  if (status === "error") return <div>error...</div>;

  return (
    <ThreadsContext.Provider
      value={{
        threads,
      }}
    >
      {children}
    </ThreadsContext.Provider>
  );
}

function ThreadsView() {
  const threadsContext = useContext(ThreadsContext);

  if (!threadsContext) return null;

  const { threads } = threadsContext;

  return (
    <div>
      {threads.map((t) => (
        <div key={t._id}>
          <h2>{t.text}</h2>
          <p>{t.createdAt}</p>
        </div>
      ))}
    </div>
  );
}
