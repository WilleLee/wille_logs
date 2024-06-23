import { cookies } from "next/headers";
import { unstable_noStore } from "next/cache";
import HomeHeaderLoggedin from "./home-header-loggedin";
import HomeHeaderPublic from "./home-header-public";

export default async function HomeHeader() {
  unstable_noStore();
  const accessToken = cookies().get("access-token");
  const isLoggedin = !!accessToken;
  return <>{isLoggedin ? <HomeHeaderLoggedin /> : <HomeHeaderPublic />}</>;
}
