import React, { ButtonHTMLAttributes } from "react";
import styles from "./buttonWrapper.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ButtonWrapper({ children, ...props }: Props) {
  console.log(props.className);
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
