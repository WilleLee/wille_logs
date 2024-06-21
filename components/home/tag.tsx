"use client";

import { ITag } from "@libs/types";
import { useTagContext } from "./tag-provider";

export default function Tag({ tag }: { tag: ITag }) {
  const { onSelect, selectedTagId } = useTagContext();
  console.log("selectedTagid", selectedTagId);
  return (
    <div>
      <button data-testid="tag_name" onClick={() => onSelect(tag._id)}>
        {tag.name}
      </button>
    </div>
  );
}
