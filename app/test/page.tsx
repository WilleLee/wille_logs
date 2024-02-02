"use client";

import TransparentButton from "@/components/buttons/TransparentButton";
import cookies from "@libs/cookies";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return (
    <div>
      <TransparentButton onClick={() => cookies.set("cookie1", "value", 30)}>
        set cookie 1
      </TransparentButton>
      <TransparentButton onClick={() => cookies.set("cookie2", "value", 30)}>
        set cookie 2
      </TransparentButton>
      <TransparentButton onClick={() => cookies.delete("cookie1")}>
        delete cookie 1
      </TransparentButton>
    </div>
  );
}
