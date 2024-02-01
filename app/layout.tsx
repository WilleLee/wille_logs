import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"], display: "swap" });

const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "Wille logs",
  description: "what Wille logs today",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true} className={notoSansKR.className}>
        {children}
      </body>
      {gaId.length > 0 && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
