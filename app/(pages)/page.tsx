import useThreads from "./useThreads";

export default function Page() {
  const { threads } = useThreads();
  return (
    <div>
      <h2>threads</h2>
      {threads.length > 0 ? (
        <ul>
          {threads.map((thread) => (
            <li key={thread._id}>{thread.book.title}</li>
          ))}
        </ul>
      ) : (
        <p>no thread&rsquo;s found</p>
      )}
    </div>
  );
}
