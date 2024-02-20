"use client";

import { DefaultBoxProps } from ".";
import styles from "./threadedBox.module.scss";

interface ThreadedBoxProps extends DefaultBoxProps {
  withImage?: boolean;
}

export default function ThreadedBox({
  withImage = true,
  children,
  ...props
}: ThreadedBoxProps) {
  return (
    <div
      {...props}
      className={withImage ? `${styles.box} ${styles.withImage}` : styles.box}
    >
      {children}
    </div>
  );
}
