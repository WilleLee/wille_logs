"use client";

import { useRecoilState } from "recoil";
import { languageModeState } from "@atoms/languageModeState";

export default function InitLanguageMode() {
  const [languageMode, setLanguageMode] = useRecoilState(languageModeState);
  console.log(languageMode);
  return null;
}
