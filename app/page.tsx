import HomeContextProvider from "@components/pages/home/HomeContextProvider";
import Home from "@components/pages/home/Home";

export default function Page() {
  return (
    <>
      <HomeContextProvider>
        <Home />
      </HomeContextProvider>
    </>
  );
}
