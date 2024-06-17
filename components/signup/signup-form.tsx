"use client";

import FormInput from "@components/form-input";
import { signup } from "@libs/actions";
import { isEmailFormat } from "@libs/formats";
import { redirect } from "next/navigation";
import {
  ChangeEvent,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function SignupForm() {
  return (
    <>
      <Controller>
        <FormWrapper>
          <>
            <FormInputs />
            <SignupButton />
          </>
        </FormWrapper>
      </Controller>
    </>
  );
}

type Status = "idle" | "pending" | "success" | "error";

interface IContext {
  status: Status;
  error?: string;
  isSubmitDisabled: boolean;
  errorMessage: string | null;
  handleAction: (formData: FormData) => void;
}

const SignupFormContext = createContext<IContext | null>(null);

function Controller({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const methods = useForm({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
      secret: "",
    },
  });

  const handleAction = useCallback(async (formData: FormData) => {
    setStatus("pending");
    const result = await signup(formData);
    if (result.isError) {
      setStatus("error");
      setErrorMessage(result?.error || "회원가입에 실패했습니다.");
    } else {
      redirect("/login");
    }
  }, []);

  const isSubmitDisabled = useMemo(() => {
    if (status === "pending") {
      return true;
    }
    if (Object.values(methods.getValues()).some((value) => !value)) {
      return true;
    }
    if (Object.keys(methods.formState.errors).length > 0) {
      return true;
    }
    return false;
  }, [methods, status]);

  return (
    <SignupFormContext.Provider
      value={{ status, isSubmitDisabled, errorMessage, handleAction }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </SignupFormContext.Provider>
  );
}

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const context = useContext(SignupFormContext);
  if (!context) return null;

  const { handleAction } = context;
  return <form action={handleAction}>{children}</form>;
};

const FormInputs = () => {
  const context = useContext(SignupFormContext);
  const {
    register,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext<{
    email: string;
    nickname: string;
    password: string;
    passwordConfirm: string;
    secret: string;
  }>();
  const { password } = watch();

  if (!context) return null;

  return (
    <>
      <FormInput
        label="이메일"
        data-testid="email-input"
        type="text"
        placeholder="이메일을 입력해주세요."
        minLength={4}
        maxLength={30}
        error={errors.email?.message}
        required
        {...register("email", {
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            event.target.value = event.target.value.replace(/\s/g, "");
            if (event.target.value.length < 4) {
              setError("email", {
                type: "minLength",
                message: "4자 이상 입력해주세요.",
              });
              return;
            }

            if (event.target.value.length > 30) {
              setError("email", {
                type: "maxLength",
                message: "30자 이하로 입력해주세요.",
              });
              return;
            }

            if (!isEmailFormat(event.target.value)) {
              setError("email", {
                type: "format",
                message: "올바른 이메일 형식이 아닙니다.",
              });
              return;
            }

            clearErrors("email");
          },
        })}
      />
      <FormInput
        label="닉네임"
        data-testid="nickname-input"
        type="text"
        placeholder="닉네임을 입력해주세요."
        minLength={2}
        maxLength={10}
        error={errors.nickname?.message}
        required
        {...register("nickname", {
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(/\s/g, "");

            if (e.target.value.length < 2) {
              setError("nickname", {
                type: "minLength",
                message: "2자 이상 입력해주세요.",
              });
              return;
            }

            if (e.target.value.length > 10) {
              setError("nickname", {
                type: "maxLength",
                message: "10자 이하로 입력해주세요.",
              });
              return;
            }

            clearErrors("nickname");
          },
        })}
      />
      <FormInput
        label="비밀번호"
        error={errors.password?.message}
        data-testid="password-input"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        minLength={6}
        maxLength={20}
        required
        {...register("password", {
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(/\s/g, "");

            setValue("passwordConfirm", "");

            if (e.target.value.length < 6) {
              setError("password", {
                type: "minLength",
                message: "6자 이상 입력해주세요.",
              });
              return;
            }

            if (e.target.value.length > 20) {
              setError("password", {
                type: "maxLength",
                message: "20자 이하로 입력해주세요.",
              });
              return;
            }

            clearErrors("password");
          },
        })}
      />
      <FormInput
        label="비밀번호 재입력"
        error={errors.passwordConfirm?.message}
        data-testid="password-confirm-input"
        type="password"
        placeholder="동일한 비밀번호를 다시 입력해주세요."
        minLength={6}
        maxLength={20}
        required
        {...register("passwordConfirm", {
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(/\s/g, "");

            if (e.target.value !== password) {
              setError("passwordConfirm", {
                type: "validate",
                message: "비밀번호가 일치하지 않습니다.",
              });
              return;
            }

            if (e.target.value.length < 6) {
              setError("passwordConfirm", {
                type: "minLength",
                message: "6자 이상 입력해주세요.",
              });
              return;
            }

            if (e.target.value.length > 20) {
              setError("passwordConfirm", {
                type: "maxLength",
                message: "20자 이하로 입력해주세요.",
              });
              return;
            }

            clearErrors("passwordConfirm");
          },
        })}
      />
      <FormInput
        label="회원가입 암호"
        error={errors.secret?.message}
        data-testid="secret-input"
        type="password"
        placeholder="회원가입 암호를 입력해주세요."
        maxLength={50}
        required
        {...register("secret", {
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            e.target.value = e.target.value.replace(/\s+/g, "");

            if (!e.target.value || e.target.value === "") {
              setError("secret", {
                type: "required",
                message: "회원가입 암호를 입력해주세요.",
              });
              return;
            }

            if (e.target.value.length > 50) {
              setError("secret", {
                type: "maxLength",
                message: "50자 이하로 입력해주세요.",
              });
              return;
            }

            clearErrors("secret");
          },
        })}
      />
    </>
  );
};

function SignupButton() {
  const context = useContext(SignupFormContext);

  if (!context) return null;

  const { isSubmitDisabled } = context;

  return (
    <button
      data-testid="signup-button"
      type="submit"
      aria-disabled={isSubmitDisabled}
      disabled={isSubmitDisabled}
    >
      회원가입
    </button>
  );
}
