"use client";

import React from "react";
import Image from "next/image";
import yonseiLogo from "@images/yonsei_logo.png";
import styles from "./extraContent.module.scss";
import { interests, languages, skills } from "@libs/extraInfos";
import ThreadedBox from "@components/boxes/ThreadedBox";
import BoxList from "@components/lists/BoxList";
import MetaBox from "@components/boxes/MetaBox";

type Props = {
  languageMode: "en" | "ko";
};

const ExtraContent = React.memo(function ExtraContent({ languageMode }: Props) {
  return (
    <>
      <ThreadedBox withImage={false}>
        <h4 className={styles.title}>
          {languageMode === "ko" ? "기술" : "Skills"}
        </h4>
        <BoxList>
          {skills.map((skill, index) => (
            <MetaBox
              key={`skill_${index}`}
              backgroundColor={skill.backgroundColor}
              color={skill.color}
            >
              {skill.name}
            </MetaBox>
          ))}
        </BoxList>
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
        <h4 className={styles.title}>
          {languageMode === "ko" ? "언어" : "Languages"}
        </h4>
        <BoxList>
          {languages[languageMode || "en"].map((language, index) => (
            <MetaBox key={`language_${index}`}>{language}</MetaBox>
          ))}
        </BoxList>
      </ThreadedBox>
      <ThreadedBox withImage={false}>
        <h4 className={styles.title}>
          {languageMode === "ko" ? "관심사" : "Personal Interests"}
        </h4>
        <BoxList>
          {interests[languageMode || "en"].map((interest, index) => (
            <MetaBox key={`interest_${index}`}>#{interest}</MetaBox>
          ))}
        </BoxList>
      </ThreadedBox>
    </>
  );
});

export default ExtraContent;
