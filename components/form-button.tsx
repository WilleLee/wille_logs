import { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const FormButton = forwardRef(function FormButton(
  props: Props,
  ref: Ref<HTMLButtonElement>,
) {
  const { children, className, ...rest } = props;
  return (
    <button
      ref={ref}
      className={`flex h-[38px] w-full cursor-pointer items-center justify-center rounded-[5px] bg-blue-300 text-grey-100 transition-colors hover:bg-blue-400 disabled:cursor-not-allowed dark:text-grey-800 ${typeof className === "string" ? className : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
});

export default FormButton;
