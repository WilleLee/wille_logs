import { create } from "zustand";
import { themeStoreCreator, ThemeStore } from "./theme-store-creator";

export const useThemeStore = create<ThemeStore>(themeStoreCreator);
