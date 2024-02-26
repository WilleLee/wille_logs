"use client";

import React, { useEffect } from "react";
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
  useEffect(() => {
    // <meta name="google-adsense-account" content="ca-pub-9395473287553594">
    if (
      typeof process.env.NEXT_PUBLIC_GOOGLE_AD !== "string" ||
      process.env.NEXT_PUBLIC_GOOGLE_AD === ""
    )
      return;
    const head = document.head;
    const existringMeta = head.querySelector(
      "meta[name='google-adsense-account']",
    );
    if (existringMeta) {
      head.removeChild(existringMeta);
    }
    const meta = document.createElement("meta");
    meta.name = "google-adsense-account";
    meta.content = process.env.NEXT_PUBLIC_GOOGLE_AD as string;
    head.appendChild(meta);
  }, []);
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
