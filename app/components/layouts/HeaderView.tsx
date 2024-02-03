"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import avatar128 from "@images/avatar128.png";
import HomeSvg from "@components/svgs/HomeSvg";
import WriteSvg from "@components/svgs/WriteSvg";
import UserSvg from "@components/svgs/UserSvg";
import TransparentButton from "@components/buttons/TransparentButton";
import SettingSvg from "@components/svgs/SettingSvg";
import { AllHTMLAttributes, useState } from "react";
import styles from "./headerView.module.scss";
import users from "@libs/users";
import { createPortal } from "react-dom";
import LoginModal from "../modals/LoginModal";

interface HeaderViewProps extends AllHTMLAttributes<HTMLDivElement> {
  //pathname: string;
}

export default function HeaderView({
  //pathname,
  ...props
}: HeaderViewProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleClickWrite = () => {
    console.log("logged in?", users.isLoggedIn());
    const isLoggedIn = users.isLoggedIn();
    if (!isLoggedIn) {
      setShowLoginModal(true);
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <TransparentButton
          aria-label="setting"
          className={styles.settingButton}
        >
          <SettingSvg aria-hidden width="26" className={styles.settingSvg} />
        </TransparentButton>
      </div>
    </div>
  );
}
