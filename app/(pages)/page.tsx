"use client";

import Image from "next/image";
import fetcher from "@libs/fetcher";
import useSWR from "swr";
import avatar128 from "@assets/avatar_128.png";

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

export default function Home() {
  const { data, isLoading } = usePingpong();
  console.log(isLoading, data);
  if (isLoading)
    return (
      <main className="w-screen h-screen flex items-center justify-center">
        <Image src={avatar128} alt="avatar" priority />
      </main>
    );
  return (
    <main className="w-screen h-full flex flex-col">
      <p>hi</p>
      <p>bye</p>
      <p>
        {!!data && data.status === 200
          ? data.message
          : "failed to ping pong 🙄"}
      </p>
    </main>
  );
}
