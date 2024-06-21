import { atom } from "recoil";

type ILanguageMode = "en" | "ko";

export const languageModeState = atom<ILanguageMode>({
  key: "languageModeState",
  default: "en",
});

export const languageModeActions = {
  toggle: (prev: ILanguageMode) => (prev === "en" ? "ko" : "en"),
};
