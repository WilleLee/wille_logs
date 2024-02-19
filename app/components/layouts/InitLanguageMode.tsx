"use client";

import { useSetRecoilState } from "recoil";
import { languageModeState } from "@atoms/languageModeState";
import { useEffect } from "react";
import cookies from "@libs/cookies";

let initialLanguageMode = "en";

if (typeof window !== "undefined") {
  initialLanguageMode = cookies.get("languageMode");
}

export default function InitLanguageMode() {
  const setLanguageMode = useSetRecoilState(languageModeState);

  useEffect(() => {
    if (
      typeof initialLanguageMode === "string" &&
      (initialLanguageMode === "en" || initialLanguageMode === "ko")
    ) {
      setLanguageMode(initialLanguageMode);
    }
  }, [setLanguageMode]);

  return null;
}
