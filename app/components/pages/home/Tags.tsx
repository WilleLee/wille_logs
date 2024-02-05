"use client";

import useTags from "@hooks/useTags";
import React, { AllHTMLAttributes } from "react";
import { homeActions, useHomeDispatch } from "./HomeContextProvider";
import { ITag } from "@models/TagModel";
import OutlinedButton from "@/components/buttons/OutlinedButton";

const Tags = () => {
  const { tags, status } = useTags();
  const homeDispatch = useHomeDispatch();
  function handleClickTag(tagId: string) {
    if (homeDispatch) {
      homeDispatch(homeActions.setSelectedTagId(tagId));
    }
  }
  return (
    <>
      {status == "success" ? (
        tags.length > 0 ? (
          <TagsList tags={tags} handleClickTag={handleClickTag} />
        ) : (
          <p>no tag</p>
        )
      ) : null}
      {status === "loading" && <p>loading&hellip;</p>}
    </>
  );
};

export default Tags;

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
    <TagsListView {...props}>
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
  );
});

interface TagsListViewProps extends AllHTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

function TagsListView({ children, ...props }: TagsListViewProps) {
  return <ul {...props}>{children}</ul>;
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
      <OutlinedButton>{tag.name}</OutlinedButton>
    </li>
  );
});
