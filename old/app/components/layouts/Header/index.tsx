"use client";

import React, { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import LoginModal from "@components/modals/LoginModal";
import WriteModal from "@components/modals/WriteModal";
import HeaderView, { HeaderViewNavProps } from "./HeaderView";
import { usePathname, useRouter } from "next/navigation";
import users from "@libs/users";
import SettingButton from "./SettingButton";

type Props = {};

export default function Header({}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWriteModal, setShowWriteModal] = useState(false);

  function handleClickLogo() {
    router.push("/");
  }

  function handleClickWrite() {
    const isLoggedIn = users.isLoggedIn();
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowWriteModal(true);
    }
  }

  const headerViewNavProps = useMemo<HeaderViewNavProps>(
    () => ({
      handleClickHome: () => router.push("/"),
      handleClickWille: () => router.push("/wille"),
      handleClickWrite,
      isHome: pathname === "/",
      isWille: pathname === "/wille",
    }),
    [router, pathname],
  );

  return (
    <>
      {showLoginModal
        ? createPortal(
            <LoginModal handleClose={() => setShowLoginModal(false)} />,
            document.body,
          )
        : null}
      {showWriteModal
        ? createPortal(
            <WriteModal handleClose={() => setShowWriteModal(false)} />,
            document.body,
          )
        : null}
      <HeaderView>
        <HeaderView.Logo handleClick={handleClickLogo} />
        <HeaderView.Nav {...headerViewNavProps} />
        <SettingButton setShowLoginModal={setShowLoginModal} />
      </HeaderView>
    </>
  );
}
