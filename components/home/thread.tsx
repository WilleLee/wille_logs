"use client";

import { IThread } from "@libs/types";
import Link from "next/link";
import { useTagContext } from "./tag-provider";
import { AllHTMLAttributes, ReactNode, memo, useMemo } from "react";
import dayjs from "dayjs";
import clsx from "clsx";

export default function Thread({ thread }: { thread: IThread }) {
  const { selectedTagId } = useTagContext();
  const isSelected = useMemo(
    () => selectedTagId !== null && thread.tags.includes(selectedTagId),
    [selectedTagId, thread],
  );

  if (selectedTagId !== null && !isSelected) {
    return null;
  }

  return <ThreadView thread={thread} />;
}

const ThreadView = memo(function ThreadView({ thread }: { thread: IThread }) {
  return (
    <Link
      href={`/threads/${thread._id}`}
      aria-label={`스레드 상세 페이지로 이동, 스레드 아이디는 ${thread._id}`}
    >
      <button
        aria-hidden
        className="flex w-full flex-col gap-[8px] rounded-[10px] bg-grey-200 p-[16px] opacity-100 hover:opacity-85 active:opacity-70 dark:bg-grey-900"
      >
        <div className="inline-flex w-full items-center justify-start overflow-hidden text-ellipsis rounded-[5px] bg-grey-300 px-[12px] py-[8px] dark:bg-grey-800">
          <Text data-testid="thread_text" textWrap>
            {thread.text}
          </Text>
        </div>
        <div className="inline-flex w-full items-center justify-end">
          <Text type="small">
            {dayjs(thread.createdAt).format("YYYY.MM.DD")}
          </Text>
        </div>
      </button>
    </Link>
  );
});

interface TextProps extends AllHTMLAttributes<HTMLSpanElement> {
  type?: "small" | "medium" | "large";
  textWrap?: boolean;
  children: ReactNode;
}

function Text(props: TextProps) {
  const {
    children,
    className,
    textWrap = false,
    type = "medium",
    ...rest
  } = props;
  return (
    <span
      className={clsx(
        "inline-flex items-center",
        {
          "text-ellipsis text-nowrap": textWrap,
          "text-[10px] font-semibold": type === "small",
          "text-[15px] font-light": type === "medium",
          "text-[20px] font-normal": type === "large",
        },
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
