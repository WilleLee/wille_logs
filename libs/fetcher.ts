type ApiPath = `/api/${string}`;

export async function fetcher<T>(input: ApiPath, init?: RequestInit) {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    return data as T;
  } catch (err) {
    console.log(err);
    throw new Error("서버와의 통신에서 문제가 발생했습니다.");
  }
}
