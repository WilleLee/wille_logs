import { getTags, getThreads } from "@libs/data";
import Link from "next/link";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<p>loading...</p>}>
        <Tags />
      </Suspense>
      <Suspense fallback={<p>loading...</p>}>
        <Threads />
      </Suspense>
    </>
  );
}

async function Tags() {
  const { data, isSuccess } = await getTags();

  if (!isSuccess || data === null) {
    return <p>error</p>;
  }

  return (
    <>
      {data.map((tag) => (
        <div key={tag._id}>
          <h2>{tag.name}</h2>
        </div>
      ))}
    </>
  );
}

async function Threads() {
  const { data, isSuccess } = await getThreads();

  if (!isSuccess || data === null) {
    return <p>error</p>;
  }

  return (
    <>
      {data.map((thread) => (
        <div key={thread._id}>
          <Link href={`/threads/${thread._id}`}>
            <h2>{thread.text}</h2>
          </Link>
        </div>
      ))}
    </>
  );
}

/*
import { cookies } from "next/headers";

export default async function HomePage() {
  return (
    <div>
      <h1>test</h1>
      <LoginForm />
    </div>
  );
}

async function authenticate(formData: FormData) {
  "use server";
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      console.log("로그인에 실패했습니다.");
    }
    const json = await res.json();
    cookies().set("access-token", json.accessToken);
    cookies().set("user-email", json.email);
  } catch (err) {
    console.log(err);
    console.log("로그인에 실패했습니다.");
  }
}

function LoginForm() {
  return (
    <form action={authenticate}>
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit">로그인</button>
    </form>
  );
}
*/
