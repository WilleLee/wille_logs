import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, test } from "vitest";
import Profile from "@components/pages/home/Profile";

describe("Profile component", () => {
  beforeAll(() => {
    render(<Profile />);
  });

  test("should render Profile component", () => {
    const profile = screen.getByText(/wille/i);
    expect(profile).toBeDefined();
  });
});
