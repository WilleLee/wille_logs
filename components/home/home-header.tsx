import { cookies } from "next/headers";
import Link from "next/link";

export default async function HomeHeader() {
  const accessToken = cookies().get("access-token");
  const isLoggedin = !!accessToken;
  return (
    <>
      {isLoggedin ? (
        <div>
          {
            // 작성 폼
          }
          작성 폼
        </div>
      ) : (
        <Link
          test-id="login-button"
          href="/login"
          aria-label="로그인 페이지로"
          title="로그인 페이지로"
        >
          <button aria-hidden>로그인</button>
        </Link>
      )}
    </>
  );
}
