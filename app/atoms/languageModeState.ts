import { atom } from "recoil";

export const languageModeState = atom({
  key: "languageModeState",
  default: "en",
});

export const languageModeActions = {
  toggle: (prev: string) => (prev === "en" ? "ko" : "en"),
};
