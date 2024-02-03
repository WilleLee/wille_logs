"use client";

import {
  AllHTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
} from "react";
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

Form.Input = function Input({ ...props }: InputProps) {
  return <input {...props} />;
};

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

Form.Submit = function Submit({ children, ...props }: SubmitProps) {
  return <button {...props}>{children}</button>;
};
