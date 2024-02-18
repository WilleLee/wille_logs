"use client";

import React from "react";
import Image from "next/image";
import yonseiLogo from "@images/yonsei_logo.png";
import styles from "./extraContent.module.scss";
import { interests, languages, skills } from "./data";
import ThreadedBox from "@components/boxes/ThreadedBox";
import LinkedButton from "@components/buttons/LinkedButton";

type Props = {
  languageMode: "en" | "ko";
};

export default function ExtraContent({ languageMode }: Props) {
  return (
    <>
      <ThreadedBox withImage={false}>
        <h4>{languageMode === "ko" ? "기술" : "Skills"}</h4>
        <ul className={`${styles.tags} ${styles.skills}`}>
          {skills.map((skill, index) => (
            <li
              key={`skill_${index}`}
              style={{
                backgroundColor: skill.backgroundColor,
                color: skill.color,
              }}
            >
              {skill.name}
            </li>
          ))}
        </ul>
      </ThreadedBox>
      <ThreadedBox>
        <div>
          <Image
            src={yonseiLogo}
            width={36}
            height={36}
            style={{ borderRadius: "50%", overflow: "hidden" }}
            alt="yonsei university UI"
          />
        </div>
        <div className={styles.universityWrapper}>
          <div>
            <h4>
              {languageMode === "ko"
                ? "연세대학교 (미래캠퍼스)"
                : "Yonsei University (Mirae Campus), South Korea"}
            </h4>
            <p>2013.03 ~ 2017.02</p>
          </div>
          <div>
            <ul>
              <li>
                {languageMode === "ko" ? "철학 학사" : "B.A. in Philosophy"}
              </li>
              <li>
                <span>
                  (
                  {languageMode === "ko"
                    ? "생명과학 부전공"
                    : "minor in biology"}
                  )
                </span>
              </li>
            </ul>
            <p>4.12/4.3 (GPA)</p>
          </div>
        </div>
      </ThreadedBox>
      <ThreadedBox withImage={false}>
        <h4>{languageMode === "ko" ? "언어" : "Languages"}</h4>
        <ul className={styles.tags}>
          {languages[languageMode || "en"].map((language, index) => (
            <li key={`language_${index}`}>
              <LinkedButton aria-hidden disabled>
                {language}
              </LinkedButton>
            </li>
          ))}
        </ul>
      </ThreadedBox>
      <ThreadedBox withImage={false}>
        <h4>{languageMode === "ko" ? "관심사" : "Personal Interests"}</h4>
        <div>
          <ul className={styles.tags}>
            {interests[languageMode || "en"].map((interest, index) => (
              <li key={`interest_${index}`}>
                <LinkedButton aria-hidden disabled>
                  #{interest}
                </LinkedButton>
              </li>
            ))}
          </ul>
        </div>
      </ThreadedBox>
    </>
  );
}
