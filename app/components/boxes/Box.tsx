import React, { CSSProperties } from "react";
import styles from "./box.module.scss";
import { DefaultBoxProps } from ".";

interface Props extends DefaultBoxProps {
  height?: string;
}

const Box = React.forwardRef(function Box(
  { children, height = "auto", ...props }: Props,
  ref: React.Ref<HTMLDivElement>,
) {
  // const boxStyles: CSSProperties = {
  //   height,
  //   width: "100%",
  //   margin: "3px",
  //   padding: "var(--default-padding)",
  //   backgroundColor: "rgb(var(--background))",
  //   border: "var(--box-border)",
  //   borderRadius: "var(--box-border-radius)",
  // };
  const className = props.className
    ? `${styles.box} ${props.className}`
    : styles.box;
  return (
    <div
      //style={boxStyles}
      {...props}
      className={className}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default Box;
