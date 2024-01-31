import HomeContextProvider from "./HomeContextProvider";
import Tags from "./Tags";
import Threads from "./Threads";

export default function Page() {
  return (
    <div>
      <h2>threads</h2>
      <HomeContextProvider>
        <Tags />
        <Threads />
      </HomeContextProvider>
    </div>
  );
}
