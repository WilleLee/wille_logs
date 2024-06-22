import Header from "@components/header";
import SignupForm from "@components/signup/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
};

export default function SignupPage() {
  return (
    <>
      <Header />
      <SignupForm />
    </>
  );
}
