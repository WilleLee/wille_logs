import { GlobalPortal } from "@app/global-portal";
import Header from "@components/header";
import { specials } from "@libs/formats";
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  forwardRef,
} from "react";

export default function PlaygroundPage() {
  return (
    <>
      <Header />
      <h1>Playground</h1>
      <div>
        <PButton fullWidth={false}>button</PButton>
        <PButton>button</PButton>
        <PButton disabled>button</PButton>
        <PButton isError>button</PButton>
        <PButton isError disabled>
          button
        </PButton>
      </div>
      <div>
        <PInput label="test0" placeholder="placeholder" />
        <PInput
          label="test1"
          placeholder="placeholder"
          error={`비밀번호는 영문 대소문자, 숫자, 특수문자(${specials.join("")})를 포함해야합니다.`}
        />
      </div>
      <PBottomButton>bottom button</PBottomButton>
    </>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PInput = forwardRef(function PInput(
  props: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  const { label, error, ...rest } = props;
  return (
    <div className="my-[8px] flex w-full flex-col">
      <label className="mb-[6px] inline-flex items-center text-[12px] font-medium text-grey-700 dark:text-grey-400">
        {label}
      </label>
      <input
        ref={ref}
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

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isError?: boolean;
  fullWidth?: boolean;
}

const PButton = forwardRef(function PButton(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const {
    children,
    fullWidth = true,
    isError = false,
    className,
    ...rest
  } = props;
  return (
    <button
      ref={ref}
      className={`inline-flex h-[38px] cursor-pointer items-center justify-center rounded-[5px] px-[6px] text-[15px] font-medium text-grey-200 transition-colors active:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-[0.42] dark:text-grey-900 ${typeof className === "string" ? className : ""} ${fullWidth ? "w-full" : ""} ${isError ? "bg-red-400 hover:bg-red-500 active:bg-red-600" : "bg-blue-300 hover:bg-blue-400 active:bg-blue-500"}`}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
});

interface BottomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const PBottomButton = forwardRef(function PBottomButton(
  props: BottomButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const { children, className, ...rest } = props;
  return (
    <GlobalPortal>
      <button
        ref={ref}
        className={`fixed bottom-0 left-[50%] inline-flex h-[48px] w-full max-w-[520px] -translate-x-[50%] cursor-pointer items-center justify-center rounded-[5px] bg-blue-300 text-[15px] font-medium text-grey-200 transition-colors hover:bg-blue-400 active:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-[0.42] dark:text-grey-900 ${typeof className === "string" ? className : ""}`}
        {...rest}
      >
        <span>{children}</span>
      </button>
    </GlobalPortal>
  );
});
