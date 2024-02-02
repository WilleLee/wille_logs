import { ITag } from "@models/TagModel";
import React, { AllHTMLAttributes } from "react";

interface TagsListViewProps extends AllHTMLAttributes<HTMLUListElement> {
  tags: ITag[];
  handleClickTag: (tagId: string) => void;
}

export default function TagsListView({
  tags,
  handleClickTag,
  ...props
}: TagsListViewProps) {
  return (
    <ul {...props}>
      {tags.map((tag) => {
        return (
          <TagsItemView
            key={tag._id}
            tag={tag}
            handleClickTag={handleClickTag}
          />
        );
      })}
    </ul>
  );
}

interface TagsItemViewProps extends AllHTMLAttributes<HTMLLIElement> {
  tag: ITag;
  handleClickTag: (tagId: string) => void;
}

const TagsItemView = React.memo(function TagsItemView({
  tag,
  handleClickTag,
  ...props
}: TagsItemViewProps) {
  return (
    <li onClick={() => handleClickTag(tag._id as string)} {...props}>
      {tag.name}
    </li>
  );
});
