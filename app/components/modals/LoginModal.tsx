"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "./Modal";
import Form from "@components/Form";
import fetcher from "@libs/fetcher";
import users from "@libs/users";
import ContainedButton from "../buttons/ContainedButton";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  handleClose: () => void;
}

export default function LoginModal({ handleClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleError(message: string) {
    setIsLoading(false);
    setPassword("");
    alert(message || "");
  }

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
    const replaced = e.target.value.replace(/\s/g, "");
    setPassword(replaced);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    if (typeof password !== "string" || password.length < 1) {
      // setIsLoading(false);
      // alert("Type the password.");
      handleError("Type the password.");
      return;
    }

    const { data, message, status } = await fetcher.post("/api/login", {
      password,
    });
    if (status !== 200 || typeof data !== "string") {
      // setIsLoading(false);
      // alert(message);
      handleError(message);
      return;
    }
    users.login(data);
    alert("Hello, Wille 🙆🏻‍♂️");
    handleClose();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Modal title="로그인" handleClose={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Password"
          ref={inputRef}
          minLength={1}
          maxLength={20}
        />
        <ContainedButton disabled={isLoading || !password} type="submit">
          로그인
        </ContainedButton>
      </Form>
    </Modal>
  );
}
