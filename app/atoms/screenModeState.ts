import { atom } from "recoil";

export const screenModeState = atom({
  key: "screenModeState",
  default: "dark",
});

export const screenModeActions = {
  toggle: (prev: string) => (prev === "dark" ? "light" : "dark"),
};
