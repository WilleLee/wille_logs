import HomeContextProvider from "@components/pages/home/HomeContextProvider";
import Profile from "@components/pages/home/Profile";
import Tags from "@components/pages/home/Tags";
import Threads from "@components/pages/home/Threads";

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
