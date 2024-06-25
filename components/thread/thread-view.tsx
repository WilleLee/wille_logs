"use client";

import FormButton from "@components/form-button";
import Text from "@components/text";
import { deleteThreadById } from "@libs/actions";
import { ITag, IThread } from "@libs/types";
import dayjs from "dayjs";
import { memo } from "react";

const ThreadView = memo(function ThreadView({
  thread,
  isCreator,
  tags,
}: {
  thread: IThread;
  isCreator: boolean;
  tags: string[];
}) {
  return (
    <div className="mx-[24px] py-[16px]">
      {tags.length > 0 && (
        <div className="mb-[8px] flex items-center gap-[8px]">
          {tags.map((tag, i) => (
            <p
              className="inline-flex h-[28px] cursor-default select-none items-center rounded-[999px] bg-grey-200 px-[8px] dark:bg-grey-800"
              key={i}
            >
              <Text type="meta">{tag}</Text>
            </p>
          ))}
        </div>
      )}
      <div className="mb-[8px]">
        <Text type="medium">{thread.text}</Text>
      </div>
      <p className="flex items-center gap-[4px]">
        <Text type="meta">{thread.book.title}</Text>
        <Text type="meta">{thread.book.author}</Text>
        <Text type="meta">p.{thread.book.page}</Text>
        <Text type="meta">{dayjs(thread.createdAt).format("YYYY.MM.DD")}</Text>
      </p>
      {isCreator && (
        <form
          action={async () => {
            const ok = confirm("정말 삭제하시겠습니까?");
            if (!ok) return;
            await deleteThreadById(thread._id);
          }}
          className="flex justify-end"
        >
          <FormButton type="submit" fullWidth={false} isError>
            삭제
          </FormButton>
        </form>
      )}
    </div>
  );
});

export default ThreadView;
