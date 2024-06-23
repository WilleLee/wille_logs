"use client";

import FormButton from "@components/form-button";
import Text from "@components/text";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-[16px] px-[24px] py-[16px]">
        <Text type="large">알 수 없는 오류가 발생했습니다.</Text>
        <FormButton onClick={() => reset()} fullWidth={false}>
          다시 열기
        </FormButton>
      </div>
    </div>
  );
}
