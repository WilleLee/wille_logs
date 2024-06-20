import { afterEach, describe, expect, test, vi } from "vitest";
import { TestManager, testAccount } from "..";
import { POST } from "@api/threads/route";
import { DELETE } from "@api/threads/[id]/route";
import { POST as LOGIN } from "@api/users/login/route";

const mockGetCookie = vi.fn();

vi.mock("next/headers", () => ({
  cookies: () => ({
    get: mockGetCookie,
  }),
}));

describe(
  "/api/threads",
  () => {
    afterEach(() => {
      vi.clearAllMocks();
      vi.clearAllTimers();
    });
    test("NORMAL FLOW", async () => {
      let testThreadId = "";
      let testAccessToken = "";
      const testManager = new TestManager(
        ["LOGIN", "POST", "GET_ALL", "GET_ONE", "DELETE"],
        "THREADS | NORMAL FLOW",
      );

      // 로그인
      try {
        const reqObj = {
          async json() {
            return {
              email: testAccount.email,
              password: testAccount.password,
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

      // 스레드 작성
      try {
        const reqObj = {
          async json() {
            return {
              text: "좋은 글",
              tags: ["tag1", "tag2"],
              book: {
                author: "작가1",
                title: "제목1",
                page: 100,
              },
            };
          },
        } as any;
        const res = await POST(reqObj);
        expect(res.status).toStrictEqual(201);
        const json = await res.json();
        testThreadId = json._id;

        testManager.success("POST");
      } catch (err) {
        console.error(err);
        testManager.fail("POST");
        testManager.logResults();
        throw Error("❗️ POST FAILED");
      }

      // 스레드 목록 조회

      // 스레드 조회

      // 스레드 삭제
      try {
        const reqObj = {} as any;
        const res = await DELETE(reqObj, { params: { id: testThreadId } });
        expect(res.status).toStrictEqual(200);

        testManager.success("DELETE");
      } catch (err) {
        console.error(err);
        testManager.fail("DELETE");
        testManager.logResults();
        throw Error("❗️ DELETE FAILED");
      }

      testManager.logResults();
    });
  },
  {
    timeout: 10000,
  },
);
