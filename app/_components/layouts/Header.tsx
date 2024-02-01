"use client";

import Image from "next/image";
import React, { useState } from "react";
import avatar128 from "@images/avatar128.png";
import styles from "./header.module.scss";
import Link from "next/link";
import HomeSvg from "../svgs/HomeSvg";
import WriteSvg from "../svgs/WriteSvg";
import UserSvg from "../svgs/UserSvg";
import { createPortal } from "react-dom";
import Modal from "../modals/Modal";
import { usePathname } from "next/navigation";

type Props = {};

export default function Header({}: Props) {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const pathname = usePathname();
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
      <nav className={styles.nav}>
        <div>
          <Link href="/">
            <HomeSvg
              width="36"
              isActive={pathname === "/"}
              color={
                pathname === "/" ? "rgb(var(--icon)" : "rgb(var(--icon-faded))"
              }
              aria-hidden={true}
            />
          </Link>
        </div>
        <div>
          <WriteSvg
            onClick={() => setShowWriteModal(true)}
            width="36"
            color="rgb(var(--icon-faded))"
            aria-hidden={true}
          />
        </div>
        <div>
          <Link href="/wille">
            <UserSvg
              width="36"
              isActive={pathname === "/wille"}
              color={
                pathname === "/wille"
                  ? "rgb(var(--icon)"
                  : "rgb(var(--icon-faded))"
              }
              aria-hidden={true}
            />
          </Link>
        </div>
      </nav>
      <div></div>
      <h1 className={styles.h1}>Wille logs&hellip;</h1>
      {showWriteModal &&
        createPortal(
          <Modal onClick={() => setShowWriteModal(false)}>hihihihi</Modal>,
          document.body,
        )}
    </header>
  );
}
