import { describe, expect, test } from "vitest";
import { GET, POST } from "@api/threads/route";
import { NextRequest } from "next/server";

describe("/api/threads", () => {
  test("GET", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
  });
  test.todo("POST", async () => {
    /*
    const res = await POST({
      json: async () => ({
        text: "test",
        book: {
          title: "testbook",
          author: "testauthor",
          page: 1,
        },
      }),
    });

    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.text).toBe("test");
    */
  });
});
