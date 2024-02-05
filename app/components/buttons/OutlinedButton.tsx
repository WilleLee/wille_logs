"use client";

import React from "react";
import { DefaultButtonProps } from ".";
import styles from "./outlinedButton.module.scss";

interface Props extends DefaultButtonProps {}

const OutlinedButton = React.memo(function OutlinedButton({
  children,
  ...props
}: Props) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
});

export default OutlinedButton;
