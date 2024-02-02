"use client";

import React, { AllHTMLAttributes, useState } from "react";
import { tabs } from "./willeTabs";
import Tabs from "./Tabs";
import ContentRenderer from "./ContentRenderer";

type Props = {};

export default function WilleContent({}: Props) {
  const [selectedTabId, setSelectedTabId] = useState(0);
  const handleClickTab = (tabNumbeer: number) => {
    setSelectedTabId(tabNumbeer);
  };
  return (
    <div>
      {/* tab */}
      <Tabs
        handleClickTab={handleClickTab}
        tabs={tabs}
        selectedTabId={selectedTabId}
      />
      {/* contents */}
      <ContentRenderer selectedTabId={selectedTabId} />
    </div>
  );
}
