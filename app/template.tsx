"use client";

import React from "react";
import Header from "@components/layouts/Header";
import { RecoilRoot } from "recoil";
import InitScreenMode from "./components/layouts/InitScreenMode";
import InitLanguageMode from "./components/layouts/InitLanguageMode";

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  return (
    <>
      <RecoilRoot>
        <Header />
        <main>{children}</main>
        <InitScreenMode />
        <InitLanguageMode />
      </RecoilRoot>
    </>
  );
}
