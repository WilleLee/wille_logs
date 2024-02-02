"use client";

import TransparentButton from "@/components/buttons/TransparentButton";
import { AllHTMLAttributes } from "react";

export interface ITab {
  id: number;
  name: string;
}

interface TabsProps extends AllHTMLAttributes<HTMLButtonElement> {
  handleClickTab: (tabNumber: number) => void;
  tabs: ITab[];
  selectedTabId: number;
}

export default function Tabs({
  handleClickTab,
  tabs,
  selectedTabId,
}: TabsProps) {
  return (
    <div>
      {tabs.map((tab) => {
        return (
          <TransparentButton
            onClick={() => handleClickTab(tab.id)}
            aria-label={tab.name}
            key={tab.id}
          >
            {tab.name}
          </TransparentButton>
        );
      })}
    </div>
  );
}
