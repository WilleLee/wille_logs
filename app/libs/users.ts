import cookies from "@libs/cookies";

const users = {
  login: (accessToken: string) => {
    if (!accessToken || typeof accessToken !== "string") return;
    cookies.set("accessToken", accessToken, 1);
  },
  isLoggedIn: () => {
    const accessToken = cookies.get("accessToken");
    return typeof accessToken === "string" && accessToken.length > 0;
  },
};

export default users;
