import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("home page", () => {
  beforeAll(() => {
    render(<Page />);
  });

  test("should render the page", () => {
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /threads/i,
    });
    expect(heading).toBeDefined();
  });

  test("should get threads list, if there're items", async () => {
    const title = await screen.findAllByText(/book1/i);
    expect(title).toBeDefined();
  });

  test("should get all the thread list", async () => {
    const title = await screen.findAllByRole("heading", {
      level: 3,
      name: /^book/i,
    });
    expect(title.length).toEqual(2);
  });
});
