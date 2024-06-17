import { describe, expect, test } from "vitest";
import { POST } from "@api/users/signup/route";

describe("/api/users", () => {
  test("POST: no password", async () => {
    const reqObj = {
      json: async () => {
        return {
          email: "aaa@bbb.com",
          password: "",
          nickname: "wille",
          secret: "dd",
        };
      },
    } as any;
    const res = await POST(reqObj);
    expect(res.status).toStrictEqual(401);
  });
  test("POST: unauthorized secret", async () => {
    const reqObj = {
      json: async () => {
        return {
          email: "aaa@bbb.com",
          password: "bbddhhhww2",
          nickname: "wille",
          secret: "dd",
        };
      },
    } as any;
    const res = await POST(reqObj);
    expect(res.status).toStrictEqual(401);
  });
  test("POST: invalid email format", async () => {
    const s = process.env.SIGNUP_SECRET;
    const reqObj = {
      json: async () => {
        return {
          email: "aa",
          password: "bb",
          nickname: "cc",
          secret: s,
        };
      },
    } as any;
    const res = await POST(reqObj);
    expect(res.status).toStrictEqual(401);
  });
  test("POST", async () => {
    const s = process.env.SIGNUP_SECRET;
    const emailToTest = `aaa${Date.now()}${Math.floor(
      Math.random() * 1000,
    )}@aaa.com`;
    const reqObj = {
      json: async () => {
        return {
          email: emailToTest,
          password: "bbb",
          nickname: "ccc",
          secret: s,
        };
      },
    } as any;
    const res = await POST(reqObj);
    expect(res.status).toStrictEqual(201);
    const createdUser = await res.json();
    expect(createdUser.email).toStrictEqual(emailToTest);
    const res2 = await POST(reqObj);
    expect(res2.status).toStrictEqual(403);
  });
});
