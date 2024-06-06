import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PortalProvider } from "./global-portal";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME?.replace("_", " ")}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          <PortalProvider>{children}</PortalProvider>
        </Layout>
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-auto min-h-screen w-full max-w-full overflow-x-hidden bg-background text-grey-800 dark:bg-darkBackground dark:text-grey-100">
      <div className="mx-auto my-0 w-full max-w-[520px] px-[8px] py-[16px]">
        {children}
      </div>
    </div>
  );
}
