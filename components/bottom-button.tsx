import { GlobalPortal } from "@app/global-portal";
import { ButtonHTMLAttributes, ReactNode, Ref, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  mobileOnly?: boolean;
}

const BottomButton = forwardRef(function BottomButton(
  props: Props,
  ref: Ref<HTMLButtonElement>,
) {
  const { children, className, mobileOnly = false, ...rest } = props;
  return (
    <GlobalPortal>
      <button
        ref={ref}
        className={`fixed bottom-0 left-[50%] h-[48px] w-full max-w-[520px] -translate-x-[50%] cursor-pointer items-center justify-center rounded-[5px] bg-blue-300 text-[15px] font-medium text-grey-200 transition-colors hover:bg-blue-400 active:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-[0.42] dark:text-grey-900 ${typeof className === "string" ? className : ""} ${
          mobileOnly ? "inline-flex xs:hidden" : "inline-flex"
        }`}
        {...rest}
      >
        {children}
      </button>
    </GlobalPortal>
  );
});

export default BottomButton;
