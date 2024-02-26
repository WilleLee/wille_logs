import fetcher from "@libs/fetcher";
import { ITag } from "@models/TagModel";
import useSWR from "swr";

type Status = "idle" | "loading" | "success" | "error";

export const tagsApiUrl = "/api/tags";

export interface TagResponse {
  message: string;
  status: number;
  data: ITag[];
}

export default function useTags() {
  let status: Status = "idle";
  const { data, isLoading } = useSWR<TagResponse>(tagsApiUrl, fetcher.get);

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
}
