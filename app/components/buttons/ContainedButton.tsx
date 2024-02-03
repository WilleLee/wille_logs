"use client";

import React from "react";
import { DefaultButtonProps } from ".";
import styles from "./containedButton.module.scss";

interface Props extends DefaultButtonProps {}

export default function ContainedButton({ children, ...props }: Props) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
