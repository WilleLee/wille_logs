"use server";

import { cookies } from "next/headers";
import { fetcher } from "./data";
import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

interface ActionState {
  isError: boolean;
  error?: string;
}

export async function logout() {
  cookies().delete("access-token");
  cookies().delete("user-nickname");
  revalidatePath("/");
  redirect("/");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data, error, isSuccess } = await fetcher<{
    nickname: string;
    accessToken: string;
  }>("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!isSuccess || !data) {
    console.log(error);
    return;
  }
  const { nickname, accessToken } = data;
  const sevenDaysLater = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  cookies().set("access-token", accessToken, {
    expires: sevenDaysLater,
  });
  cookies().set("user-nickname", nickname, {
    expires: sevenDaysLater,
  });

  revalidatePath("/");
  redirect("/");
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
