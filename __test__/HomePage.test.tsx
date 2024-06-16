import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@domain/page";
import { PortalProvider } from "@app/global-portal";

function init() {
  const { unmount } = render(<HomePage />, {
    wrapper: (props) => <PortalProvider>{props.children}</PortalProvider>,
  });
  return { unmount };
}

describe("HomePage", () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });
  test.todo("should render", () => {
    const { unmount } = init();

    const text = screen.getByText("hello world");
    expect(text).toBeDefined();

    unmount();
  });
});
