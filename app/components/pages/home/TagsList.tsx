"use client";

import OutlinedButton from "@components/buttons/OutlinedButton";
import { ITag } from "@models/TagModel";
import React, { AllHTMLAttributes } from "react";
import TagsListWrapper, {
  TagsItemView,
  TagsListView,
  TagsShowAllButton,
} from "./TagsListView";

interface TagsListProps extends AllHTMLAttributes<HTMLUListElement> {
  tags: ITag[];
  handleClickTag: (tagId: string) => void;
}

const TagsList = React.memo(function TagsList({
  tags,
  handleClickTag,
  ...props
}: TagsListProps) {
  return (
    <TagsListWrapper>
      <TagsListView listLength={tags.length} {...props}>
        {tags.map((tag) => {
          return (
            <TagsItemView
              key={tag._id}
              handleClickTag={() => handleClickTag(tag._id as string)}
              tag={tag}
            >
              <OutlinedButton>{tag.name}</OutlinedButton>
            </TagsItemView>
          );
        })}
      </TagsListView>
      <TagsShowAllButton listLength={tags.length} />
    </TagsListWrapper>
  );
});

export default TagsList;
