"use client";

import React, { useEffect, useMemo, useState } from "react";
import useTags from "@/hooks/useTags";
import useThreads from "@/hooks/useThreads";
import { homeActions, useHome, useHomeDispatch } from "./HomeContextProvider";
import LoadingHome from "./LoadingHome";
import Tags from "./Tags";
import Threads from "./Threads";
import { useRecoilValue } from "recoil";
import { isDefaultLoadingState } from "@/atoms/isDefaultLoadingState";

export default function Home() {
  // const [defaultLoading, setDefaultLoading] = useState(true);
  const isDefaultLoading = useRecoilValue(isDefaultLoadingState);
  const { tags, status: tagsStatus } = useTags();
  const { threads, status: threadsStatus } = useThreads();
  const { isHomeReady } = useHome();
  const homeDispatch = useHomeDispatch();

  const isReady = useMemo(
    () => tagsStatus === "success" && threadsStatus === "success",
    [tagsStatus, threadsStatus],
  );

  // useEffect(() => {
  //   let timeoutId = setTimeout(() => {
  //     setDefaultLoading(false);
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  useEffect(() => {
    if (!isDefaultLoading && isHomeReady !== isReady) {
      homeDispatch(homeActions.setIsHomeReady(isReady));
    }
  }, [isReady, isHomeReady, homeDispatch, isDefaultLoading]);

  return (
    <>
      {isHomeReady ? (
        <>
          <Tags tags={tags} />
          <Threads threads={threads} />
        </>
      ) : (
        <LoadingHome />
      )}
    </>
  );
}
