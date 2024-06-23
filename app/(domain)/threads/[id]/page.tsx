import Header from "@components/header";
import { getThreadById, getThreads } from "@libs/data";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { Suspense } from "react";

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
      <Suspense fallback={<p>loading...</p>}>
        <Thread id={params.id} />
      </Suspense>
    </>
  );
}

async function Thread({ id }: { id: string }) {
  const { data: thread, isSuccess, error } = await getThreadById(id);

  let isCreator = false;
  const loggedinId = cookies().get("loggedin-id")?.value;

  if (!isSuccess || !thread) {
    return <p>{error}</p>;
  }

  if (loggedinId && thread.creator === loggedinId) {
    isCreator = true;
  }

  return (
    <div>
      <h1>{thread.text}</h1>
      <p>{dayjs(thread.createdAt).format("YYYY.MM.DD")}</p>
      {isCreator && <button>삭제</button>}
    </div>
  );
}
