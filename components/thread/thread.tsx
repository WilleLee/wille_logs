import { getThreadById } from "@libs/data";
import { cookies } from "next/headers";
import ThreadView from "./thread-view";
import Text from "@components/text";

export default async function Thread({ id }: { id: string }) {
  const { data: thread, isSuccess, error } = await getThreadById(id);

  let isCreator = false;
  const loggedinId = cookies().get("loggedin-id")?.value;

  if (!isSuccess || !thread) {
    return (
      <div className="flex w-full items-center justify-center px-[24px] py-[16px]">
        <Text>{error || "스레드를 불러오는 중 오류가 발생했습니다."}</Text>
      </div>
    );
  }

  if (loggedinId && thread.creator === loggedinId) {
    isCreator = true;
  }

  return <ThreadView thread={thread} isCreator={isCreator} />;
}
