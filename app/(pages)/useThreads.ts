import fetcher from "@/_libs/fetcher";
import { IThread } from "@/_models/ThreadModel";
import useSWR from "swr";

type Status = "idle" | "loading" | "success" | "error";

export interface ThreadResponse {
  message: string;
  status: number;
  data: IThread[];
}

const useThreads = () => {
  let status: Status = "idle";
  const { data, isLoading } = useSWR<ThreadResponse>(
    "/api/threads",
    fetcher.get,
  );

  if (isLoading) {
    status = "loading";
  } else if (data && data.status === 200) {
    status = "success";
  } else {
    status = "error";
  }

  return {
    threads: data ? data.data : [],
    status,
  };
};

export default useThreads;
