"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import avatar128 from "@images/avatar128.png";
import HomeSvg from "@components/svgs/HomeSvg";
import WriteSvg from "@components/svgs/WriteSvg";
import UserSvg from "@components/svgs/UserSvg";
import { AllHTMLAttributes, useState } from "react";
import styles from "./headerView.module.scss";
import users from "@libs/users";
import { createPortal } from "react-dom";
import LoginModal from "@components/modals/LoginModal";
import WriteModal from "@components/modals/WriteModal";
import SettingButton from "./SettingButton";

interface HeaderViewProps extends AllHTMLAttributes<HTMLDivElement> {}

export default function HeaderView({ ...props }: HeaderViewProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const handleClickWrite = () => {
    const isLoggedIn = users.isLoggedIn();
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowWriteModal(true);
    }
  };
  return (
    <div className={styles.wrapper} {...props}>
      {showLoginModal
        ? createPortal(
            <LoginModal handleClose={() => setShowLoginModal(false)} />,
            document.body,
          )
        : null}
      {showWriteModal
        ? createPortal(
            <WriteModal handleClose={() => setShowWriteModal(false)} />,
            document.querySelector("main") as Element,
          )
        : null}
      <div className={styles.logoWrapper}>
        <Image
          aria-label="home page"
          role="link"
          width="40"
          src={avatar128}
          alt="home"
          onClick={() => router.push("/")}
        />
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
          onClick={handleClickWrite}
        >
          <WriteSvg aria-hidden color="rgb(var(--icon-faded))" />
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
      <SettingButton setShowLoginModal={setShowLoginModal} />
    </div>
  );
}
