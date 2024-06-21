import React from "react";
import styles from "./box.module.scss";
import { DefaultBoxProps } from ".";

interface Props extends DefaultBoxProps {
  height?: string;
}

const Box = React.forwardRef(function Box(
  { children, height = "auto", ...props }: Props,
  ref: React.Ref<HTMLDivElement>,
) {
  const className = props.className
    ? `${styles.box} ${props.className}`
    : styles.box;
  return (
    <div {...props} className={className} ref={ref}>
      {children}
    </div>
  );
});

export default Box;
