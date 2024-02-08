"use client";

import React, { useEffect, useState } from "react";
import { tabs } from "./willeTabs";
import Tabs from "./Tabs";
import ContentRenderer from "./ContentRenderer";
import cookies from "@libs/cookies";

export default function WilleContent() {
  // const initialTabId = cookies.get("selectedTabId")
  //   ? Number(cookies.get("selectedTabId"))
  //   : 0;
  const [selectedTabId, setSelectedTabId] = useState(0);
  const handleClickTab = (tabNumbeer: number) => {
    setSelectedTabId(tabNumbeer);
    cookies.set("selectedTabId", String(tabNumbeer), 1);
  };

  useEffect(() => {
    // initialize selectedTabId from cookies
    const initialTabId = cookies.get("selectedTabId");
    if (initialTabId) {
      setSelectedTabId(Number(initialTabId));
    }
  }, []);

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
