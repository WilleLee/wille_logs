import React from "react";
import styles from "./box.module.scss";
import { DefaultBoxProps } from ".";

interface Props extends DefaultBoxProps {
  height?: string;
}

export default function Box({ children, height = "auto" }: Props) {
  return (
    <div style={{ height }} className={styles.box}>
      {children}
    </div>
  );
}
