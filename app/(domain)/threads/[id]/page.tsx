import { getThreadById, getThreads } from "@libs/data";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Thread",
};

export async function generateStaticParams() {
  const threadsData = await getThreads();

  if (threadsData.isSuccess && threadsData.data !== null) {
    return threadsData.data.map((thread) => ({
      id: thread._id,
    }));
  }
}

export default async function ThreadPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <>
      <Suspense fallback={<p>loading...</p>}>
        <Thread id={id} />
      </Suspense>
    </>
  );
}

async function Thread({ id }: { id: string }) {
  const { data, isSuccess, error } = await getThreadById(id);

  if (!isSuccess || data === null) {
    return <p>{error}</p>;
  }

  return <>{data.text}</>;
}
