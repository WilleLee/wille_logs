"use client";

import FormButton from "@components/form-button";
import FormInput from "@components/form-input";
import FormTextarea from "@components/form-textarea";
import { writeThread } from "@libs/actions";
import {
  ChangeEvent,
  ReactNode,
  createContext,
  memo,
  useCallback,
  useContext,
  useId,
  useMemo,
} from "react";
import { useFormStatus } from "react-dom";
import {
  FormProvider,
  RegisterOptions,
  useForm,
  useFormContext,
} from "react-hook-form";
import { FormView, SubWrapper, Wrapper } from "./write-thread-form-view";

const useRegisterOptions = (): Record<
  keyof FormState,
  RegisterOptions<FormState, any>
> => {
  const { setError, clearErrors, setValue } = useFormContext<FormState>();

  return useMemo(
    () => ({
      text: {
        onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
          if (e.target.value.startsWith(" ")) {
            e.target.value = e.target.value.replace(/^\s+/, "");
          }

          if (e.target.value.length > 1000) {
            setError("text", {
              type: "maxLength",
              message: "책 내용은 1000자까지 입력 가능합니다.",
            });
            return;
          }

          clearErrors("text");
        },
      },
      book_author: {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value.replace(/^\s+/g, "");
        },
      },
      book_title: {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value.replace(/^\s+/g, "");
        },
      },
      book_page: {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value.replace(/\D/g, "");

          if (e.target.value === "") {
            e.target.value = "0";
          }

          if (e.target.value === "0") {
            return;
          }

          e.target.value = e.target.value.replace(/^0+/, "0");

          if (e.target.value !== "0") {
            e.target.value = e.target.value.replace(/^0/, "");
          }
        },
      },
      tags: {
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          e.target.value = e.target.value
            .replace(/^\s+/g, "")
            .replace(/\s+/, " ");
          const tags = e.target.value.split(" ");
          if (tags[tags.length - 1] === "") {
            tags.pop();
          }
          if (tags.length > 5) {
            setError("tags", {
              type: "maxLength",
              message: "태그는 5개까지 입력 가능합니다.",
            });
          } else {
            clearErrors("tags");
          }
          const lastTag = tags.pop();
          if (lastTag !== undefined && tags.includes(lastTag)) {
            e.target.value = e.target.value.replace(/\s$/, "");
          }
          setValue("tags", e.target.value);
        },
      },
    }),
    [setValue, setError, clearErrors],
  );
};

export default function WriteThreadForm() {
  return (
    <Wrapper>
      <FormController>
        <Form>
          <TextInput />
          <TagsInput />
          <TitleInput />
          <SubWrapper>
            <AuthorInput />
            <PageInput />
          </SubWrapper>
          <WriteButton />
        </Form>
      </FormController>
    </Wrapper>
  );
}

const initialFormContext: IFormContext = {
  action: () => {},
};

const FormContext = createContext<IFormContext>(initialFormContext);

const initialFormState: FormState = {
  text: "",
  tags: "",
  book_title: "",
  book_author: "",
  book_page: "0",
};

function FormController({ children }: { children: ReactNode }) {
  const methods = useForm<FormState>({ defaultValues: initialFormState });
  const handleAction = useCallback(
    async (formData: FormData) => {
      const error = await writeThread(formData);
      if (error) {
        alert(error);
      } else {
        methods.reset(initialFormState);
      }
    },
    [methods],
  );
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

function Form({ children }: { children: ReactNode }) {
  const { action } = useContext(FormContext);
  return <FormView action={action}>{children}</FormView>;
}

function TextInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormState>();
  const { text: options } = useRegisterOptions();
  return (
    <FormTextarea
      data-testid="text_input"
      placeholder="책 내용을 입력해주세요."
      required
      maxLength={1000}
      aria-label="책 내용 입력창"
      error={errors.text?.message}
      {...register("text", options)}
    />
  );
}

const TagsInput = memo(function TagsInput() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormState>();
  const id = useId();
  const tags = watch("tags");
  const tagsArray = tags.split(" ");
  const lastTag = tagsArray.pop();
  const { tags: options } = useRegisterOptions();

  return (
    <div>
      <h3 className="mb-[6px] inline-flex items-center text-[12px] font-medium text-grey-700 dark:text-grey-400">
        태그
      </h3>
      <label
        htmlFor={id}
        className="shadow-light dark:shadow-dark relative inline-flex h-auto min-h-[36px] w-full cursor-text items-center rounded-[5px] border-2 border-solid border-transparent px-[4px] transition-colors focus-within:border-blue-300"
      >
        <div className="flex flex-wrap items-center gap-[8px]">
          {tagsArray.map((tag, index) => (
            <p
              className="inline-flex h-[28px] items-center rounded-[999px] border border-solid border-transparent bg-blue-300 px-[8px] text-grey-50 dark:text-grey-900"
              key={index}
              data-testid={`registered_tag_${index}`}
            >
              {tag}
            </p>
          ))}
          <p className="text-[14px] font-normal" data-testid="fake_tag_input">
            {lastTag || (
              <span className="text-grey-700 dark:text-grey-400">
                태그를 스페이스로 구분하여 입력
              </span>
            )}
          </p>
        </div>
        <input
          className="absolute opacity-0 focus:outline-none"
          data-testid="real_tags_input"
          type="text"
          id={id}
          aria-label="태그 입력창, 스페이스로 구분"
          autoComplete="off"
          {...register("tags", options)}
        />
      </label>
      {errors.tags && (
        <span className="mt-[4px] inline-flex items-center text-[14px] font-medium leading-normal text-red-400">
          {errors.tags.message}
        </span>
      )}
    </div>
  );
});

function TitleInput() {
  const { register } = useFormContext<FormState>();
  const { book_title: titleOptions } = useRegisterOptions();
  return (
    <FormInput
      type="text"
      data-testid="book_title_input"
      label="제목"
      placeholder="책 제목을 입력해주세요."
      required
      maxLength={50}
      aria-label="책 제목 입력창"
      {...register("book_title", titleOptions)}
    />
  );
}
function AuthorInput() {
  const { register } = useFormContext<FormState>();
  const { book_author: authorOptions } = useRegisterOptions();
  return (
    <FormInput
      type="text"
      data-testid="book_author_input"
      label="저자"
      placeholder="저자를 입력해주세요."
      required
      maxLength={30}
      aria-label="저자 입력창"
      {...register("book_author", authorOptions)}
    />
  );
}

function PageInput() {
  const { register } = useFormContext<FormState>();
  const { book_page: pageOptions } = useRegisterOptions();
  return (
    <FormInput
      type="text"
      data-testid="book_page_input"
      label="페이지"
      placeholder="0"
      required
      maxLength={5}
      aria-label="페이지 입력창, 숫자만 입력 가능"
      {...register("book_page", pageOptions)}
    />
  );
}

function WriteButton() {
  const { pending } = useFormStatus();
  const {
    watch,
    formState: { errors },
  } = useFormContext<FormState>();
  const { text, book_author, book_title, book_page } = watch();

  const isDisabled = useMemo(() => {
    if (pending) {
      return true;
    }

    if (text === "" || book_author === "" || book_title === "") {
      return true;
    }

    if (Object.keys(errors).length > 0) {
      return true;
    }

    return false;
  }, [errors, pending, text, book_author, book_title]);
  return (
    <FormButton
      data-testid="write_thread_button"
      type="submit"
      aria-label="스레드 작성 확인 버튼"
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {pending ? "스레드 생성 중..." : "스레드 작성"}
    </FormButton>
  );
}

type IFormContext = {
  action: (formData: FormData) => void;
};

type FormState = {
  text: string;
  tags: string;
  book_title: string;
  book_author: string;
  book_page: string;
};
