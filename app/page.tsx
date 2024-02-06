import HomeContextProvider from "@components/pages/home/HomeContextProvider";
import Tags from "@components/pages/home/Tags";
import Threads from "@components/pages/home/Threads";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   metadataBase: new URL("https://wille-logs.vercel.app"),
//   alternates: {
//     canonical: "/",
//   },
//   openGraph: {
//     title: "Wille logs...",
//     description: "check what Wille logs today",
//     type: "website",
//     images: "/images/avatar128png",
//   },
// };

export default function Page() {
  return (
    <>
      <HomeContextProvider>
        <Tags />
        <Threads />
      </HomeContextProvider>
    </>
  );
}
