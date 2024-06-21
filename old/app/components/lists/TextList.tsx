"use client";

import React, { AllHTMLAttributes } from "react";
import styles from "./textList.module.scss";

interface TextListProps extends AllHTMLAttributes<HTMLUListElement> {
  items: string[];
}

const TextList = React.memo(function TextList({
  items,
  ...props
}: TextListProps) {
  return (
    <ul className={styles.list} {...props}>
      {items.map((item, index) => (
        <li key={index} className={styles.item}>
          &bull; {item}
        </li>
      ))}
    </ul>
  );
});

export default TextList;
