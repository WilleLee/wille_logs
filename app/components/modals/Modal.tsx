"use client";

import React, { AllHTMLAttributes } from "react";
import styles from "./modal.module.scss";
import TransparentButton from "../buttons/TransparentButton";

export interface DefaultModalProps extends AllHTMLAttributes<HTMLDivElement> {
  handleClose: () => void;
}

interface Props extends AllHTMLAttributes<HTMLDivElement> {
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
        <TransparentButton className={styles.closeButton} onClick={handleClose}>
          취소
        </TransparentButton>
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
}
