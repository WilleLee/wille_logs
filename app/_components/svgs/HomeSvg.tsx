"use client";

import React from "react";
import { DefaultSvgProps } from ".";

interface Props extends DefaultSvgProps {
  isActive: boolean;
}

export default function HomeSvg({
  color = "rgb(var(--icon))",
  width = "26",
  isActive,
  ...props
}: Props) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill={color}
      width={width}
      height={width}
      {...props}
    >
      <path
        d="M 2.25 12.8855 V 20.7497 C 2.25 21.8543 3.14543 22.7497 4.25 22.7497 H 8.25 C 8.52614 22.7497 8.75 22.5259 8.75 22.2497 V 17.6822 V 17.4997 C 8.75 15.1525 10.6528 13.2497 13 13.2497 C 15.3472 13.2497 17.25 15.1525 17.25 17.4997 V 17.6822 V 22.2497 C 17.25 22.5259 17.4739 22.7497 17.75 22.7497 H 21.75 C 22.8546 22.7497 23.75 21.8543 23.75 20.7497 V 12.8855 C 23.75 11.3765 23.0685 9.94815 21.8954 8.99883 L 16.1454 4.3454 C 14.3112 2.86095 11.6888 2.86095 9.85455 4.3454 L 4.10455 8.99883 C 2.93153 9.94815 2.25 11.3765 2.25 12.8855 Z"
        fill={isActive ? color : "transparent"}
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}
