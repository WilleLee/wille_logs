import TagProvider from "@components/home/tag-provider";
import Threads from "@components/home/threads";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";
import wrapper from "../renderUI";
import { TestManager } from "@/__test__";
import * as data from "@libs/data";

const provider = ({ children }: { children: ReactNode }) => {
  return <TagProvider>{children}</TagProvider>;
};

const init = async () => {
  const { unmount } = render(await Threads(), {
    wrapper: (props) => wrapper(props, provider),
  });

  return { unmount };
};

describe("HOME | THREADS", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
  test("INITIAL RENDER", async () => {
    const testManager = new TestManager(
      ["RENDER"],
      "HOME | THREADS | INITIAL RENDER",
    );

    vi.spyOn(data, "getThreads").mockReturnValue(
      new Promise((res) =>
        setTimeout(
          () =>
            res({
              data: [
                {
                  _id: "1",
                  text: "thread 1",
                  tags: [],
                  createdAt: "2021-09-01T00:00:00.000Z",
                  creator: "22",
                  book: {
                    title: "book 1",
                    author: "author 1",
                    page: 1,
                  },
                },
                {
                  _id: "2",
                  text: "thread 2",
                  tags: [],
                  createdAt: "2021-09-02T00:00:00.000Z",
                  creator: "23",
                  book: {
                    title: "book 2",
                    author: "author 2",
                    page: 2,
                  },
                },
              ],
              isSuccess: true,
            }),
          500,
        ),
      ),
    );

    const { unmount } = await init();

    try {
      const threadTexts = screen.getAllByTestId("thread_text");
      expect(threadTexts).toHaveLength(2);
      const foundThread = threadTexts.find((t) => t.innerHTML === "thread 1");
      expect(foundThread).toBeDefined();
      testManager.success("RENDER");
    } catch (err) {
      console.error(err);
      testManager.fail("RENDER");
      testManager.logResults();
      console.log("❗️ RENDER FAILED");
    }

    testManager.logResults();
    unmount();
  });
});
