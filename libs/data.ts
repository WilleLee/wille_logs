import { ITag, IThread } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

type FetchResult<T> = {
  data: T | null;
  isSuccess: boolean;
  error?: string;
};

export async function fetcher<T>(
  input: `/${string}`,
  init?: RequestInit,
): Promise<FetchResult<T>> {
  try {
    const response = await fetch(API_BASE_URL + input, init);
    const data = await response.json();
    if (!response.ok) {
      return {
        data: null,
        isSuccess: false,
        error: data.error || "정보를 불러오는데 실패했습니다.",
      };
    }
    return {
      data,
      isSuccess: true,
    };
  } catch (err) {
    return {
      data: null,
      isSuccess: false,
      error: "정보를 불러오는데 실패했습니다.",
    };
  }
}

export async function getTags() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const result = await fetcher<ITag[]>("/tags");
  return result;
}

export async function getThreads() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const result = await fetcher<IThread[]>("/threads");
  return result;
}

export async function getThreadById(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const result = await fetcher<IThread>(`/threads/${id}`);
  return result;
}
