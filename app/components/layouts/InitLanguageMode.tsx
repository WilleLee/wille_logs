"use client";

import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { languageModeState } from "@atoms/languageModeState";
import cookies from "@libs/cookies";

export default function InitLanguageMode() {
  const languageMode = useRecoilValue(languageModeState);
  const setLanguageMode = useSetRecoilState(languageModeState);
  console.log("InitLanguageMode", languageMode);

  useEffect(() => {
    let initialLanguageMode = "en";

    if (typeof window !== "undefined") {
      initialLanguageMode = cookies.get("languageMode");
    }
    if (
      typeof initialLanguageMode === "string" &&
      (initialLanguageMode === "en" || initialLanguageMode === "ko")
    ) {
      setLanguageMode(initialLanguageMode);
    }
  }, [setLanguageMode]);

  return null;
}
