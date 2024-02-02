"use client";

import React from "react";
import styles from "./modal.module.scss";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  handleClose: () => void;
}

export default function Modal({
  children,
  title,
  handleClose,
  ...props
}: Props) {
  return (
    <div className={styles.modal} onClick={handleClose} {...props}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}
