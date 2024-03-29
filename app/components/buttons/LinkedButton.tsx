"use client";

import React from "react";
import { DefaultButtonProps } from ".";
import styles from "./linkedButton.module.scss";

interface Props extends DefaultButtonProps {}

export default function LinkedButton({ children, ...props }: Props) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
