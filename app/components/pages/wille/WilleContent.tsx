"use client";

import React, { useState } from "react";
import { tabs } from "./willeTabs";
import Tabs from "./Tabs";
import ContentRenderer from "./ContentRenderer";

export default function WilleContent() {
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
      <ContentRenderer key={selectedTabId} selectedTabId={selectedTabId} />
    </div>
  );
}
