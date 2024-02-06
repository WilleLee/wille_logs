"use client";

import { IThread } from "@models/ThreadModel";
import React, { AllHTMLAttributes } from "react";
import styles from "./threadsListView.module.scss";
import TransparentButton from "@/components/buttons/TransparentButton";
import CopySvg from "@/components/svgs/CopySvg";

export interface IThreadsListProps
  extends React.AllHTMLAttributes<HTMLUListElement> {
  threads: IThread[];
}

const ThreadsListView = ({ threads, ...props }: IThreadsListProps) => {
  return (
    <ul className={styles.ul} {...props}>
      {threads.map((thread) => {
        return <ThreadsItemView key={thread._id} thread={thread} />;
      })}
    </ul>
  );
};

export default ThreadsListView;

interface ThreadsItemViewProps extends AllHTMLAttributes<HTMLLIElement> {
  thread: IThread;
}

const ThreadsItemView = React.memo(function ThreadsItemView({
  thread,
  ...props
}: ThreadsItemViewProps) {
  const today = new Date();
  const createdAt = new Date(thread.createdAt || "");
  const diffInHour = Math.floor(
    (today.getTime() - createdAt.getTime()) / 1000 / 60 / 60,
  );
  const diff =
    diffInHour === 0
      ? "방금 전"
      : diffInHour < 24
        ? `${diffInHour}시간 전`
        : `${Math.floor(diffInHour / 24)}일 전`;

  async function handleCopy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("✅ Copied!");
    } catch (error) {
      console.error("❌ Failed to copy!");
    }
  }

  return (
    <li className={styles.li} {...props}>
      <div>
        <h4>
          {thread.book.title} <span>(p.{thread.book.page})</span>
        </h4>
        <div>
          <p>{diff}</p>
          <TransparentButton
            aria-label="copy the text"
            onClick={() =>
              handleCopy(
                thread.text +
                  `(${thread.book.author}, ${thread.book.title}, p.${thread.book.page})`,
              )
            }
          >
            <CopySvg
              width="18"
              aria-hidden
              color="rgb(var(--icon-faded))"
              className={styles.copySvg}
            />
          </TransparentButton>
        </div>
      </div>
      <p dangerouslySetInnerHTML={{ __html: thread.text }} />
    </li>
  );
});
