import { POST } from "@api/route";
import { describe, expect, test } from "vitest";

describe("/api", () => {
  test("POST", async () => {
    const reqObj = {
      json: async () => {
        return {
          hello: "world",
        };
      },
    } as any;
    const response = await POST(reqObj);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.hello).toStrictEqual("world");
  });
  test("POST: 400", async () => {
    const reqObj = {
      json: async () => {
        return {
          hello: "invalid",
        };
      },
    } as any;
    const response = await POST(reqObj);
    expect(response.status).toBe(400);
  });
});
