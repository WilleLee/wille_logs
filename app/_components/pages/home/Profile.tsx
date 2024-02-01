import React from "react";
import profile262 from "@images/profile262.png";
import Image from "next/image";
import styles from "./profile.module.scss";
import InstagramSvg from "@/_components/svgs/InstagramSvg";
import ThreadsSvg from "@/_components/svgs/ThreadsSvg";

type Props = {};

export default function Profile({}: Props) {
  return (
    <div>
      <div>
        <div>
          <h2>Wille</h2>
          <p>Inpyo Lee, web react frontend developer</p>
        </div>
        <div className={styles.imageWrapper}>
          <Image src={profile262} fill sizes="131px" alt="profile" />
        </div>
      </div>
      <InstagramSvg />
      <ThreadsSvg />
    </div>
  );
}
