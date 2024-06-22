import Header from "@components/header";
import HomeHeader from "@components/home/home-header";
import { TagsSkeleton, ThreadsSkeleton } from "@components/home/skeletons";
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
        <TagsSkeleton />
        <Suspense fallback={<TagsSkeleton />}>
          <Tags />
        </Suspense>
        <ThreadsSkeleton />
        <Suspense fallback={<ThreadsSkeleton />}>
          <Threads />
        </Suspense>
      </TagProvider>
    </>
  );
}
