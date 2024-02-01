import React from "react";
import { DefaultSvgProps } from ".";

interface Props extends DefaultSvgProps {
  isActive: boolean;
}

export default function UserSvg({
  color = "rgb(var(--icon))",
  width = "26",
  isActive,
  ...props
}: Props) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill={isActive ? color : "transparent"}
      height={width}
      width={width}
      {...props}
    >
      <circle cx="13" cy="7.25" r="4" stroke={color} strokeWidth="2.5" />
      <path
        d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z"
        stroke={color}
        strokeWidth="2.5"
      ></path>
    </svg>
  );
}
