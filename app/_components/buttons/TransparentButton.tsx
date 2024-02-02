import React from "react";
import { DefaultButtonProps } from ".";

interface Props extends DefaultButtonProps {}

export default function TransparentButton({ children, ...props }: Props) {
  return <button {...props}>{children}</button>;
}
