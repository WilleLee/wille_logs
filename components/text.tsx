import clsx from "clsx";
import { AllHTMLAttributes, ReactNode } from "react";

interface Props extends AllHTMLAttributes<HTMLSpanElement> {
  type?: "small" | "medium" | "large";
  textWrap?: boolean;
  children: ReactNode;
}

export default function Text(props: Props) {
  const {
    children,
    className,
    textWrap = false,
    type = "medium",
    ...rest
  } = props;
  return (
    <span
      className={clsx(
        "inline-flex items-center",
        {
          "text-ellipsis text-nowrap": textWrap,
          "text-[10px] font-semibold": type === "small",
          "text-[15px] font-light": type === "medium",
          "text-[20px] font-normal": type === "large",
        },
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
