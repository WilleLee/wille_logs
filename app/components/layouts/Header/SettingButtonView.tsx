"use client";

import React, { AllHTMLAttributes } from "react";
import styles from "./settingButtonView.module.scss";
import TransparentButton from "@components/buttons/TransparentButton";
import SettingSvg from "@components/svgs/SettingSvg";
import Box from "@components/boxes/Box";

export interface SettingButtonViewProps
  extends AllHTMLAttributes<HTMLDivElement> {
  isLoggedIn: boolean;
  showModal: boolean;
  languageMode: "ko" | "en";
  handleClickSetting: () => void;
  handleClickLogin: () => void;
  handleClickLogout: () => void;
  handleToggleScreenMode: () => void;
  handleToggleLanguageMode: () => void;
}

const SettingButtonView = React.forwardRef(function SettingButtonView(
  {
    isLoggedIn,
    showModal,
    languageMode,
    handleClickSetting,
    handleClickLogin,
    handleClickLogout,
    handleToggleScreenMode,
    handleToggleLanguageMode,
    ...props
  }: SettingButtonViewProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div className={styles.wrapper} {...props}>
      <TransparentButton
        aria-label="setting"
        className={styles.button}
        onClick={handleClickSetting}
      >
        <SettingSvg aria-hidden width="26" className={styles.settingSvg} />
      </TransparentButton>
      {showModal ? (
        <div ref={ref} className={styles.modal}>
          <Box>
            <TransparentButton onClick={handleToggleLanguageMode}>
              <h4>한 / En</h4>
            </TransparentButton>
            <TransparentButton onClick={handleToggleScreenMode}>
              <h4>
                {languageMode === "ko" ? "라이트 / 다크" : "light / dark"}
              </h4>
            </TransparentButton>
            {isLoggedIn ? (
              <TransparentButton
                className={styles.modalButton}
                onClick={handleClickLogout}
              >
                <h4>{languageMode === "ko" ? "로그아웃" : "logout"}</h4>
              </TransparentButton>
            ) : (
              <TransparentButton
                className={styles.modalButton}
                onClick={handleClickLogin}
              >
                <h4>{languageMode === "ko" ? "로그인" : "login"}</h4>
              </TransparentButton>
            )}
          </Box>
        </div>
      ) : null}
    </div>
  );
});

export default SettingButtonView;
