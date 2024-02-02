import HomeContextProvider from "@components/pages/home/HomeContextProvider";
import Tags from "@components/pages/home/Tags";
import Threads from "@components/pages/home/Threads";

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
