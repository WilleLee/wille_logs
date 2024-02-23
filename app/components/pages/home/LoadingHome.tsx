import LoadingBox from "@/components/loading/LoadingBox";
import React from "react";

type Props = {};

export default function LoadingHome({}: Props) {
  return (
    <>
      <LoadingBox />
      <LoadingBox height="128px" />
    </>
  );
}
