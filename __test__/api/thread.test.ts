import { describe, expect, test } from "vitest";
import { POST as createThread } from "@api/threads/route";
import { GET, DELETE } from "@api/threads/[id]/route";

describe("/api/threads/[id]", () => {
  test.todo("Create and Delete", async () => {
    // 생성
    /*
    const createRes = await createThread({
      json: async () => ({
        text: "test",
        book: {
          title: "testbook",
          author: "testauthor",
          page: 1,
        },
      }),
    });
    expect(createRes.status).toBe(201);
    const createdThread = await createRes.json();
    expect(createdThread.text).toBe("test");
    const id = createdThread._id;
    */
    // get
    /*
    const getRes = await GET(null, { params: { id } });
    expect(getRes.status).toBe(200);
    const thread = await getRes.json();
    expect(thread.text).toBe("test");

    // delete
    const deleteRes = await DELETE(null, { params: { id } });
    expect(deleteRes.status).toBe(200);
    */
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
