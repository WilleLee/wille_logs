"use client";

import { ITag } from "@libs/types";
import { useTagContext } from "./tag-provider";
import { ButtonHTMLAttributes, ReactNode, memo, useMemo } from "react";
import clsx from "clsx";

function Tag({ tag }: { tag: ITag }) {
  const { onSelect, selectedTagId } = useTagContext();
  const isSelected = useMemo(
    () => selectedTagId === tag._id,
    [selectedTagId, tag],
  );
  return (
    <TagView
      title={tag.name}
      isSelected={isSelected}
      data-testid="tag_name"
      onClick={() => onSelect(tag._id)}
    >
      {tag.name}
    </TagView>
  );
}

export default Tag;

export function ResetTag() {
  const { onReset } = useTagContext();
  return (
    <TagView title="모든 태그" onClick={() => onReset()}>
      ALL
    </TagView>
  );
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isSelected?: boolean;
}

const TagView = memo(function TagView(props: Props) {
  const { children, isSelected = false, ...rest } = props;
  return (
    <button
      className={clsx(
        "h-full w-auto min-w-[100px] max-w-[120px] overflow-hidden text-ellipsis rounded-[10px] px-[8px] text-grey-800 hover:bg-grey-400 active:bg-grey-500 dark:text-grey-400 dark:hover:bg-grey-800 dark:active:bg-grey-700",
        isSelected
          ? "bg-grey-400 dark:bg-grey-800"
          : "bg-grey-300 dark:bg-grey-900",
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
