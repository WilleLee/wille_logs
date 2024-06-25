import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { PortalProvider } from "./global-portal";
import { ReactNode } from "react";
import ThemeInitializer from "./theme-initializer";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#17171c" },
  ],
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${process.env.NEXT_PUBLIC_APP_NAME?.replace("_", " ")}`,
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME?.replace("_", " ")}`,
  },
  description: "빌레는 오늘 어떤 책을 읽었을까?",
  keywords: [
    "책",
    "독서",
    "독후감",
    "넥스트",
    "Next.js",
    "리액트",
    "React",
    "프론트엔드",
    "Frontend",
  ],
  appleWebApp: {
    capable: true,
    title: "Wille logs",
  },
  authors: [
    {
      name: "Inpyo Lee",
      url: "https://github.com/WilleLee",
    },
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "Wille logs...",
    description: "빌레는 오늘 어떤 책을 읽었을까?",
    url: "https://wille-logs.vercel.app",
    siteName: "Wille logs",
    images: [
      {
        url: "https://wille-logs.vercel.app/og-image.png", //1686 882
        width: 1686,
        height: 882,
        alt: "Wille logs",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKR.className} bg-background dark:bg-darkBackground`}
        suppressHydrationWarning={true}
      >
        <Layout>
          <PortalProvider>{children}</PortalProvider>
        </Layout>
        <ThemeInitializer />
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-auto min-h-screen w-full max-w-full overflow-x-hidden text-grey-800 dark:text-grey-100">
      <div className="mx-auto my-0 w-full max-w-[520px] px-[8px] py-[64px]">
        {children}
      </div>
    </div>
  );
}
