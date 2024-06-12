import { describe, expect, test } from "vitest";
import { GET } from "@api/tags/route";

describe("/api/tags", () => {
  test("GET", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const tags = await res.json();
    expect(tags).toBeInstanceOf(Array);
  });
});
