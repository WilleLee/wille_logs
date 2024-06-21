"use client";

import React from "react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import Header from "./Header";
import InitScreenMode from "./InitScreenMode";
import InitLanguageMode from "./InitLanguageMode";
import InitDefaultLoading from "./InitDefaultLoading";

type Props = {
  children: React.ReactNode;
};

export default function InitWrapper({ children }: Props) {
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
          <InitDefaultLoading />
        </SWRConfig>
      </RecoilRoot>
    </>
  );
}
