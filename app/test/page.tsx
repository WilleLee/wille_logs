"use client";

import TransparentButton from "@/components/buttons/TransparentButton";
import Modal from "@/components/modals/Modal";
import cookies from "@libs/cookies";
import React, { useState } from "react";
import { createPortal } from "react-dom";

type Props = {};

export default function Page({}: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {showModal
        ? createPortal(
            <Modal title="테스트 모달" handleClose={() => setShowModal(false)}>
              hi
            </Modal>,
            document.body,
          )
        : null}
      <TransparentButton onClick={() => cookies.set("cookie1", "value", 30)}>
        set cookie 1
      </TransparentButton>
      <TransparentButton onClick={() => cookies.set("cookie2", "value", 30)}>
        set cookie 2
      </TransparentButton>
      <TransparentButton onClick={() => cookies.delete("cookie1")}>
        delete cookie 1
      </TransparentButton>
      <TransparentButton onClick={() => setShowModal(true)}>
        open modal
      </TransparentButton>
    </div>
  );
}
