"use client";

import FormButton from "@components/form-button";
import FormInput from "@components/form-input";
import FormTextarea from "@components/form-textarea";
import { writeThread } from "@libs/actions";
import {
  ChangeEvent,
  ReactNode,
  memo,
  useCallback,
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
    <>
      <FormController>
        <Form>
          <TextInput />
          <TagsInput />
          <BookInputs />
          <WriteButton />
        </Form>
      </FormController>
    </>
  );
}

const initialFormState: FormState = {
  text: "",
  tags: "",
  book_title: "",
  book_author: "",
  book_page: 0,
};

function FormController({ children }: { children: ReactNode }) {
  const methods = useForm<FormState>({ defaultValues: initialFormState });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

const Form = memo(function Form({ children }: { children: ReactNode }) {
  const { reset } = useFormContext();
  const action = useCallback(
    async (formData: FormData) => {
      const isSuccess = await writeThread(formData);
      if (isSuccess) {
        console.log("success!");
        reset(initialFormState);
      }
    },
    [reset],
  );
  return <form action={action}>{children}</form>;
});

const TextInput = memo(function TextInput() {
  const { register } = useFormContext<FormState>();
  const { text: options } = useRegisterOptions();
  return (
    <FormTextarea
      data-testid="text_input"
      placeholder="책 내용을 입력해주세요."
      required
      maxLength={1000}
      aria-label="책 내용 입력창"
      {...register("text", options)}
    />
  );
});

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
    <label htmlFor={id}>
      <div>
        {tagsArray.map((tag, index) => (
          <p key={index} data-testid={`registered_tag_${index}`}>
            {tag}
          </p>
        ))}
        <input data-testid="fake_tag_input" disabled placeholder={lastTag} />
      </div>
      <input
        data-testid="real_tags_input"
        type="text"
        id={id}
        {...register("tags", options)}
      />
      {errors.tags && <p>{errors.tags.message}</p>}
    </label>
  );
});

const BookInputs = memo(function BookInputs() {
  const { register } = useFormContext<FormState>();
  const {
    book_page: pageOptions,
    book_author: authorOptions,
    book_title: titleOptions,
  } = useRegisterOptions();
  return (
    <div>
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
    </div>
  );
});

const WriteButton = memo(function WriteButton() {
  const { pending } = useFormStatus();
  return (
    <FormButton
      data-testid="write_thread_button"
      type="submit"
      aria-label="스레드 작성 확인 버튼"
    >
      {pending ? "스레드 생성 중..." : "스레드 작성"}
    </FormButton>
  );
});

type FormState = {
  text: string;
  tags: string;
  book_title: string;
  book_author: string;
  book_page: number;
};
