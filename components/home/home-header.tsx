import { cookies } from "next/headers";
import Link from "next/link";
import WriteThreadForm from "./write-thread-form";
import { unstable_noStore } from "next/cache";

export default async function HomeHeader() {
  unstable_noStore();
  const accessToken = cookies().get("access-token");
  const isLoggedin = !!accessToken;
  return (
    <>
      {isLoggedin ? (
        <div>
          <Link
            href="/my"
            title="마이 페이지로"
            aria-label="마이 페이지로 이동"
          >
            <button aria-hidden>마이 페이지</button>
          </Link>
          {
            // TODO: 스레드 작성 폼
          }
          <WriteThreadForm />
        </div>
      ) : (
        <Link
          test-id="login-button"
          href="/login"
          aria-label="로그인 페이지로 이동"
          title="로그인 페이지로"
        >
          <button aria-hidden>로그인</button>
        </Link>
      )}
    </>
  );
}
