"use client";

import React, { AllHTMLAttributes } from "react";
import Box from "@components/boxes/Box";
import styles from "./loadingBox.module.scss";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  height?: string;
}

export default function LoadingBox({ ...props }: Props) {
  return (
    <div className={styles.wrapper}>
      <Box className={styles.box} {...props}>
        loading....
      </Box>
    </div>
  );
}
