import React, { AllHTMLAttributes } from "react";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  selectedTabId: number;
}

export default function ContentRenderer({ selectedTabId, ...props }: Props) {
  return <div {...props}>{selectedTabId}</div>;
}
