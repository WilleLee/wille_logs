"use client";

import { AllHTMLAttributes, InputHTMLAttributes, forwardRef } from "react";
import styles from "./form.module.scss";

interface FormProps extends AllHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export default function Form({ children, ...props }: FormProps) {
  return (
    <form className={styles.form} {...props}>
      {children}
    </form>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

Form.Input = forwardRef(function Input(
  { ...props }: InputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input className={styles.input} ref={ref} {...props} />
      <div className={styles.inputBorder} />
    </div>
  );
});
