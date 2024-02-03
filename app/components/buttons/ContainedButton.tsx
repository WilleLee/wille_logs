"use client";

import React from "react";
import { DefaultButtonProps } from ".";
import styles from "./containedButton.module.scss";

interface Props extends DefaultButtonProps {}

const ContainedButton = React.memo(function ContainedButton({
  children,
  ...props
}: Props) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
});

export default ContainedButton;
