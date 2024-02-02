"use client";

import React from "react";
import { DefaultSvgProps } from ".";

interface Props extends DefaultSvgProps {}

export default function WriteSvg({
  color = "rgb(var(--icon))",
  width = "26",
  ...props
}: Props) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="transparent"
      width={width}
      height={width}
      {...props}
    >
      <path
        d="M 22.75 13 L 22.75 13.15 C 22.75 16.5103 22.75 18.1905 22.096 19.4739 C 21.5208 20.6029 20.6029 21.5208 19.4739 22.096 C 18.1905 22.75 16.5103 22.75 13.15 22.75 L 12.85 22.75 C 9.48969 22.75 7.80953 22.75 6.52606 22.096 C 5.39708 21.5208 4.4792 20.6029 3.90396 19.4739 C 3.25 18.1905 3.25 16.5103 3.25 13.15 L 3.25 12.85 C 3.25 9.48968 3.25 7.80953 3.90396 6.52606 C 4.4792 5.39708 5.39708 4.4792 6.52606 3.90396 C 7.80953 3.25 9.48968 3.25 12.85 3.25 L 13 3.25"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        d="M21.75 4.25L13.75 12.25"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}
