"use client";

import Image from "next/image";
import React from "react";
import avatar128 from "@images/avatar128.png";
// import ButtonWrapper from "../buttons/ButtonWrapper";
// import { useRouter } from "next/navigation";
import styles from "./header.module.css";
import Link from "next/link";
import HomeSvg from "../svgs/HomeSvg";
import WriteSvg from "../svgs/WriteSvg";
import UserSvg from "../svgs/UserSvg";

type Props = {};

export default function Header({}: Props) {
  // const router = useRouter();
  return (
    <header>
      <Link href="/">
        <Image
          className={styles.image}
          src={avatar128}
          width={36}
          height={36}
          alt="Wille logs..."
        />
      </Link>
      <nav>
        <HomeSvg width="36" isActive={false} aria-hidden={true} />
        <WriteSvg width="36" aria-hidden={true} />
        <UserSvg width="36" isActive={false} aria-hidden={true} />
      </nav>
      <div>
        {/* <svg
          aria-hidden={true}
          viewBox="0 0 24 24"
          fill="rgb(var(--icon))"
          width="24"
          height="24"
        >
          <rect rx="1.25" x="3" y="7" />
          <rect rx="1.25" x="10" y="15" />
        </svg> */}
      </div>
      <h1 className={styles.h1}>Wille logs&hellip;</h1>
    </header>
  );
}
