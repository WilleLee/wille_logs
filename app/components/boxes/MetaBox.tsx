"use client";

import React, { AllHTMLAttributes } from "react";
import styles from "./metaBox.module.scss";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function MetaBox({ children, className, ...props }: Props) {
  const newClassName = className ? `${styles.box} ${className}` : styles.box;
  return (
    <div {...props} className={newClassName}>
      {children}
    </div>
  );
}
