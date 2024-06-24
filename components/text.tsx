import clsx from "clsx";
import { AllHTMLAttributes, ReactNode } from "react";

interface Props extends AllHTMLAttributes<HTMLSpanElement> {
  type?: "small" | "medium" | "large" | "meta";
  textWrap?: boolean;
  children: ReactNode;
  align?: "left" | "center" | "right";
}

export default function Text(props: Props) {
  const {
    children,
    className,
    textWrap = false,
    type = "medium",
    align = "left",
    ...rest
  } = props;
  return (
    <span
      className={clsx(
        "block w-auto",
        {
          "w-full overflow-hidden text-ellipsis text-nowrap": textWrap,
          "text-[10px] font-semibold": type === "small",
          "text-[15px] font-light": type === "medium",
          "text-[20px] font-normal": type === "large",
          "text-[12px] font-light text-grey-600 dark:text-grey-400":
            type === "meta",
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
