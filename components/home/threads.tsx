import { getThreads } from "@libs/data";
import Thread from "./thread";
import { ReactNode } from "react";
import Text from "@components/text";

export default async function Threads() {
  const { data, isSuccess, error } = await getThreads();

  if (!isSuccess || data === null) {
    return (
      <div className="flex w-full items-center justify-center px-[24px] py-[16px]">
        <Text>{error || "스레드를 불러오는 중 오류가 발생했습니다."}</Text>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex w-full items-center justify-center px-[24px] py-[16px]">
        <Text>아직 저장된 스레드가 없습니다.</Text>
      </div>
    );
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
