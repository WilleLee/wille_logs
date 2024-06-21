import jwt from "jsonwebtoken";

export async function isAuthenticated(
  accessToken: string,
): Promise<string | undefined> {
  let decodedUserId = undefined;
  const AUTH_SECRET = process.env.AUTH_SECRET as string;

  jwt.verify(accessToken, AUTH_SECRET, function (err, decoded) {
    if (!err) {
      const decodedObj = decoded as { id: string; email: string };
      decodedUserId = decodedObj.id;
    }
  });

  return decodedUserId;
}
