import HomeContextProvider from "@/_components/pages/home/HomeContextProvider";
import Profile from "@/_components/pages/home/Profile";
import Tags from "@/_components/pages/home/Tags";
import Threads from "@/_components/pages/home/Threads";

export default function Page() {
  return (
    <>
      <Profile />
      <HomeContextProvider>
        <Tags />
        <Threads />
      </HomeContextProvider>
    </>
  );
}
