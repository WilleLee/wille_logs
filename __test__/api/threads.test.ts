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
        tags: ["tag1", "tag2"],
        book: {
          title: "testbook",
          author: "testauthor",
          page: 1,
        },
        userId: "666c132b483ffff921c13029",
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
  test("POST: Bad Requests", async () => {
    const reqObjEmptyText = {
      json: async () => ({
        text: "",
        tags: [],
        book: {
          title: "test book (empty text)",
          author: "testauthor",
          page: 1,
        },
        userId: "666c132b483ffff921c13029",
      }),
    } as any;
    const resEmptyText = await POST(reqObjEmptyText);
    expect(resEmptyText.status).toBe(400);

    const reqObjEmptyBookTitle = {
      json: async () => ({
        text: "test with empty book title",
        tags: [],
        book: {
          title: "",
          author: "testauthor",
          page: 1,
        },
        userId: "666c132b483ffff921c13029",
      }),
    } as any;
    const resEmptyBookTitle = await POST(reqObjEmptyBookTitle);
    expect(resEmptyBookTitle.status).toBe(400);
  });
});
