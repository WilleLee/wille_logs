import FormButton from "@components/form-button";
import Header from "@components/header";
import Text from "@components/text";
import { logout } from "@libs/actions";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "마이 페이지",
};

export default function MyPage() {
  unstable_noStore();
  const nickname = cookies().get("user-nickname")?.value;
  return (
    <>
      <Header />
      {nickname && (
        <div className="mt-[16px]">
          <Text type="large">{nickname} 님, 환영합니다.</Text>
        </div>
      )}
      <form action={logout}>
        <FormButton isError type="submit" aria-label="로그아웃 버튼">
          로그아웃
        </FormButton>
      </form>
    </>
  );
}
