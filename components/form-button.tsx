import { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const FormButton = forwardRef(function FormButton(
  props: Props,
  ref: Ref<HTMLButtonElement>,
) {
  const { children, ...rest } = props;
  return (
    <button
      ref={ref}
      className="cursor-pointer disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
    </button>
  );
});

export default FormButton;
