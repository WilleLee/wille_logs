"use server";

import { cookies } from "next/headers";
import { fetcher } from "./data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { delay } from "./delay";
import { IThread } from "./types";

export async function logout() {
  cookies().delete("access-token");
  cookies().delete("user-nickname");
  revalidatePath("/");
  redirect("/");
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;
  const nickname = formData.get("nickname") as string;
  const secret = formData.get("secret") as string;
  const reqBody = {
    email,
    password,
    passwordConfirm,
    nickname,
    secret,
  };
  const { error, isSuccess } = await fetcher<null>("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  });
  if (!isSuccess) {
    console.error(error);
    return error || "회원가입에 실패했습니다.\n다시 시도해주세요.";
  }

  redirect("/login");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data, error, isSuccess } = await fetcher<{
    nickname: string;
    loggedinId: string;
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
    return error || "로그인에 실패했습니다.\n다시 시도해주세요.";
  }
  const { nickname, loggedinId, accessToken } = data;
  const sevenDaysLater = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  cookies().set("access-token", accessToken, {
    expires: sevenDaysLater,
  });
  cookies().set("loggedin-id", loggedinId, {
    expires: sevenDaysLater,
  });
  cookies().set("user-nickname", nickname, {
    expires: sevenDaysLater,
  });

  revalidatePath("/");
  redirect("/");
}

export async function writeThread(formData: FormData) {
  await delay(500);
  const text = formData.get("text") as string;
  const tags = (formData.get("tags") as string).split(" ");
  const book = {
    title: formData.get("book_title") as string,
    author: formData.get("book_author") as string,
    page: Number(formData.get("book_page")),
  };
  const accessToken = cookies().get("access-token")?.value;
  if (tags.length > 0) {
    tags.pop();
  }

  const reqBody = {
    text,
    tags,
    book,
  } as any;

  const { error, isSuccess } = await fetcher<IThread>("/threads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${accessToken};`,
    },
    body: JSON.stringify(reqBody),
  });
  if (!isSuccess) {
    console.log(error);
    return error || "글 작성에 실패했습니다.\n다시 시도해주세요.";
  }
  revalidatePath("/");
  return null;
}

export async function deleteThreadById(id: string) {
  const accessToken = cookies().get("access-token")?.value;
  const { error, isSuccess } = await fetcher<null>(`/threads/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${accessToken};`,
    },
  });
  if (!isSuccess) {
    console.error(error);
    return;
  }
  revalidatePath("/");
  redirect("/");
}
