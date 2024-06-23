import clsx from "clsx";
import { Ref, TextareaHTMLAttributes, forwardRef } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const FormTextarea = forwardRef(function FormTextarea(
  props: Props,
  ref: Ref<HTMLTextAreaElement>,
) {
  const { error, ...rest } = props;
  return (
    <div className="my-[8px] flex w-full flex-col">
      <textarea
        ref={ref}
        className={clsx(
          "shadow-light dark:shadow-dark h-[80px] w-full resize-none rounded-[10px] border-2 border-solid bg-transparent px-[8px] py-[4px] text-[14px] font-normal leading-normal transition-colors focus:outline-none",
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

export default FormTextarea;
