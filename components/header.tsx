import Link from "next/link";
import ThemeButton from "./theme-button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed left-[50%] top-0 z-50 flex h-[64px] w-full max-w-[520px] -translate-x-[50%] items-center justify-between bg-background px-[24px] dark:bg-darkBackground">
      <Link href="/" aria-label="홈으로 이동" title="Wille logs...">
        <Image
          src="/logos/avatar168.png"
          width={64}
          height={64}
          alt="홈 로고"
        />
      </Link>
      <ThemeButton />
    </header>
  );
}
