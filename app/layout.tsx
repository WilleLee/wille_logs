import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./_globals.scss";
import { GoogleAnalytics } from "@next/third-parties/google";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"], display: "swap" });

const gaId = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "Wille logs",
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
    images: "https://wille-logs.vercel.app/images/avatar128.png",
  },
  openGraph: {
    title: "Wille logs...",
    description: "check what Wille logs today",
    type: "website",
    images: ["https://wille-logs.vercel.app/images/avatar128.png"],
    url: "https://wille-logs.vercel.app/",
  },
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
      {gaId.length > 0 && process.env.NODE_ENV === "production" ? (
        <GoogleAnalytics gaId={gaId} />
      ) : null}
    </html>
  );
}
