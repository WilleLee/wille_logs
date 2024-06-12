import { describe, expect, test } from "vitest";
import { GET, POST } from "@api/threads/route";
import { IThread } from "@libs/types";

describe("/api/threads", () => {
  test("GET", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const threads = await res.json();
    expect(threads).toBeInstanceOf(Array);
  });
  test("POST", async () => {
    const reqObj = {
      json: async () => ({
        text: "test",
        book: {
          title: "testbook",
          author: "testauthor",
          page: 1,
        },
      }),
    } as any;

    const res = await POST(reqObj);

    expect(res.status).toBe(201);
    const data = (await res.json()) as IThread;
    expect(data.text).toStrictEqual("test");

    const threads = (await (await GET()).json()) as IThread[];
    const thread = threads.find((t) => t._id === data._id);
    expect(thread).toBeDefined();
    expect(thread?._id).toStrictEqual(data._id);
  });
});
