import React from "react";
import Header from "@components/layouts/Header";

interface Props {
  children: React.ReactNode;
}

const Template = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Template;
