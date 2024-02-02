"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { AllHTMLAttributes } from "react";
import HomeSvg from "@components/svgs/HomeSvg";
import UserSvg from "@components/svgs/UserSvg";
import WriteSvg from "@components/svgs/WriteSvg";
import styles from "./header.module.scss";
import Link from "next/link";
import SettingSvg from "../svgs/SettingSvg";
import Image from "next/image";
import avatar128 from "@images/avatar128.png";

type Props = {};

export default function Header({}: Props) {
  const pathname = usePathname();
  return <HeaderView pathname={pathname} />;
}

interface HeaderViewProps extends AllHTMLAttributes<HTMLDivElement> {
  pathname: string;
}

function HeaderView({ pathname, ...props }: HeaderViewProps) {
  const router = useRouter();
  return (
    <div className={styles.wrapper} {...props}>
      <div>
        <Image role="button" width="40" src={avatar128} alt="home" />
      </div>
      <nav className={styles.nav}>
        <button
          aria-label="home page"
          className={styles.linkButton}
          onClick={() => router.push("/")}
        >
          <HomeSvg
            aria-hidden
            isActive={pathname === "/"}
            color={
              pathname === "/" ? "rgb(var(--icon))" : "rgb(var(--icon-faded))"
            }
          />
        </button>
        <button
          aria-label="open thread form modal"
          className={styles.linkButton}
        >
          <WriteSvg aria-hidden />
        </button>
        <button
          aria-label="wille's resumé"
          className={styles.linkButton}
          onClick={() => router.push("/wille")}
        >
          <UserSvg
            aria-hidden
            isActive={pathname === "/wille"}
            color={
              pathname === "/wille"
                ? "rgb(var(--icon))"
                : "rgb(var(--icon-faded))"
            }
          />
        </button>
      </nav>
      <button aria-label="setting">
        <SettingSvg aria-hidden width="26" className={styles.settingSvg} />
      </button>
    </div>
  );
}
