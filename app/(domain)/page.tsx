import Header from "@components/header";
import HomeHeader from "@components/home/home-header";
import TagProvider from "@components/home/tag-provider";
import Tags from "@components/home/tags";
import Threads from "@components/home/threads";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <Header />
      <HomeHeader />
      <TagProvider>
        <Suspense fallback={<p>loading...</p>}>
          <Tags />
        </Suspense>
        <Suspense fallback={<p>loading...</p>}>
          <Threads />
        </Suspense>
      </TagProvider>
    </>
  );
}
