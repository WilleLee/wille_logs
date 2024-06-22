import { GlobalPortal } from "@app/global-portal";
import { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const BottomButton = forwardRef(function BottomButton(
  props: Props,
  ref: Ref<HTMLButtonElement>,
) {
  const { children, className, ...rest } = props;
  return (
    <GlobalPortal>
      <button
        ref={ref}
        className={`fixed bottom-0 left-[50%] flex h-[48px] w-full max-w-[520px] -translate-x-[50%] cursor-pointer items-center justify-center rounded-[5px] bg-blue-300 text-grey-100 transition-colors hover:bg-blue-400 disabled:cursor-not-allowed dark:text-grey-800 ${typeof className === "string" ? className : ""}`}
        {...rest}
      >
        {children}
      </button>
    </GlobalPortal>
  );
});

export default BottomButton;
