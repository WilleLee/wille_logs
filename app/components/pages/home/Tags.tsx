"use client";

import useTags from "@hooks/useTags";
import React from "react";
import { homeActions, useHomeDispatch } from "./HomeContextProvider";

import TagsList from "./TagsList";

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
