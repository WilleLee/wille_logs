import { describe, expect, test } from "vitest";

import { GET } from "@/api/route";

describe("/api", () => {
  test.todo("GET", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ hello: "world" });
  });
});
