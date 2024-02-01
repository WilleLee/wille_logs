import React, { AllHTMLAttributes } from "react";
import avatar128 from "@images/avatar128.png";
import Image from "next/image";
import styles from "./loadingFullpage.module.scss";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  alt?: string;
}

export default function LoadingFullpage({
  alt = "something's being loaded...",
  ...props
}: Props) {
  return (
    <div className={styles.wrapper} {...props}>
      <Image src={avatar128} width={128} height={128} priority alt={alt} />
      <p>Wille logs&hellip;</p>
    </div>
  );
}
