import { PortalProvider } from "@app/global-portal";
import SignupPage from "@domain/signup/page";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

const init = () => {
  const { unmount } = render(<SignupPage />, {
    wrapper: ({ children }) => <PortalProvider>{children}</PortalProvider>,
  });

  return { unmount };
};

describe("SignupPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
  test("should do the initial render", async () => {
    const { unmount } = init();

    expect(screen.getByTestId("email-input")).toBeDefined();
    expect(screen.getByTestId("nickname-input")).toBeDefined();
    expect(screen.getByTestId("password-input")).toBeDefined();
    expect(screen.getByTestId("password-confirm-input")).toBeDefined();
    expect(screen.getByTestId("secret-input")).toBeDefined();
    expect(screen.getByTestId("signup-button")).toBeDefined();

    unmount();
  });
});
