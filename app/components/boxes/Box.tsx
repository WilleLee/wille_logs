import React, { AllHTMLAttributes } from "react";
import styles from "./box.module.scss";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  height?: string;
}

export default function Box({ children, height = "auto" }: Props) {
  return (
    <div style={{ height }} className={styles.box}>
      {children}
    </div>
  );
}
