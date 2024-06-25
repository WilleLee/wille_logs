import Header from "@components/header";
import { ThreadSkeleton } from "@components/home/skeletons";
import Thread from "@components/thread/thread";
import { getThreadById, getThreads } from "@libs/data";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { data: thread, isSuccess } = await getThreadById(params.id);

  if (!isSuccess || !thread) {
    return {
      title: "스레드",
    };
  }

  return {
    title: "스레드",
    keywords: [thread.book.title, thread.book.author].join(","),
  };
}

export async function generateStaticParams() {
  const { data: threads, isSuccess } = await getThreads();

  if (!isSuccess || !threads) {
    return [];
  }

  if (threads.length === 0) {
    return [];
  }

  return threads.map((thread) => ({
    id: thread._id,
  }));
}

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <Header />
      <Suspense fallback={<ThreadSkeleton />}>
        <Thread id={params.id} />
      </Suspense>
    </>
  );
}
