import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import Threads from "@components/pages/home/Threads";

describe("Threads component", () => {
  beforeAll(() => {
    render(<Threads />);
  });

  test("should render the component", async () => {
    const ul = await screen.findByRole("list");
    expect(ul).toBeDefined();
  });

  test("should get threads list", async () => {
    const threads = await screen.findAllByText(/^book/i);
    expect(threads).toHaveLength(2);
  });
});
