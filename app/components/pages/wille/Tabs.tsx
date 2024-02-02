"use client";

import TransparentButton from "@/components/buttons/TransparentButton";
import { AllHTMLAttributes } from "react";
import styles from "./tabs.module.scss";

export interface ITab {
  id: number;
  name: string;
}

interface TabsProps extends AllHTMLAttributes<HTMLDivElement> {
  handleClickTab: (tabNumber: number) => void;
  tabs: ITab[];
  selectedTabId: number;
}

export default function Tabs({
  handleClickTab,
  tabs,
  selectedTabId,
  ...props
}: TabsProps) {
  return (
    <div className={styles.wrapper} {...props}>
      {tabs.map((tab) => {
        return (
          <TransparentButton
            onClick={() => handleClickTab(tab.id)}
            aria-label={tab.name}
            key={tab.id}
            className={
              selectedTabId === tab.id
                ? `${styles.button} ${styles.active}`
                : styles.button
            }
          >
            {tab.name}
          </TransparentButton>
        );
      })}
      <div
        style={{
          left: `${100 * (selectedTabId / tabs.length)}%`,
        }}
        className={styles.activeBorder}
      />
    </div>
  );
}
