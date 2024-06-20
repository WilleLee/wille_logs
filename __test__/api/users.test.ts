import { GET, POST as SIGNUP, PATCH, DELETE } from "@api/users/route";
import { POST as LOGIN } from "@api/users/login/route";
import { afterEach, describe, expect, test, vi } from "vitest";

const mockGetCookie = vi.fn();

vi.mock("next/headers", () => ({
  cookies: () => ({
    get: mockGetCookie,
  }),
}));

describe("/api/users", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
  test("FLOW: OK", async () => {
    // 회원가입 (SIGNUP)
    const signupSecret = process.env.SIGNUP_SECRET as string;
    const testEmail = Date.now().toString().slice(-5) + "@test.com";
    const testPassword = "123456";
    const testNickname = "tester0";
    let testAccessToken = "";
    try {
      console.log("🔥 SIGNUP: START");

      const reqObj = {
        async json() {
          return {
            email: testEmail,
            password: testPassword,
            passwordConfirm: testPassword,
            nickname: testNickname,
            secret: signupSecret,
          };
        },
      } as any;

      const res = await SIGNUP(reqObj);
      expect(res.status).toStrictEqual(201);

      console.log("✅ SIGNUP: DONE");
    } catch (err) {
      console.error(err);
      throw Error("❗️ SIGNUP: FAILED");
    }

    // 로그인 (LOGIN)
    try {
      console.log("🔥 LOGIN: START");

      const reqObj = {
        async json() {
          return {
            email: testEmail,
            password: testPassword,
          };
        },
      } as any;

      const res = await LOGIN(reqObj);
      expect(res.status).toStrictEqual(200);
      const { accessToken } = (await res.json()) as {
        nickname: string;
        accessToken: string;
      };
      testAccessToken = accessToken;

      console.log("✅ LOGIN: DONE");
    } catch (err) {
      console.error(err);
      throw Error("❗️ LOGIN: FAILED");
    }

    mockGetCookie.mockReturnValue({
      value: testAccessToken,
    });

    // 회원정보조회 (GET)
    try {
      console.log("🔥 GET: START");

      const res = await GET();
      expect(res.status).toStrictEqual(200);
      const { email, nickname } = (await res.json()) as {
        email: string;
        nickname: string;
      };
      expect(email).toStrictEqual(testEmail);
      expect(nickname).toStrictEqual(testNickname);

      console.log("✅ GET: DONE");
    } catch (err) {
      console.error(err);
      throw Error("❗️ GET: FAILED");
    }

    // 회원정보수정 (PATCH)
    try {
      console.log("🔥 PATCH: START");

      const reqObj = {
        async json() {
          return {
            nickname: "tester1",
          };
        },
      } as any;

      const res = await PATCH(reqObj);
      expect(res.status).toStrictEqual(200);

      const getRes = await GET();
      expect(getRes.status).toStrictEqual(200);
      const { nickname } = (await getRes.json()) as {
        email: string;
        nickname: string;
      };
      expect(nickname).toStrictEqual("tester1");

      console.log("✅ PATCH: DONE");
    } catch (err) {
      console.error(err);
      throw Error("❗️ PATCH: FAILED");
    }

    // 회원탈퇴 (DELETE)
    try {
      console.log("🔥 DELETE: START");

      const res = await DELETE();
      expect(res.status).toStrictEqual(200);

      console.log("✅ DELETE: DONE");
    } catch (err) {
      console.error(err);
      throw Error("❗️ DELETE: FAILED");
    }
  });
});
