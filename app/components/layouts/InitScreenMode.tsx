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
    const html = document.querySelector("html");
    if (screenMode === "dark") {
      document.body.classList.add("dark");
      if (html instanceof HTMLElement) {
        html.style.backgroundColor = "rgb(16, 16, 16)";
      }
    } else {
      document.body.classList.remove("dark");
      if (html instanceof HTMLElement) {
        html.style.backgroundColor = "rgb(255, 255, 255)";
      }
    }
  }, [screenMode]);
  return null;
}
