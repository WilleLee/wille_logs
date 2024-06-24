"use client";

import { IThread } from "@libs/types";
import { useTagContext } from "./tag-provider";
import {
  AllHTMLAttributes,
  ReactNode,
  memo,
  useCallback,
  useMemo,
} from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import useInternalRouter from "@hooks/useInternalRouter";
import Text from "@components/text";

export default function Thread({ thread }: { thread: IThread }) {
  const { push } = useInternalRouter();
  const { selectedTagId } = useTagContext();
  const isSelected = useMemo(
    () => selectedTagId !== null && thread.tags.includes(selectedTagId),
    [selectedTagId, thread],
  );

  const handleRoute = useCallback(
    (id: string) => {
      push(`/threads/${id}`);
    },
    [push],
  );

  if (selectedTagId !== null && !isSelected) {
    return null;
  }

  return <ThreadView onRoute={handleRoute} thread={thread} />;
}

const ThreadView = memo(function ThreadView({
  onRoute,
  thread,
}: {
  thread: IThread;
  onRoute: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onRoute(thread._id)}
      aria-label={`스레드 상세 페이지로 이동, 스레드 아이디는 ${thread._id}`}
      className="grid w-full grid-cols-[1fr] gap-y-[8px] rounded-[10px] bg-grey-100 p-[16px] opacity-100 hover:opacity-85 active:opacity-70 dark:bg-grey-900"
    >
      <Text data-testid="thread_text" textWrap>
        {thread.text}
      </Text>
      <Text align="right" type="small">
        {dayjs(thread.createdAt).format("YYYY.MM.DD")}
      </Text>
    </button>
  );
});
