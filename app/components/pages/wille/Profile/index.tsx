"use client";

import React from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import profile262 from "@images/profile262.png";
import styles from "./profile.module.scss";
import ProfileLinks from "./ProfileLinks";
import { languageModeState } from "@/atoms/languageModeState";

type Props = {};

const data = {
  name: {
    default: "Inpyo Lee",
    en: "Inpyo Lee",
    ko: "이인표",
  },
  location: {
    default: "Gyeonggi-do, South Korea",
    en: "Gyeonggi-do, South Korea",
    ko: "경기도 용인시",
  },
  description: {
    default: "web front-end developer, wishing love and kindness to be spread",
    en: "web front-end developer, wishing love and kindness to be spread",
    ko: "철학하는 웹 프론트엔드 개발자",
  },
};

export default function Profile({}: Props) {
  const languageMode = useRecoilValue(languageModeState);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2>Wille</h2>
          <p>
            {data.name[languageMode || "default"]},{" "}
            {data.location[languageMode || "default"]}
          </p>
        </div>
        <div>
          <Image src={profile262} fill sizes="64px" alt="profile" />
        </div>
      </div>
      <div className={styles.description}>
        <p>{data.description[languageMode || "default"]}</p>
      </div>
      <ProfileLinks />
    </div>
  );
}
