"use client";

import FormButton from "@components/form-button";
import FormInput from "@components/form-input";
import useRegisterOptions from "@hooks/useRegisterOptions";
import {
  FormHTMLAttributes,
  ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useFormStatus } from "react-dom";
import { login } from "@libs/actions";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import BottomButton from "@components/bottom-button";

export default function LoginForm() {
  return (
    <Layout>
      <FormController>
        <Form>
          <EmailInput />
          <PasswordInput />
          <LoginButton />
        </Form>
      </FormController>
    </Layout>
  );
}

const initialContext: IFormContext = {
  action: () => {},
};

const FormContext = createContext<IFormContext>(initialContext);

const initialFormState: FormState = {
  email: "",
  password: "",
};

function FormController({ children }: { children: ReactNode }) {
  const methods = useForm<FormState>({
    defaultValues: initialFormState,
  });
  const handleAction = useCallback(async (formData: FormData) => {
    const error = await login(formData);
    if (error) {
      alert(error);
    }
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

function LoginButton() {
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
    <>
      <FormButton
        desktopOnly
        data-testid="login_button"
        aria-label="로그인 버튼"
        aria-disabled={isDisabled}
        disabled={isDisabled}
        type="submit"
      >
        {pending ? "로그인 중..." : "로그인"}
      </FormButton>
      <BottomButton
        aria-label="로그인 버튼"
        aria-disabled={isDisabled}
        disabled={isDisabled}
        type="submit"
        mobileOnly
      >
        {pending ? "로그인 중..." : "로그인"}
      </BottomButton>
    </>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

type IFormContext = {
  action: (formData: FormData) => void;
};

type FormState = {
  email: string;
  password: string;
};
