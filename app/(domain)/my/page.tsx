import { logout } from "@libs/actions";

export default function MyPage() {
  return (
    <form action={logout}>
      <button type="submit">로그아웃</button>
    </form>
  );
}
