"use client";

import { IThread } from "@libs/types";
import Link from "next/link";
import { useTagContext } from "./tag-provider";
import { memo, useMemo } from "react";

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
    <div>
      <Link href={`/threads/${thread._id}`}>
        <h2 data-testid="thread_text">{thread.text}</h2>
      </Link>
    </div>
  );
});
