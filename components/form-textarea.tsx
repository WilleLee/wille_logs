import { Ref, TextareaHTMLAttributes, forwardRef } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const FormTextarea = forwardRef(function FormTextarea(
  props: Props,
  ref: Ref<HTMLTextAreaElement>,
) {
  const { ...rest } = props;
  return (
    <div>
      <textarea ref={ref} {...rest} />
    </div>
  );
});

export default FormTextarea;
