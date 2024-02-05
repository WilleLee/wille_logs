"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Modal, { DefaultModalProps } from "./Modal";
import Form from "@components/Form";
import ContainedButton from "@components/buttons/ContainedButton";

interface Props extends DefaultModalProps {}

export default function WriteModal({ handleClose }: Props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState("");

  function handleChangeTags(e: ChangeEvent<HTMLInputElement>) {
    const replaced = e.target.value.replace(/[\s]/g, ",").replace(/,+/g, ",");
    setTags(replaced);
  }

  useEffect(() => {
    // 초기 렌더링 시 title input에 포커스
    titleRef.current?.focus();
  }, []);
  return (
    <Modal title="새로운 이야기" handleClose={handleClose}>
      <Form>
        <Form.Input
          type="text"
          placeholder="Title"
          minLength={1}
          maxLength={20}
          ref={titleRef}
        />
        <Form.Input
          type="text"
          placeholder="Author"
          minLength={1}
          maxLength={20}
        />
        <Form.Input type="number" placeholder="Page" min={1} />
        <Form.Textarea />
        <Form.Input
          type="text"
          placeholder="Tags, separated by commas( , )"
          value={tags}
          onChange={handleChangeTags}
        />
        <ContainedButton type="submit">작성하기</ContainedButton>
      </Form>
    </Modal>
  );
}
