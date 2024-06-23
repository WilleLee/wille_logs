"use client";

import FormButton from "@components/form-button";
import useInternalRouter from "@hooks/useInternalRouter";

export default function HomeHeaderPublic() {
  const { push } = useInternalRouter();
  return (
    <div className="grid w-full grid-cols-[1fr_1fr] items-center gap-[32px] pb-[16px] pt-[8px]">
      <FormButton
        onClick={() => push("/login")}
        data-testid="login_button"
        aria-label="로그인 페이지로 이동"
      >
        로그인
      </FormButton>
      <FormButton
        onClick={() => push("/signup")}
        data-testid="signup_button"
        aria-label="회원가입 페이지로 이동"
      >
        회원가입
      </FormButton>
    </div>
  );
}
