import { type StateCreator } from "zustand";

export type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
};

export const themeStoreCreator: StateCreator<ThemeStore> = (set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  setLightTheme: () => set({ theme: "light" }),
  setDarkTheme: () => set({ theme: "dark" }),
});
