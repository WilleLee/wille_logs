"use client";

import { useThemeStore } from "@libs/zustand/theme/use-theme-store";
import { useEffect } from "react";

export default function ThemeInitializer() {
  const { theme, setLightTheme, setDarkTheme } = useThemeStore();
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }, [setDarkTheme, setLightTheme]);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return null;
}
