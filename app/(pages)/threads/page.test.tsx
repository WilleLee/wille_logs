import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

test.skip("renders the page", () => {
  render(<Page />);
  const heading = screen.getByRole("heading", {
    level: 1,
    name: "Threads",
  });
  expect(heading).toBeDefined();
});

test.skip("renders thread item", () => {
  render(<Page />);
  const title = screen.findByText("book1");
  expect(title).toBeDefined();
});
