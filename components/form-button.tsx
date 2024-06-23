import { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  isError?: boolean;
  desktopOnly?: boolean;
}

const FormButton = forwardRef(function FormButton(
  props: Props,
  ref: Ref<HTMLButtonElement>,
) {
  const {
    children,
    className,
    fullWidth = true,
    isError = false,
    desktopOnly = false,
    ...rest
  } = props;
  return (
    <button
      ref={ref}
      className={`h-[38px] cursor-pointer items-center justify-center rounded-[5px] px-[6px] text-[15px] font-medium text-grey-200 transition-colors active:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-[0.42] dark:text-grey-900 ${typeof className === "string" ? className : ""} ${fullWidth ? "w-full" : ""} ${isError ? "bg-red-400 hover:bg-red-500 active:bg-red-600" : "bg-blue-300 hover:bg-blue-400 active:bg-blue-500"} ${
        desktopOnly ? "hidden xs:inline-flex" : "inline-flex"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
});

export default FormButton;
