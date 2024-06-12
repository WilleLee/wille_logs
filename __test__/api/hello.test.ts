import { GET } from "@api/route";
import { expect, test } from "vitest";

test("GET", async () => {
  const data = await (await GET()).json();
  expect(data?.hello).toStrictEqual("world");
});
