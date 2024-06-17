"use client";

import { InputHTMLAttributes, Ref, forwardRef, useId } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = forwardRef(function FormInput(
  props: Props,
  ref: Ref<HTMLInputElement>,
) {
  const id = useId();
  const { label, error = null, ...rest } = props;

  return (
    <label htmlFor={id}>
      <div>
        <span>{label}</span>
        <input id={id} ref={ref} {...rest} />
      </div>
      {error && (
        <div>
          <span style={{ color: "red" }}>{error}</span>
        </div>
      )}
    </label>
  );
});

export default FormInput;
