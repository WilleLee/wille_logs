import Text from "@components/text";
import { FormHTMLAttributes, ReactNode, memo } from "react";

interface FormViewProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const FormView = memo(function FormView({
  children,
  ...rest
}: FormViewProps) {
  return <form {...rest}>{children}</form>;
});

export const Wrapper = memo(function Wrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mb-[16px]">
      <h2 className="mb-[12px]">
        <Text type="large">새로운 스레드</Text>
      </h2>
      {children}
    </div>
  );
});

export const SubWrapper = memo(function SubWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="grid grid-cols-[1fr_1fr] gap-[16px]">{children}</div>;
});
