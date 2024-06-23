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
  const { label, error, ...rest } = props;

  return (
    <div className="my-[8px] flex w-full flex-col">
      <label
        htmlFor={id}
        className="mb-[6px] inline-flex items-center text-[12px] font-medium text-grey-700 dark:text-grey-400"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={`inline-flex h-[32px] items-center rounded-[5px] border-2 border-solid bg-transparent px-[6px] text-[15px] font-normal text-grey-900 focus:outline-none dark:text-grey-200 ${error ? "border-red-400 caret-red-400 focus:border-red-400" : "border-transparent caret-blue-300 focus:border-blue-300"}`}
        {...rest}
      />
      {error && (
        <span className="mt-[4px] inline-flex items-center text-[14px] font-medium leading-normal text-red-400">
          {error}
        </span>
      )}
    </div>
  );
});

export default FormInput;
