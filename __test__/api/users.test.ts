import { GET, POST as SIGNUP, PATCH, DELETE } from "@api/users/route";
import { POST as LOGIN } from "@api/users/login/route";
import { afterEach, describe, expect, test, vi } from "vitest";
import { TestManager } from "..";

const mockGetCookie = vi.fn();

vi.mock("next/headers", () => ({
  cookies: () => ({
    get: mockGetCookie,
  }),
}));

describe(
  "/api/users",
  () => {
    afterEach(() => {
      vi.clearAllMocks();
      vi.clearAllTimers();
    });
    test("NORMAL FLOW", async () => {
      const testManager = new TestManager(
        ["SIGNUP", "LOGIN", "GET", "PATCH", "DELETE"],
        "USERS | NORMAL FLOW",
      );
      const testEmail = Date.now().toString().slice(-5) + "@test.com";
      const testPassword = "123456";
      const testNickname = "tester0";
      let testAccessToken = "";
      const signupSecret = process.env.SIGNUP_SECRET as string;

      // 회원가입 (SIGNUP)
      try {
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

        testManager.success("SIGNUP");
      } catch (err) {
        console.error(err);
        testManager.fail("SIGNUP");
        testManager.logResults();
        throw Error("❗️ SIGNUP FAILED");
      }

      // 로그인 (LOGIN)
      try {
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

        testManager.success("LOGIN");
      } catch (err) {
        console.error(err);
        testManager.fail("LOGIN");
        testManager.logResults();
        throw Error("❗️ LOGIN FAILED");
      }

      mockGetCookie.mockReturnValue({
        value: testAccessToken,
      });

      // 회원정보조회 (GET)
      try {
        const res = await GET();
        expect(res.status).toStrictEqual(200);
        const { email, nickname } = (await res.json()) as {
          email: string;
          nickname: string;
        };
        expect(email).toStrictEqual(testEmail);
        expect(nickname).toStrictEqual(testNickname);

        // testResults.set("GET", "SUCCESS");
        testManager.success("GET");
      } catch (err) {
        console.error(err);
        testManager.fail("GET");
        testManager.logResults();
        throw Error("❗️ GET FAILED");
      }

      // 회원정보수정 (PATCH)
      try {
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

        testManager.success("PATCH");
      } catch (err) {
        console.error(err);
        testManager.fail("PATCH");
        testManager.logResults();
        throw Error("❗️ PATCH FAILED");
      }

      // 회원탈퇴 (DELETE)
      try {
        const res = await DELETE();
        expect(res.status).toStrictEqual(200);

        testManager.success("DELETE");
      } catch (err) {
        console.error(err);
        testManager.fail("DELETE");
        throw Error("❗️ DELETE FAILED");
      }

      testManager.logResults();
    });
  },
  { timeout: 10000 },
);
