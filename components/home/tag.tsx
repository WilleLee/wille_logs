"use client";

import { ITag } from "@libs/types";
import { useTagContext } from "./tag-provider";
import { memo } from "react";

const Tag = memo(function Tag({ tag }: { tag: ITag }) {
  const { onSelect } = useTagContext();
  return (
    <div>
      <button data-testid="tag_name" onClick={() => onSelect(tag._id)}>
        {tag.name}
      </button>
    </div>
  );
});

export default Tag;

export const ResetTag = memo(function ResetTag() {
  const { onReset } = useTagContext();
  return (
    <div>
      <button onClick={() => onReset()}>ALL</button>
    </div>
  );
});
