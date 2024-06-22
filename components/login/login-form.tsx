"use client";

import FormButton from "@components/form-button";
import FormInput from "@components/form-input";
import useRegisterOptions from "@hooks/useRegisterOptions";
import { ReactNode, memo, useMemo } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@libs/actions";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function LoginForm() {
  return (
    <div>
      <form action={login}>
        <FormWrapper>
          <EmailInput />
          <PasswordInput />
          <LoginButton />
        </FormWrapper>
      </form>
    </div>
  );
}

type FormState = {
  email: string;
  password: string;
};

const initialFormState: FormState = {
  email: "",
  password: "",
};

function FormWrapper({ children }: { children: ReactNode }) {
  const methods = useForm<FormState>({
    defaultValues: initialFormState,
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

const EmailInput = memo(function EmailInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { email: options } = useRegisterOptions();
  return (
    <FormInput
      data-testid="email_input"
      aria-label="이메일 입력창"
      label="이메일"
      type="text"
      placeholder="이메일 입력"
      required
      minLength={4}
      maxLength={30}
      error={errors.email?.message as string}
      {...register("email", options)}
    />
  );
});

const PasswordInput = memo(function PasswordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { password: options } = useRegisterOptions();
  return (
    <FormInput
      data-testid="password_input"
      aria-label="비밀번호 입력창"
      label="비밀번호"
      type="password"
      placeholder="비밀번호 입력"
      required
      minLength={6}
      maxLength={20}
      error={errors.password?.message as string}
      {...register("password", options)}
    />
  );
});

const LoginButton = memo(function LoginButton() {
  const { pending } = useFormStatus();
  const {
    getValues,
    formState: { errors },
  } = useFormContext<FormState>();
  const values = getValues();

  const isDisabled = useMemo(() => {
    if (pending) {
      return true;
    }

    if (Object.values(values).some((v) => v === "")) {
      return true;
    }

    if (Object.keys(errors).length > 0) {
      return true;
    }

    return false;
  }, [errors, values, pending]);

  return (
    <FormButton
      data-testid="login_button"
      aria-label="로그인 버튼"
      aria-disabled={isDisabled}
      disabled={isDisabled}
      type="submit"
    >
      {pending ? "로그인 중..." : "로그인"}
    </FormButton>
  );
});
