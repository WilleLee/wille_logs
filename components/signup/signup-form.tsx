"use client";

import BottomButton from "@components/bottom-button";
import FormButton from "@components/form-button";
import FormInput from "@components/form-input";
import useRegisterOptions from "@hooks/useRegisterOptions";
import { signup } from "@libs/actions";
import {
  ChangeEvent,
  FormHTMLAttributes,
  ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useFormStatus } from "react-dom";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export default function SignupForm() {
  return (
    <Layout>
      <FormController>
        <Form>
          <EmailInput />
          <NicknameInput />
          <PasswordInput />
          <PasswordConfirmInput />
          <SecretInput />
          <SignupButton />
        </Form>
      </FormController>
    </Layout>
  );
}

const initialState: IFormState = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
  secret: "",
};

const initialContext: IFormContext = {
  action: () => {},
};

const FormContext = createContext<IFormContext>(initialContext);

function FormController({ children }: { children: ReactNode }) {
  const methods = useForm<IFormState>({
    defaultValues: initialState,
  });

  const handleAction = useCallback(async (formData: FormData) => {
    await signup(formData);
  }, []);
  return (
    <FormContext.Provider
      value={{
        action: handleAction,
      }}
    >
      <FormProvider {...methods}>{children}</FormProvider>
    </FormContext.Provider>
  );
}

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

function Form({ children, ...rest }: FormProps) {
  const { action } = useContext(FormContext);
  return (
    <FormView action={action} {...rest}>
      {children}
    </FormView>
  );
}

const FormView = memo(function FormView({ children, ...rest }: FormProps) {
  return <form {...rest}>{children}</form>;
});

function EmailInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { email: registerOptions } = useRegisterOptions();
  return (
    <FormInput
      data-testid="email_input"
      label="이메일"
      placeholder="이메일을 입력해주세요."
      required
      minLength={4}
      maxLength={30}
      error={errors.email?.message as string}
      {...register("email", registerOptions as any)}
    />
  );
}

function NicknameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormState>();
  const { nickname: registerOptions } = useRegisterOptions();
  return (
    <FormInput
      data-testid="nickname_input"
      label="닉네임"
      placeholder="닉네임을 입력해주세요."
      required
      minLength={2}
      maxLength={10}
      error={errors.nickname?.message as string}
      {...register("nickname", registerOptions as any)}
    />
  );
}

function PasswordInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormState>();
  const { password: registerOptions } = useRegisterOptions();
  return (
    <FormInput
      data-testid="password_input"
      label="비밀번호"
      placeholder="비밀번호를 입력해주세요."
      type="password"
      required
      minLength={6}
      maxLength={20}
      error={errors.password?.message}
      {...register("password", registerOptions as any)}
    />
  );
}

function PasswordConfirmInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IFormState>();
  const { passwordConfirm: registerOptions } = useRegisterOptions();
  return (
    <FormInput
      data-testid="password_confirm_input"
      label="비밀번호 확인"
      placeholder="비밀번호를 한번 더 입력해주세요."
      type="password"
      required
      minLength={6}
      maxLength={20}
      error={errors.passwordConfirm?.message}
      {...register("passwordConfirm", registerOptions as any)}
    />
  );
}

function SecretInput() {
  const {
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<IFormState>();
  return (
    <FormInput
      data-testid="secret_input"
      label="회원가입 시크릿"
      placeholder="회원가입 시크릿을 입력해주세요."
      required
      maxLength={50}
      error={errors.secret?.message as string}
      {...register("secret", {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          if (!e.target.value || e.target.value === "") {
            setError("secret", {
              type: "required",
              message: "회원가입 시크릿을 입력해주세요.",
            });
            return;
          }
          clearErrors("secret");
        },
      })}
    />
  );
}

function SignupButton() {
  const { pending } = useFormStatus();
  const {
    getValues,
    formState: { errors },
  } = useFormContext<IFormState>();
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
    <>
      <FormButton
        disabled={isDisabled}
        aria-disabled={isDisabled}
        desktopOnly
        data-testid="signup_button"
        type="submit"
      >
        {pending ? "회원가입 중..." : "회원가입"}
      </FormButton>
      <BottomButton
        disabled={isDisabled}
        aria-disabled={isDisabled}
        mobileOnly
        type="submit"
      >
        {pending ? "회원가입 중..." : "회원가입"}
      </BottomButton>
    </>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

type IFormState = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  secret: string;
};

type IFormContext = {
  action: (formData: FormData) => void;
};
