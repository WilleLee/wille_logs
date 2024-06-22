import { logout } from "@libs/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이 페이지",
};

export default function MyPage() {
  return (
    <form action={logout}>
      <button type="submit">로그아웃</button>
    </form>
  );
}
