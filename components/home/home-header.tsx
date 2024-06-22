import { cookies } from "next/headers";
import Link from "next/link";
import WriteThreadForm from "./write-thread-form";
import { unstable_noStore } from "next/cache";
import { ButtonHTMLAttributes, ReactNode } from "react";

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
        <div className="grid w-full grid-cols-[80px_80px] items-center justify-center gap-[32px] py-[16px]">
          <Link
            data-testid="login_button"
            href="/login"
            aria-label="로그인 페이지로 이동"
            title="로그인 페이지로"
          >
            <Button aria-hidden>로그인</Button>
          </Link>
          <Link
            data-testid="signup_button"
            href="/signup"
            aria-label="회원가입 페이지로 이동"
            title="회원가입 페이지로"
          >
            <Button aria-hidden>회원가입</Button>
          </Link>
        </div>
      )}
    </>
  );
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...rest }: Props) {
  return (
    <button
      className="flex h-[38px] w-full items-center justify-center rounded-[5px] bg-blue-300 text-grey-100 transition-colors hover:bg-blue-400 dark:text-grey-800"
      {...rest}
    >
      {children}
    </button>
  );
}
