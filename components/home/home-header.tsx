import { cookies } from "next/headers";
import Link from "next/link";
import WriteThreadForm from "./write-thread-form";
import { unstable_noStore } from "next/cache";
import FormButton from "@components/form-button";

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
          <WriteThreadForm />
        </div>
      ) : (
        <div className="grid w-full grid-cols-[80px_80px] items-center justify-center gap-[32px] pb-[16px] pt-[8px]">
          <Link
            data-testid="login_button"
            href="/login"
            aria-label="로그인 페이지로 이동"
            title="로그인 페이지로"
          >
            <FormButton aria-hidden>로그인</FormButton>
          </Link>
          <Link
            data-testid="signup_button"
            href="/signup"
            aria-label="회원가입 페이지로 이동"
            title="회원가입 페이지로"
          >
            <FormButton aria-hidden>회원가입</FormButton>
          </Link>
        </div>
      )}
    </>
  );
}
