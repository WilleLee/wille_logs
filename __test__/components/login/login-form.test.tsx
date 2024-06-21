import { render, screen } from "@testing-library/react";
import LoginForm from "@components/login/login-form";
import wrapper from "../renderUI";
import { afterEach, describe, expect, test, vi } from "vitest";
import { TestManager } from "@/__test__";

vi.mock("react-dom", () => ({
  useFormStatus: () => {
    return {
      pending: false,
    };
  },
}));

const init = () => {
  const { unmount } = render(<LoginForm />, {
    wrapper: (props) => wrapper(props),
  });

  return { unmount };
};

describe("LOGIN | LOGIN FORM", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  test("NORMAL FLOW", async () => {
    const testManager = new TestManager(
      ["INITIAL RENDER"],
      "LOGIN | LOGIN FORM | NORMAL FLOW",
    );
    const { unmount } = init();
    const emailInput = screen.getByTestId("email_input") as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password_input",
    ) as HTMLInputElement;
    const loginButton = screen.getByTestId("login_button") as HTMLButtonElement;

    try {
      expect(emailInput).toBeDefined();
      expect(emailInput.value).toBe("");

      expect(passwordInput).toBeDefined();
      expect(passwordInput.value).toHaveLength(0);

      expect(loginButton).toBeDefined();
      expect(loginButton.disabled).toBeTruthy();

      testManager.success("INITIAL RENDER");
    } catch (err) {
      console.error(err);
      testManager.fail("INITIAL RENDER");
      testManager.logResults();
      unmount();
    }

    /*
    const mockLogin = vi.spyOn(actions, "login").mock;

    try {
      await userEvent.type(emailInput, testAccount.email);
      await userEvent.type(passwordInput, testAccount.password);
      await userEvent.click(loginButton);
      await waitFor(async () => {
        expect(mockLogin.calls[0][0].get("email")).toEqual(testAccount.email);
        expect(mockLogin.calls[0][0].get("password")).toEqual(
          testAccount.password,
        );
      });
      testManager.success("LOGIN CALL");
    } catch (err) {
      console.error(err);
      testManager.fail("LOGIN CALL");
      testManager.logResults();
      unmount();
    }
      */

    testManager.logResults();
    unmount();
  });
});
