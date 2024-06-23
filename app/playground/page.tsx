import { GlobalPortal } from "@app/global-portal";
import FormButton from "@components/form-button";
import FormInput from "@components/form-input";
import FormTextarea from "@components/form-textarea";
import Header from "@components/header";
import Text from "@components/text";
import { specials } from "@libs/formats";
import { IThread } from "@libs/types";
import clsx from "clsx";
import dayjs from "dayjs";
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  Ref,
  TextareaHTMLAttributes,
  forwardRef,
} from "react";

const thread: IThread = {
  _id: "1",
  text: "하이데거는 비은폐성으로서의 진리는 거부와 위장을 의미하는 은폐와 본질적인 관계를 갖고 있다는 점에서 비-진리(Un-wahrheit)이기도 하다고 말하고 있다. 거부로서의 은폐는 일체의 비은폐, 즉 밝힘의 기원이며 위장으로서의 은폐는 일체의 밝힘에게 미혹의 가능성을 부여한다. 따라서 진리의 본질은 그 자체에 있어 은폐와 비은폐하는 밝힘의 근원적인 투쟁이다. 이러한 근원적인 투쟁을 통해서 비로소 존재자가 자신을 드러내는 저 열린 터(Lichtung, das Offene)가 쟁취된다. 존재자 전체가 자신을 드러내는 열린 터에는 하나의 세계와 대지가 속한다.",
  tags: ["123", "1234"],
  createdAt: "2021-09-01T00:00:00.000Z",
  creator: "123456",
  book: {
    title: "서양철학사",
    author: "윤영로",
    page: 123,
  },
};

export default function PlaygroundPage() {
  return (
    <>
      <Header />
      <h1>Playground</h1>
      <div>
        <PButton fullWidth={false}>button</PButton>
        <PButton>button</PButton>
        <PButton disabled>button</PButton>
        <PButton isError>button</PButton>
        <PButton isError disabled>
          button
        </PButton>
      </div>
      <div>
        <PTextarea placeholder="입력해주세요." />
        <PTextarea error="입력해주세요." placeholder="입력해주세요." />
        <PInput label="test0" placeholder="placeholder" />
        <PInput
          label="test1"
          placeholder="placeholder"
          error={`비밀번호는 영문 대소문자, 숫자, 특수문자(${specials.join("")})를 포함해야합니다.`}
        />
      </div>
      <div>
        <PTags
          tags={[
            "HEIDEGGER",
            "NIETASCHE",
            "CONSTRUCTIVISM",
            "DECONSTRUCTIVISM",
            "LANGUAGE",
            "PHILOSOPHY",
            "DEVELOPMENT",
          ]}
        />
      </div>
      <div>
        <PThreads threads={[thread, thread, thread]} />
      </div>
      <PWriteThreadForm />
      <PBottomButton>bottom button</PBottomButton>
    </>
  );
}

function PWriteThreadForm() {
  return (
    <div className="mb-[16px]">
      <h2 className="mb-[12px]">
        <Text type="large">새로운 스레드</Text>
      </h2>
      <FormTextarea />
      <div></div>
      <FormInput label="제목" />
      <div className="grid grid-cols-[1fr_1fr] gap-[16px]">
        <FormInput label="저자" />
        <FormInput label="페이지" />
      </div>
      <FormButton>스레드 작성</FormButton>
    </div>
  );
}

function PThreads({ threads }: { threads: IThread[] }) {
  return (
    <div className="flex flex-col gap-[16px]">
      {threads.map((t) => (
        <div
          key={t._id}
          className="flex w-full flex-col gap-[8px] rounded-[10px] bg-grey-200 p-[16px] dark:bg-grey-900"
        >
          <p className="block w-full items-center overflow-hidden text-ellipsis rounded-[5px] bg-grey-300 px-[12px] py-[8px] dark:bg-grey-800">
            <span className="inline text-nowrap text-[15px] font-light">
              {t.text}
            </span>
          </p>
          <div className="flex justify-end">
            <span className="inline text-[10px] font-semibold">
              {dayjs(t.createdAt).format("YYYY.MM.DD")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const PTextarea = forwardRef(function PTextarea(
  { error, ...rest }: TextareaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  return (
    <div className="my-[8px] flex w-full flex-col">
      <textarea
        ref={ref}
        className={clsx(
          "shadow-light dark:shadow-dark h-[80px] w-full resize-none rounded-[10px] border-2 border-solid bg-transparent px-[8px] py-[4px] font-normal leading-normal transition-colors focus:outline-none",
          error
            ? "border-red-400 caret-red-400 focus:border-red-400"
            : "border-transparent caret-blue-300 focus:border-blue-300",
        )}
        {...rest}
      />
      {error && (
        <span className="inline-flex items-center text-[14px] font-medium leading-normal text-red-400">
          {error}
        </span>
      )}
    </div>
  );
});

function PTags({ tags }: { tags: string[] }) {
  return (
    <div className="py-[8px]">
      <div className="scrollbar-disabled flex h-[32px] w-full items-center gap-[4px] overflow-x-scroll">
        <button className="h-full w-auto min-w-[100px] max-w-[120px] overflow-hidden text-ellipsis rounded-[10px] bg-grey-300 px-[8px] text-grey-800 dark:bg-grey-900 dark:text-grey-400">
          ALL
        </button>
        {tags.map((t, i) => (
          <button
            key={i}
            title={t}
            className="h-full w-auto min-w-[100px] max-w-[120px] overflow-hidden text-ellipsis rounded-[10px] bg-grey-300 px-[8px] text-grey-800 dark:bg-grey-900 dark:text-grey-400"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PInput = forwardRef(function PInput(
  props: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  const { label, error, ...rest } = props;
  return (
    <div className="my-[8px] flex w-full flex-col">
      <label className="mb-[6px] inline-flex items-center text-[12px] font-medium text-grey-700 dark:text-grey-400">
        {label}
      </label>
      <input
        ref={ref}
        className={`inline-flex h-[32px] items-center rounded-[5px] border-2 border-solid bg-transparent px-[6px] text-[15px] font-normal text-grey-900 focus:outline-none dark:text-grey-200 ${error ? "border-red-400 caret-red-400 focus:border-red-400" : "border-transparent caret-blue-300 focus:border-blue-300"}`}
        {...rest}
      />
      {error && (
        <span className="mt-[4px] inline-flex items-center text-[14px] font-medium leading-normal text-red-400">
          {error}
        </span>
      )}
    </div>
  );
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isError?: boolean;
  fullWidth?: boolean;
}

const PButton = forwardRef(function PButton(
  props: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const {
    children,
    fullWidth = true,
    isError = false,
    className,
    ...rest
  } = props;
  return (
    <button
      ref={ref}
      className={`inline-flex h-[38px] cursor-pointer items-center justify-center rounded-[5px] px-[6px] text-[15px] font-medium text-grey-200 transition-colors active:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-[0.42] dark:text-grey-900 ${typeof className === "string" ? className : ""} ${fullWidth ? "w-full" : ""} ${isError ? "bg-red-400 hover:bg-red-500 active:bg-red-600" : "bg-blue-300 hover:bg-blue-400 active:bg-blue-500"}`}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
});

interface BottomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const PBottomButton = forwardRef(function PBottomButton(
  props: BottomButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const { children, className, ...rest } = props;
  return (
    <GlobalPortal>
      <button
        ref={ref}
        className={`fixed bottom-0 left-[50%] inline-flex h-[48px] w-full max-w-[520px] -translate-x-[50%] cursor-pointer items-center justify-center rounded-[5px] bg-blue-300 text-[15px] font-medium text-grey-200 transition-colors hover:bg-blue-400 active:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-[0.42] dark:text-grey-900 ${typeof className === "string" ? className : ""}`}
        {...rest}
      >
        <span>{children}</span>
      </button>
    </GlobalPortal>
  );
});
