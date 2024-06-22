import { isEmailFormat } from "@libs/formats";
import { ChangeEvent, useMemo } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

type OptionKey = "email" | "password" | "passwordConfirm" | "nickname";

export default function useRegisterOptions(): Record<
  OptionKey,
  RegisterOptions<any, any>
> {
  const { setError, clearErrors, watch } = useFormContext();
  const { password, passwordConfirm } = watch();

  console.log("c", passwordConfirm);

  return useMemo(
    () => ({
      email: {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value.replace(/\s/g, "");

          if (!e.target.value || e.target.value === "") {
            setError("email", {
              type: "required",
              message: "이메일을 입력해주세요.",
            });
            return;
          }

          if (e.target.value.length < 4 || e.target.value.length > 30) {
            setError("email", {
              type: "pattern",
              message: "이메일은 4자 이상 30자 이하로 입력해주세요.",
            });
            return;
          }

          if (!isEmailFormat(e.target.value)) {
            setError("email", {
              type: "pattern",
              message: "이메일 형식이 올바르지 않습니다.",
            });
            return;
          }

          clearErrors("email");
        },
      },
      password: {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value.replace(/\s/g, "");

          if (!e.target.value || e.target.value === "") {
            setError("password", {
              type: "required",
              message: "비밀번호를 입력해주세요.",
            });
            return;
          }

          if (passwordConfirm !== undefined) {
            if (passwordConfirm !== "" && passwordConfirm !== e.target.value) {
              setError("passwordConfirm", {
                type: "validate",
                message: "비밀번호가 일치하지 않습니다.",
              });
            }

            if (passwordConfirm === e.target.value) {
              clearErrors("passwordConfirm");
            }
          }

          if (e.target.value.length < 6 || e.target.value.length > 20) {
            setError("password", {
              type: "pattern",
              message: "비밀번호는 6자 이상 20자 이하로 입력해주세요.",
            });
            return;
          }

          clearErrors("password");
        },
      },
      passwordConfirm: {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value.replace(/\s/g, "");

          if (password !== e.target.value) {
            setError("passwordConfirm", {
              type: "validate",
              message: "비밀번호가 일치하지 않습니다.",
            });
            return;
          }

          clearErrors("passwordConfirm");
        },
      },
      nickname: {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value.replace(/^\s+/, "");

          if (!e.target.value || e.target.value === "") {
            setError("nickname", {
              type: "required",
              message: "닉네임을 입력해주세요.",
            });
            return;
          }

          if (e.target.value.length < 2 || e.target.value.length > 10) {
            setError("nickname", {
              type: "pattern",
              message: "닉네임은 2자 이상 10자 이하로 입력해주세요.",
            });
            return;
          }

          clearErrors("nickname");
        },
      },
    }),
    [clearErrors, setError, password, passwordConfirm],
  );
}
