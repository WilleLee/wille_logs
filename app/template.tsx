"use client";

import usePingpong from "@/_hooks/usePingpong";
import Image from "next/image";
import React from "react";
import avatar from "@assets/avatar_128.png";

interface Props {
  children: React.ReactNode;
}

const Template = ({ children }: Props) => {
  const { status } = usePingpong();
  return (
    <>
      {status === "success" ? (
        <main>{children}</main>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Image src={avatar} alt="loading image" priority />
          <p>Wille logs&hellip;</p>
        </div>
      )}
    </>
  );
};

export default Template;
