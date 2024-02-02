"use client";

import React from "react";
import { DefaultButtonProps } from ".";

interface Props extends DefaultButtonProps {}

export default function TransparentButton({ children, ...props }: Props) {
  return (
    <button
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      {children}
    </button>
  );
}
