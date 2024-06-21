import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Tags from "@components/home/tags";
import wrapper from "../renderUI";
import { TestManager } from "@/__test__";
import * as data from "@libs/data";
import TagProvider from "@components/home/tag-provider";
import { ReactNode } from "react";

const provider = ({ children }: { children: ReactNode }) => {
  return <TagProvider>{children}</TagProvider>;
};

const init = async () => {
  const { unmount } = render(await Tags(), {
    wrapper: (props) => wrapper(props, provider),
  });

  return { unmount };
};

describe("HOME | TAGS", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
  test("INITIAL RENDER", async () => {
    const testManager = new TestManager(
      ["RENDER"],
      "HOME | TAGS | INITIAL RENDER",
    );

    vi.spyOn(data, "getTags").mockReturnValue(
      new Promise((res) =>
        res({
          data: [
            {
              _id: "1",
              name: "TAG1",
              threads: ["11"],
              usedCount: 1,
            },
            {
              _id: "2",
              name: "TAG2",
              threads: ["22"],
              usedCount: 1,
            },
          ],
          isSuccess: true,
        }),
      ),
    );

    const { unmount } = await init();

    try {
      const tagNames = screen.getAllByTestId("tag_name");
      expect(tagNames).toHaveLength(2);
      const tag1 = tagNames.find((t) => t.innerHTML === "TAG1");
      expect(tag1).toBeDefined();

      testManager.success("RENDER");
    } catch (err) {
      console.error(err);
      testManager.fail("RENDER");
      testManager.logResults();
      throw Error("❗️ RENDER FAILED");
    }

    testManager.logResults();
    unmount();
  });
});
