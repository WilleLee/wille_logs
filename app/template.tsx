import React from "react";

interface Props {
  children: React.ReactNode;
}

const Template = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default Template;
