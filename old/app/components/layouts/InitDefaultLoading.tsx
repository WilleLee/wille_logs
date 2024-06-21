"use client";

import { isDefaultLoadingState } from "@/atoms/isDefaultLoadingState";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function InitDefaultLoading() {
  const isDefaultLoading = useRecoilValue(isDefaultLoadingState);
  const setIsDefaultLoading = useSetRecoilState(isDefaultLoadingState);
  console.log("InitDefaultLoading", isDefaultLoading);
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setIsDefaultLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [setIsDefaultLoading]);

  return null;
}
