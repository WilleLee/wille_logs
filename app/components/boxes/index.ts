import { AllHTMLAttributes } from "react";

export interface DefaultBoxProps extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
