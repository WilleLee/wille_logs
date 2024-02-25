"use client";

import { useRecoilState } from "recoil";
import { screenModeState } from "@atoms/screenModeState";
import { useEffect } from "react";
import cookies from "@libs/cookies";

export default function InitScreenMode() {
  const [screenMode, setScreenMode] = useRecoilState(screenModeState);

  useEffect(() => {
    let initialScreenMode = "dark";

    if (typeof window !== "undefined") {
      initialScreenMode = cookies.get("screenMode");
    }
    if (
      typeof initialScreenMode === "string" &&
      (initialScreenMode === "dark" || initialScreenMode === "light")
    ) {
      setScreenMode(initialScreenMode);
    }
  }, [setScreenMode]);

  useEffect(() => {
    if (screenMode === "dark") {
      document.body.classList.add("dark");
      const meta = document.querySelector("meta[name=theme-color]");
      if (meta instanceof HTMLMetaElement) {
        meta.content = "#101010";
      }
    } else {
      document.body.classList.remove("dark");
      const meta = document.querySelector("meta[name=theme-color]");
      if (meta instanceof HTMLMetaElement) {
        meta.content = "#ffffff";
      }
    }
  }, [screenMode]);
  return null;
}
