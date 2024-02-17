import Profile from "@/components/pages/wille/Profile";
import WilleContent from "@/components/pages/wille/WilleContent";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Resumé - Wille logs",
  description: "browse Wille's resumé (careers, projects and skills)",
};

export default function Page() {
  return (
    <>
      <Profile />
      <WilleContent />
    </>
  );
}
