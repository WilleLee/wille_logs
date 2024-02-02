import fetcher from "@libs/fetcher";
import useSWR from "swr";

type Status = "idle" | "loading" | "success" | "error";

export interface Pingpong {
  message: string;
  status: number;
}

const usePingpong = () => {
  let status: Status = "idle";
  const { data, isLoading } = useSWR<Pingpong>(
    ["/api/ping", { message: "ping" }],
    ([url, opt]) => fetcher.post(url, opt),
  );

  if (isLoading) {
    status = "loading";
  } else if (data && data.status === 200) {
    status = "success";
  } else {
    status = "error";
  }

  return {
    data,
    status,
  };
};

export default usePingpong;
