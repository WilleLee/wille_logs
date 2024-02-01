import React from "react";
import styles from "./modal.module.css";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Modal({ children, ...props }: Props) {
  return (
    <div className={styles.modal} {...props}>
      {children}
    </div>
  );
}
