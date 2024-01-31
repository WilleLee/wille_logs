import React from "react";
import avatar128 from "@images/avatar128.png";
import Image from "next/image";
import styles from "./loadingFullpage.module.scss";

type Props = {};

export default function LoadingFullpage({}: Props) {
  return (
    <div className={styles.wrapper}>
      <Image src={avatar128} priority alt="threads are being loaded..." />
      <p>Wille logs&hellip;</p>
    </div>
  );
}
