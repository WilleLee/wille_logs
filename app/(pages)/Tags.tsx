"use client";

import useTags from "@hooks/useTags";
import React from "react";

interface Props {}

const Tags = (props: Props) => {
  const { tags, status } = useTags();
  return (
    <>
      {status === "success" && tags.length > 0 ? (
        <ul>
          {tags.map((tag) => {
            return <li key={tag._id}>{tag.name}</li>;
          })}
        </ul>
      ) : null}
    </>
  );
};

export default Tags;
