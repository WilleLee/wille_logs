"use client";

import React, { AllHTMLAttributes } from "react";
import styles from "./boxList.module.scss";

interface BoxListProps extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  collapsed?: boolean;
}

const BoxList = React.memo(function BoxList({
  children,
  collapsed = false,
  ...props
}: BoxListProps) {
  return (
    <div
      className={`${styles.list} ${collapsed ? styles.collapsed : ""}`}
      {...props}
    >
      {children}
    </div>
  );
});

export default BoxList;
