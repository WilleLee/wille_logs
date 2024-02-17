"use client";

import { useRecoilState } from "recoil";
import { screenModeState } from "@atoms/screenModeState";
import { useEffect } from "react";
import cookies from "@libs/cookies";

let initialScreenMode = "dark";

if (typeof window !== "undefined") {
  initialScreenMode = cookies.get("screenMode");
}

export default function InitScreenMode() {
  const [screenMode, setScreenMode] = useRecoilState(screenModeState);
  console.log("cookie", initialScreenMode);
  console.log(screenMode);

  useEffect(() => {
    if (typeof initialScreenMode === "string" && initialScreenMode.length > 0) {
      setScreenMode(initialScreenMode);
    }
  }, [setScreenMode]);

  useEffect(() => {
    if (screenMode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [screenMode]);
  return null;
}
