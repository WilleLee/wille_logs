"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSWRConfig } from "swr";
import fetcher from "@libs/fetcher";
import { IBook } from "@models/ThreadModel";
import { threadsApiUrl } from "@hooks/useThreads";
import { tagsApiUrl } from "@hooks/useTags";
import Modal, { DefaultModalProps } from "./Modal";
import Form from "@components/Form";
import ContainedButton from "@components/buttons/ContainedButton";

interface Props extends DefaultModalProps {}

export default function WriteModal({ handleClose }: Props) {
  const { mutate } = useSWRConfig();
  const titleRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [book, setBook] = useState<IBook>({
    title: "",
    author: "",
    page: 0,
  });
  console.log(book);

  function handleChangeTags(e: ChangeEvent<HTMLInputElement>) {
    const replaced = e.target.value.replace(/[\s]/g, ",").replace(/,+/g, ",");
    setTags(replaced);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const replacedTags = tags.replace(/,$/g, "");
    const tagsToArr = replacedTags.split(",").filter((tag) => tag.length > 0);
    const { data, message } = await fetcher.post(threadsApiUrl, {
      text,
      tags: tagsToArr,
      book,
    });
    if (!data) {
      alert(message);
      setLoading(false);
      return;
    }
    alert(message);
    await mutate(threadsApiUrl);
    if (tagsToArr.length > 0) {
      await mutate(tagsApiUrl);
    }
    handleClose();
  }

  const buttonDisabled =
    !book.title || !book.author || !book.page || !text || loading;

  useEffect(() => {
    // 초기 렌더링 시 title input에 포커스
    titleRef.current?.focus();
  }, []);

  return (
    <Modal title="새로운 이야기" handleClose={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Title"
          minLength={1}
          maxLength={20}
          ref={titleRef}
          value={book.title}
          onChange={(e) => {
            const replaced = e.target.value.replace(/^\s+/g, "");
            setBook({ ...book, title: replaced });
          }}
        />
        <Form.Input
          type="text"
          placeholder="Author"
          minLength={1}
          maxLength={20}
          value={book.author}
          onChange={(e) => {
            const replaced = e.target.value.replace(/^\s+/g, "");
            setBook({ ...book, author: replaced });
          }}
        />
        <Form.Input
          type="string"
          placeholder="Page"
          minLength={0}
          maxLength={10}
          value={book.page}
          onChange={(e) => {
            console.log(e.target.value, typeof e.target.value);
            let value = e.target.value;
            value = value.replace(/\D/g, "").replace(/^0+/, "");
            if (!value) value = "0";
            setBook({ ...book, page: parseInt(value) });
          }}
          inputMode="numeric"
        />
        <Form.Textarea
          placeholder="Text from the book"
          value={text}
          onChange={(e) => {
            const replaced = e.target.value.replace(/^\s+/g, "");
            setText(replaced);
          }}
        />
        <Form.Input
          type="text"
          placeholder="Tags, separated by commas( , )"
          value={tags}
          onChange={handleChangeTags}
        />
        <ContainedButton type="submit" disabled={buttonDisabled}>
          작성하기
        </ContainedButton>
      </Form>
    </Modal>
  );
}
