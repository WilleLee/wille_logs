"use client";

import fetcher from "@/_libs/fetcher";
import { ITag } from "@/_models/TagModel";
import React from "react";
import useSWR from "swr";

type Status = "idle" | "loading" | "success" | "error";

export interface TagResponse {
  message: string;
  status: number;
  data: ITag[];
}

const useTags = () => {
  let status: Status = "idle";
  const { data, isLoading } = useSWR<TagResponse>("/api/tags", fetcher.get, {
    revalidateOnFocus: false,
  });

  if (isLoading) {
    status = "loading";
  } else if (data && data.status === 200) {
    status = "success";
  } else {
    status = "error";
  }

  return {
    tags: data?.data || [],
    status,
  };
};

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
