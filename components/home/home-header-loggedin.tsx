"use client";

import FormButton from "@components/form-button";
import useInternalRouter from "@hooks/useInternalRouter";
import WriteThreadForm from "./write-thread-form";

export default function HomeHeaderLoggedin() {
  const { push } = useInternalRouter();
  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-[1fr_1fr] items-center">
        <div />
        <FormButton
          onClick={() => push("/my")}
          aria-label="마이 페이지로 이동"
          isError
          fullWidth={false}
        >
          마이 페이지
        </FormButton>
      </div>
      <WriteThreadForm />
    </div>
  );
}
