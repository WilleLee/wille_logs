import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/" aria-label="홈으로 이동">
        <button aria-hidden>홈</button>
      </Link>
    </header>
  );
}
