"use client";

import React, { AllHTMLAttributes } from "react";
import Box from "@components/boxes/Box";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  height?: string;
}

export default function LoadingBox({ ...props }: Props) {
  return <Box {...props}>loading....</Box>;
}
