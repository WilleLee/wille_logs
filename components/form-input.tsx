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
    <div className="w-full">
      <label
        htmlFor={id}
        className="border-transparent inline-block w-full rounded-[10px] border-0 border-solid px-[12px] py-[6px] text-[15px] font-medium text-grey-700"
      >
        <div className="grid grid-cols-[120px_1fr]">
          <span className="flex items-center">{label}</span>
          <input
            id={id}
            ref={ref}
            className="flex items-center px-[8px] py-[4px] font-medium text-grey-800 outline-none"
            {...rest}
          />
        </div>
        {error && (
          <div>
            <span style={{ color: "red" }}>{error}</span>
          </div>
        )}
      </label>
    </div>
  );
});

export default FormInput;
