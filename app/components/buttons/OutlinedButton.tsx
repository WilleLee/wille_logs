"use client";

import React from "react";
import { DefaultButtonProps } from ".";
import styles from "./outlinedButton.module.scss";

interface Props extends DefaultButtonProps {
  isSelected?: boolean;
  children: React.ReactNode;
}

const OutlinedButton = React.memo(function OutlinedButton({
  children,
  isSelected = false,
  ...props
}: Props) {
  return (
    <button
      className={`${styles.button} ${isSelected ? styles.selected : ""}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default OutlinedButton;
