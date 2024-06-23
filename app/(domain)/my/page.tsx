import FormButton from "@components/form-button";
import Header from "@components/header";
import { logout } from "@libs/actions";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";

export const metadata: Metadata = {
  title: "마이 페이지",
};

export default function MyPage() {
  unstable_noStore();
  return (
    <>
      <Header />
      <form action={logout}>
        <FormButton isError type="submit" aria-label="로그아웃 버튼">
          로그아웃
        </FormButton>
      </form>
    </>
  );
}
