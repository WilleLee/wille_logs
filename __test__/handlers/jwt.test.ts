import jwt from "jsonwebtoken";
import { expect, test } from "vitest";

test("jwt", async () => {
  let decodedUserId = undefined;
  const AUTH_SECRET = process.env.AUTH_SECRET as string;
  const info = {
    id: "1234",
    email: "aaa@bbb.com",
  };
  const token = jwt.sign(info, AUTH_SECRET, {
    expiresIn: "1h",
  });
  jwt.verify(token, AUTH_SECRET, function (err, decoded) {
    if (err) {
      console.error(err);
    } else {
      const d = decoded as { id: string; email: string };
      decodedUserId = d.id;
    }
  });
  expect(decodedUserId).toStrictEqual("1234");
});
