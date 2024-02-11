"use client";

import ThreadedBox from "@/components/boxes/ThreadedBox";
import React from "react";
import yonseiLogo from "@images/yonsei_logo.png";
import Image from "next/image";
import styles from "./extraContent.module.scss";
import LinkedButton from "@/components/buttons/LinkedButton";

type Props = {};

const languages = ["Korean (native)", "English", "German"];

const interests = [
  "workout",
  "philosophy",
  "karaoke",
  "youtube",
  "maplestory",
  "diablo3",
  "walking",
  "travels",
];

export default function ExtraContent({}: Props) {
  return (
    <>
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
            <h4>Yonsei University (Mirae Campus), South Korea</h4>
            <p>2013.03 ~ 2017.02</p>
          </div>
          <div>
            <ul>
              <li>B.A in Philosophy</li>
              <li>
                <span>(minor in Biology)</span>
              </li>
            </ul>
            <p>4.12/4.3</p>
          </div>
        </div>
      </ThreadedBox>
      <ThreadedBox withImage={false}>
        <h4>Languages</h4>
        <ul className={styles.tags}>
          {languages.map((language, index) => (
            <li key={`language_${index}`}>
              <LinkedButton aria-hidden disabled>
                {language}
              </LinkedButton>
            </li>
          ))}
        </ul>
      </ThreadedBox>
      <ThreadedBox withImage={false}>
        <h4>Personal Interests</h4>
        <div>
          <ul className={styles.tags}>
            {interests.map((interest, index) => (
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
