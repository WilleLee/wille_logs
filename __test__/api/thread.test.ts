import { describe, expect, test } from "vitest";
import { POST as createThread, GET as getThreads } from "@api/threads/route";
import { GET, DELETE } from "@api/threads/[id]/route";
import { IThread } from "@libs/types";

describe("/api/threads/[id]", () => {
  test("Create, Get and Delete", async () => {
    // Create a thread
    const reqObj = {
      json: async () => ({
        text: "test thread to delete",
        tags: [],
        book: {
          title: "test book",
          author: "test author",
          page: 33,
        },
      }),
    } as any;

    const postRes = await createThread(reqObj);
    expect(postRes.status).toBe(201);
    const createdThread = (await postRes.json()) as IThread;
    expect(createdThread.text).toStrictEqual("test thread to delete");
    const createdId = createdThread._id;

    // Get the thread
    const getRes = await GET(
      {},
      {
        params: { id: createdId },
      },
    );
    expect(getRes.status).toBe(200);
    const thread = (await getRes.json()) as IThread;
    expect(thread._id).toStrictEqual(createdId);

    // Delete the thread
    const deleteRes = await DELETE(
      {},
      {
        params: { id: createdId },
      },
    );
    expect(deleteRes.status).toBe(200);

    const threadsRes = await getThreads();
    const threads = (await threadsRes.json()) as IThread[];
    const foundT = threads.find((t) => t._id === createdId);
    expect(foundT).not.toBeDefined();
  });

  test("GET: 404", async () => {
    const getRes = await GET(
      {},
      {
        params: { id: "60f4b3b3b3b3b3b3b3b3b3b3" },
      },
    );
    expect(getRes.status).toBe(404);
  });
});
