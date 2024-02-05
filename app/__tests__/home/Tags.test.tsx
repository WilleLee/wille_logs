import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Tags from "@components/pages/home/Tags";

describe("Tags component", () => {
  test("should render all tags", async () => {
    render(<Tags />);

    const tags = await screen.findAllByText(/^tag/i);

    expect(tags).toHaveLength(2);
  });
});
