"use client";

import React, { AllHTMLAttributes } from "react";
import styles from "./metaBox.module.scss";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  backgroundColor?: string;
  color?: string;
}

export default function MetaBox({
  children,
  className,
  backgroundColor = "rgb(var(--text-box))",
  color = "rbg(var(--text-faded))",
  ...props
}: Props) {
  const newClassName = className ? `${styles.box} ${className}` : styles.box;
  return (
    <div
      style={{
        backgroundColor,
        color,
      }}
      {...props}
      className={newClassName}
    >
      {children}
    </div>
  );
}
