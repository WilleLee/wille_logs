"use client";

import { DefaultBoxProps } from ".";
import styles from "./threadedBox.module.scss";

interface ThreadedBoxProps extends DefaultBoxProps {
  withImage?: boolean;
}

export default function ThreadedBox({
  withImage = true,
  children,
}: ThreadedBoxProps) {
  return (
    <div
      className={withImage ? `${styles.box} ${styles.withImage}` : styles.box}
    >
      {children}
    </div>
  );
}
