import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./_globals.scss";
import { GoogleAnalytics } from "@next/third-parties/google";
import InitWrapper from "./components/layouts/InitWrapper";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"], display: "swap" });

const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

const ogBaseUrl =
  process.env.NEXT_PUBLIC_MODE === "production"
    ? "https://wille-logs.vercel.app"
    : "https://wille-logs-git-dev-willelee.vercel.app";

export const metadata: Metadata = {
  title: "Wille logs...",
  description: "check what Wille logs today",
  authors: [
    {
      name: "Inpyo Lee (Wille)",
      url: "https://github.com/WilleLee",
    },
  ],
  creator: "Inpyo Lee",
  publisher: "Inpyo Lee",
  keywords: [
    "wille",
    "book",
    "blog",
    "resumé",
    "typescript",
    "next",
    "react",
    "vercel",
  ],
  twitter: {
    card: "summary_large_image",
    images: [ogBaseUrl + "/images/avatar128.png"],
  },
  openGraph: {
    title: "Wille logs... - daily insights from books",
    description: "check what Wille logs today",
    type: "website",
    images: ogBaseUrl + "/images/avatar128.png",
    url: ogBaseUrl,
  },
};

export const viewport: Viewport = {
  themeColor: "#101010",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        suppressHydrationWarning={true}
        className={`${notoSansKR.className} dark`}
      >
        <InitWrapper>{children}</InitWrapper>
      </body>
      {gaId.length > 0 && process.env.NODE_ENV === "production" ? (
        <GoogleAnalytics gaId={gaId} />
      ) : null}
    </html>
  );
}
