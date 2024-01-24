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
  return <main>hi</main>;
  /*
  const { data, isLoading } = usePingpong();
  console.log(isLoading, data);
  if (isLoading)
    return (
      <main>
        <Image src={avatar128} alt="avatar" priority />
      </main>
    );
  return (
    <main>
      <p>hi</p>
      <p>bye</p>
      <p>
        {!!data && data.status === 200
          ? data.message
          : "failed to ping pong 🙄"}
      </p>
    </main>
  );
  */
}
