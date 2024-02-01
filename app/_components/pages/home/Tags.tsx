"use client";

import LoadingFullpage from "@/_components/loading/LoadingFullpage";
import useTags from "@hooks/useTags";
import React, { AllHTMLAttributes } from "react";
import { homeActions, useHomeDispatch } from "./HomeContextProvider";
import { ITag } from "@/_models/TagModel";

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
          <TagsListView tags={tags} handleClickTag={handleClickTag} />
        ) : (
          <p>no tag</p>
        )
      ) : null}
      {status === "loading" && (
        <LoadingFullpage alt="threads' tags are being loaded..." />
      )}
    </>
  );
};

export default Tags;

interface TagsListViewProps extends AllHTMLAttributes<HTMLUListElement> {
  tags: ITag[];
  handleClickTag: (tagId: string) => void;
}

function TagsListView({ tags, handleClickTag, ...props }: TagsListViewProps) {
  return (
    <ul {...props}>
      {tags.map((tag) => {
        return (
          <li key={tag._id} onClick={() => handleClickTag(tag._id as string)}>
            {tag.name}
          </li>
        );
      })}
    </ul>
  );
}
