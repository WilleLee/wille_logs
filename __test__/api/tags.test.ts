import { afterEach, describe, expect, test, vi } from "vitest";
import { TestManager } from "..";
import { GET as GET_TAGS } from "@api/tags/route";

describe(
  "/api/tags",
  () => {
    afterEach(() => {
      vi.clearAllMocks();
      vi.clearAllTimers();
    });
    test("NORMAL FLOW", async () => {
      const testManager = new TestManager(["GET_TAGS"], "TAGS | NORMAL FLOW");

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

      testManager.logResults();
    });
  },
  {
    timeout: 10000,
  },
);
