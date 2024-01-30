import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";
import { server } from "@mocks/server";
import { http, HttpResponse } from "msw";

describe("home page", () => {
  beforeEach(() => {
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
});
