import { ButtonHTMLAttributes } from "react";

export interface DefaultButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
