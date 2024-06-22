import { isEmailFormat } from "@libs/formats";
import { describe, expect, test } from "vitest";

describe("formats", () => {
  test("isEmail", () => {
    expect(isEmailFormat("aaa@ee.com")).toBeTruthy();
    expect(isEmailFormat("")).not.toBeTruthy();
    expect(isEmailFormat("aaa")).not.toBeTruthy();
    expect(isEmailFormat("@aaa.com")).not.toBeTruthy();
    expect(isEmailFormat("aaa@a@aa.com")).not.toBeTruthy();
    expect(isEmailFormat("a@aaa.com")).not.toBeTruthy();
    expect(isEmailFormat("aaa@c")).not.toBeTruthy();
    expect(isEmailFormat("aaa@a.c")).not.toBeTruthy();
    expect(isEmailFormat("aaa@aa.aca.ddd")).not.toBeTruthy();
  });
});
