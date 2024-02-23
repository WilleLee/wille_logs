"use client";

import React from "react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import Header from "@components/layouts/Header";
import InitScreenMode from "@components/layouts/InitScreenMode";
import InitLanguageMode from "@components/layouts/InitLanguageMode";

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  return (
    <>
      <RecoilRoot>
        <SWRConfig
          value={{
            refreshInterval: 30000,
            dedupingInterval: 30000,
            revalidateOnFocus: false,
          }}
        >
          <Header />
          <main>{children}</main>
          <InitScreenMode />
          <InitLanguageMode />
        </SWRConfig>
      </RecoilRoot>
    </>
  );
}
