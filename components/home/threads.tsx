import { getThreads } from "@libs/data";
import Thread from "./thread";
import { ReactNode } from "react";

export default async function Threads() {
  const { data, isSuccess } = await getThreads();

  if (!isSuccess || data === null) {
    return <p>error</p>;
  }

  if (data.length === 0) {
    return <p>스레드가 없습니다.</p>;
  }

  return (
    <Wrapper>
      {data.map((thread) => (
        <Thread key={thread._id} thread={thread} />
      ))}
    </Wrapper>
  );
}

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-[16px]">{children}</div>;
}
