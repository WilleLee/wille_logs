import WriteThreadForm from "@components/home/write-thread-form";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import wrapper from "../renderUI";
import { TestManager } from "@/__test__";

vi.mock("react-dom", () => ({
  useFormStatus: () => {
    return {
      pending: false,
    };
  },
}));

const init = () => {
  const { unmount } = render(<WriteThreadForm />, {
    wrapper: (props) => wrapper(props),
  });
  return { unmount };
};

describe("HOME | WRITE THREAD FORM", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
  test("NORMAL FLOW", async () => {
    const testManager = new TestManager(
      ["INITIAL RENDER"],
      "HOME | WRITE THREAD FORM | NORMAL FLOW",
    );
    const { unmount } = init();

    const textInput = screen.queryByTestId("text_input") as HTMLTextAreaElement;
    const tagsInput = screen.queryByTestId(
      "real_tags_input",
    ) as HTMLInputElement;
    const bookTitleInput = screen.queryByTestId(
      "book_title_input",
    ) as HTMLInputElement;
    const bookAuthorInput = screen.queryByTestId(
      "book_author_input",
    ) as HTMLInputElement;
    const bookPageInput = screen.queryByTestId(
      "book_page_input",
    ) as HTMLInputElement;

    try {
      expect(textInput).not.toBeNull();
      expect(textInput.placeholder).toEqual("책 내용을 입력해주세요.");
      expect(textInput.value).toEqual("");
      expect(tagsInput).not.toBeNull();
      expect(tagsInput.value).toEqual("");
      expect(bookTitleInput).not.toBeNull();
      expect(bookTitleInput.placeholder).toEqual("책 제목을 입력해주세요.");
      expect(bookTitleInput.value).toEqual("");
      expect(bookAuthorInput).not.toBeNull();
      expect(bookAuthorInput.placeholder).toEqual("저자를 입력해주세요.");
      expect(bookAuthorInput.value).toEqual("");
      expect(bookPageInput).not.toBeNull();
      expect(bookPageInput.placeholder).toEqual("페이지를 입력해주세요.");
      expect(bookPageInput.value).toEqual("");
      testManager.success("INITIAL RENDER");
    } catch (err) {
      console.error(err);
      testManager.fail("INITIAL RENDER");
      testManager.logResults();
      unmount();
    }

    testManager.logResults();
    unmount();
  });
});
