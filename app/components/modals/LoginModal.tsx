"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("password", password);
    const { data, message, status } = await fetcher.post("/api/login", {
      password,
    });
    if (status !== 200 || typeof data !== "string") {
      alert(message);
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
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          ref={inputRef}
        />
        {/* <Form.Submit type="submit">로그인</Form.Submit> */}
        <ContainedButton type="submit">로그인</ContainedButton>
      </Form>
    </Modal>
  );
}
