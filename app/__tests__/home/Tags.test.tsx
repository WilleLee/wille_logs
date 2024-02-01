import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import Tags from "@components/pages/home/Tags";

describe.skip("Tags component", () => {
  beforeAll(() => {
    render(<Tags />);
  });

  test("should render the component", async () => {
    const ul = screen.findByRole("list");
    expect(ul).toBeDefined();
  });

  test("should get tags list", async () => {
    const tags = await screen.findAllByText(/^tag/i);
    expect(tags).toHaveLength(2);
  });
});
