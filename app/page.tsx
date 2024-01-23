"use client";

import Image from "next/image";
import fetcher from "./_libs/fetcher";
import useSWR from "swr";
import avatar1200 from "@assets/avatar_1200.png";

export interface Pingpong {
  message: string;
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

export default function Home() {
  const { data, isLoading } = usePingpong();
  console.log(isLoading, data);
  if (isLoading)
    return (
      <main>
        <Image src={avatar1200} alt="avatar" />
      </main>
    );
  return <main>hello world</main>;
}
