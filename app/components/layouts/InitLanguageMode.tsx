"use client";

import { useSetRecoilState } from "recoil";
import { languageModeState } from "@atoms/languageModeState";
import { useEffect } from "react";
import cookies from "@libs/cookies";

export default function InitLanguageMode() {
  const setLanguageMode = useSetRecoilState(languageModeState);

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
