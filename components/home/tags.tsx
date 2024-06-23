import { getTags } from "@libs/data";
import Tag, { ResetTag } from "./tag";
import { ReactNode } from "react";

export default async function Tags() {
  const { data, isSuccess } = await getTags();

  if (!isSuccess || data === null) {
    return null;
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      <ResetTag />
      {data
        .sort((a, b) => b.threads.length - a.threads.length)
        .map((tag) => (
          <Tag key={tag._id} tag={tag} />
        ))}
    </Wrapper>
  );
}

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="py-[8px]">
      <div className="scrollbar-disabled flex h-[32px] w-full items-center gap-[4px] overflow-x-scroll">
        {children}
      </div>
    </div>
  );
};
