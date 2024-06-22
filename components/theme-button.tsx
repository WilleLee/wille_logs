"use client";

import { useThemeStore } from "@libs/zustand/theme/use-theme-store";

export default function ThemeButton() {
  const { toggleTheme, theme } = useThemeStore();
  return (
    <button
      onClick={() => {
        if (theme === "dark") {
          localStorage.setItem("theme", "light");
        } else {
          localStorage.setItem("theme", "dark");
        }
        toggleTheme();
      }}
      aria-label="테마 변경 버튼"
      title="테마 변경"
    >
      <div className="h-[48px] w-[80px] rounded-[24px] bg-grey-100 p-[5px] dark:bg-grey-800">
        <div className="relative h-full w-full rounded-[24px] bg-grey-200 dark:bg-blue-300">
          <div className="absolute left-[4px] top-[50%] h-[34px] w-[34px] -translate-y-[50%] rounded-[50%] bg-grey-700 transition-all dark:left-[32px] dark:bg-grey-300" />
        </div>
      </div>
    </button>
  );
}
