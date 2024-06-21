import { afterEach, describe, expect, test, vi } from "vitest";
import { TestManager } from "..";
import { GET as GET_TAGS } from "@api/tags/route";
import { GET as GET_ONE_TAG } from "@api/tags/[id]/route";

describe(
  "/api/tags",
  () => {
    afterEach(() => {
      vi.clearAllMocks();
      vi.clearAllTimers();
    });
    test("NORMAL FLOW", async () => {
      const testManager = new TestManager(
        ["GET_TAGS", "GET_ONE_TAG"],
        "TAGS | NORMAL FLOW",
      );

      try {
        const res = await GET_TAGS();
        expect(res.status).toStrictEqual(200);

        testManager.success("GET_TAGS");
      } catch (err) {
        console.error(err);

        testManager.fail("GET_TAGS");
        testManager.logResults();
        throw Error("❗️ GET_TAGS FAILED");
      }

      try {
        const reqObj = {} as any;
        const res = await GET_ONE_TAG(reqObj, {
          params: { id: "66745fcd116f892eba36f45b" },
        });
        expect(res.status).toStrictEqual(200);

        testManager.success("GET_ONE_TAG");
      } catch (err) {
        console.error(err);

        testManager.fail("GET_ONE_TAG");
        testManager.logResults();
        throw Error("❗️ GET_ONE_TAG FAILED");
      }

      testManager.logResults();
    });
  },
  {
    timeout: 10000,
  },
);
