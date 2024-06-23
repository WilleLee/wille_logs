"use client";

import { ITag } from "@libs/types";
import { useTagContext } from "./tag-provider";
import { ButtonHTMLAttributes, ReactNode, memo } from "react";

const Tag = function Tag({ tag }: { tag: ITag }) {
  const { onSelect } = useTagContext();
  return (
    <TagView data-testid="tag_name" onClick={() => onSelect(tag._id)}>
      {tag.name}
    </TagView>
  );
};

export default Tag;

export function ResetTag() {
  const { onReset } = useTagContext();
  return <TagView onClick={() => onReset()}>ALL</TagView>;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const TagView = memo(function TagView({ children, ...rest }: Props) {
  return (
    <button
      className="h-full w-auto min-w-[100px] max-w-[120px] overflow-hidden text-ellipsis rounded-[10px] bg-grey-300 px-[8px] text-grey-800 hover:bg-grey-400 active:bg-grey-500 dark:bg-grey-900 dark:text-grey-400 dark:hover:bg-grey-800 dark:active:bg-grey-700"
      {...rest}
    >
      {children}
    </button>
  );
});
