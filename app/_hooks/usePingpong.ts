import fetcher from "@/_libs/fetcher";
import useSWR from "swr";

export interface Pingpong {
  message: string;
  status: number;
}

const usePingpong = () => {
  const { data, isLoading } = useSWR<Pingpong>(
    ["/api/ping", { message: "ping" }],
    ([url, opt]) => fetcher.post(url, opt),
  );

  return {
    data,
    isLoading,
  };
};

export default usePingpong;
