"use server";

import { fetcher } from "./data";

interface ActionState {
  isError: boolean;
  error?: string;
}

export async function signup(formData: FormData): Promise<ActionState> {
  const email = formData.get("email");
  const nickname = formData.get("nickname");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");
  const secret = formData.get("secret");
  if (
    email === null ||
    nickname === null ||
    password === null ||
    passwordConfirm === null ||
    secret === null
  ) {
    return {
      isError: true,
      error: "모든 항목을 입력해주세요.",
    };
  }
  try {
    const result = await fetcher<{ email: string }>("/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        nickname,
        password,
        secret,
      }),
    });

    if (!result.isSuccess) {
      return {
        isError: true,
        error: result.error,
      };
    } else {
      return {
        isError: false,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      isError: true,
      error: "회원가입에 실패했습니다.",
    };
  }
}
