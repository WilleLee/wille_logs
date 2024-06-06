"use client";

import React, { useState } from "react";
import { ITag } from "@/models/TagModel";
import { homeActions, useHome, useHomeDispatch } from "./HomeContextProvider";
import TagsView from "./TagsView";

type Props = {
  tags: ITag[];
};

const Tags = ({ tags = [] }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const homeDispatch = useHomeDispatch();
  const { selectedTagId } = useHome();
  function handleClickTag(tagId: string) {
    if (homeDispatch) {
      homeDispatch(homeActions.setSelectedTagId(tagId));
    }
  }
  return (
    <>
      {tags.length > 0 ? (
        <TagsView>
          <TagsView.List isActive={tags.length <= 3 || showAll}>
            {tags.map((tag) => (
              <TagsView.Item
                key={tag._id}
                tag={tag}
                isSelected={tag._id === selectedTagId}
                handleClickTag={handleClickTag}
              />
            ))}
          </TagsView.List>
          <TagsView.ShowAllButton
            isHidden={tags.length <= 3}
            onClick={() => setShowAll((prev) => !prev)}
          />
        </TagsView>
      ) : null}
    </>
  );
};

export default Tags;
