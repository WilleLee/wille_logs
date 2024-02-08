"use client";

import React, { useState } from "react";
import { tabs } from "./willeTabs";
import Tabs from "./Tabs";
import ContentRenderer from "./ContentRenderer";
import cookies from "@libs/cookies";

export default function WilleContent() {
  const initialTabId = cookies.get("selectedTabId")
    ? Number(cookies.get("selectedTabId"))
    : 0;
  const [selectedTabId, setSelectedTabId] = useState(initialTabId);
  const handleClickTab = (tabNumbeer: number) => {
    setSelectedTabId(tabNumbeer);
    cookies.set("selectedTabId", String(tabNumbeer), 1);
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
