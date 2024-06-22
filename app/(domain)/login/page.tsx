import Header from "@components/header";
import LoginForm from "@components/login/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
}
