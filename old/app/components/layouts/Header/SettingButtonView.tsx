"use client";

import React, { AllHTMLAttributes } from "react";
import styles from "./settingButtonView.module.scss";
import TransparentButton from "@components/buttons/TransparentButton";
import SettingSvg from "@components/svgs/SettingSvg";
import Box from "@components/boxes/Box";
import LeftArrowSvg from "@/components/svgs/LeftArrowSvg";

export interface SettingButtonViewProps
  extends AllHTMLAttributes<HTMLDivElement> {
  isLoggedIn: boolean;
  showModal: boolean;
  languageMode: "ko" | "en";
  screenMode: "light" | "dark";
  handleClickSetting: () => void;
  handleClickLogin: () => void;
  handleClickLogout: () => void;
  handleToggleScreenMode: () => void;
  handleToggleLanguageMode: () => void;
  showDesign: boolean;
  handleShowDesign: () => void;
}

const SettingButtonView = React.forwardRef(function SettingButtonView(
  {
    isLoggedIn,
    showModal,
    languageMode,
    screenMode,
    handleClickSetting,
    handleClickLogin,
    handleClickLogout,
    handleToggleScreenMode,
    handleToggleLanguageMode,
    showDesign,
    handleShowDesign,
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
        <div className={`${styles.modal} ${showDesign ? styles.design : ""}`}>
          <Box ref={ref}>
            {!showDesign ? (
              <>
                <TransparentButton
                  data-id="setting-design"
                  aria-label="디자인 모달 켜기. open design modal"
                  onClick={handleShowDesign}
                >
                  <h4 data-id="setting-design">
                    {languageMode === "ko" ? "디자인" : "design"}
                  </h4>
                </TransparentButton>
                <TransparentButton
                  aria-label="한영모드 전환. toggle language mode between Korean and English"
                  onClick={handleToggleLanguageMode}
                >
                  <h4>한 / En</h4>
                </TransparentButton>
                {isLoggedIn ? (
                  <TransparentButton
                    className={styles.modalButton}
                    aria-label="로그아웃. logout"
                    onClick={handleClickLogout}
                  >
                    <h4>{languageMode === "ko" ? "로그아웃" : "logout"}</h4>
                  </TransparentButton>
                ) : (
                  <TransparentButton
                    className={styles.modalButton}
                    aria-label="로그인. login"
                    onClick={handleClickLogin}
                  >
                    <h4>{languageMode === "ko" ? "로그인" : "login"}</h4>
                  </TransparentButton>
                )}
              </>
            ) : (
              <div>
                <div className={styles.designHeader}>
                  <TransparentButton
                    aria-label="모달 끄기"
                    onClick={(e) => {
                      handleShowDesign();
                      // handleClickSetting();
                    }}
                  >
                    <LeftArrowSvg aria-hidden />
                  </TransparentButton>
                  <h4>{languageMode === "ko" ? "디자인" : "Design"}</h4>
                </div>
                <div className={styles.designIndicatorWrapper}>
                  <TransparentButton
                    aria-label="화면 모드 변경"
                    onClick={handleToggleScreenMode}
                  >
                    {languageMode === "ko" ? "밝게" : "lighter"}
                  </TransparentButton>
                  <TransparentButton
                    aria-label="화면 모드 변경"
                    onClick={handleToggleScreenMode}
                  >
                    {languageMode === "ko" ? "어둡게" : "darker"}
                  </TransparentButton>
                  <div
                    className={`${styles.designIndicator} ${screenMode === "dark" ? styles.dark : ""}`}
                  />
                </div>
              </div>
            )}
          </Box>
        </div>
      ) : null}
    </div>
  );
});

export default SettingButtonView;
