"use client";

import React, { AllHTMLAttributes, useEffect, useRef, useState } from "react";
import TransparentButton from "@components/buttons/TransparentButton";
import SettingSvg from "@components/svgs/SettingSvg";
import Box from "@components/boxes/Box";
import styles from "./settingButton.module.scss";
import users from "@libs/users";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  setShowLoginModal: (value: boolean) => void;
}

const SettingButton = React.memo(function SettingButton({
  setShowLoginModal,
  ...props
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!showModal) return;
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModal]);
  return (
    <div className={styles.wrapper} {...props}>
      <TransparentButton
        aria-label="setting"
        className={styles.button}
        onClick={() => setShowModal((prev) => !prev)}
      >
        <SettingSvg aria-hidden width="26" className={styles.settingSvg} />
      </TransparentButton>
      {showModal ? (
        <div ref={modalRef} className={styles.modal}>
          <Box>
            {users.isLoggedIn() ? (
              <TransparentButton
                className={styles.modalButton}
                onClick={() => {
                  const ok = confirm("Are you sure to logout?");
                  if (ok) {
                    users.logout();
                    setShowModal(false);
                  }
                }}
              >
                logout
              </TransparentButton>
            ) : (
              <TransparentButton
                className={styles.modalButton}
                onClick={() => {
                  setShowLoginModal(true);
                  setShowModal(false);
                }}
              >
                login
              </TransparentButton>
            )}
          </Box>
        </div>
      ) : null}
    </div>
  );
});

export default SettingButton;
