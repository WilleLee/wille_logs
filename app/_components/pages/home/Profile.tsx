import React from "react";
import profile262 from "@images/profile262.png";
import Image from "next/image";
import styles from "./profile.module.scss";
import ProfileLinks from "./ProfileLinks";

type Props = {};

export default function Profile({}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2>Wille</h2>
          <p>Inpyo Lee, Gyeonggi-do, South Korea</p>
        </div>
        <div>
          <Image src={profile262} fill sizes="64px" alt="profile" />
        </div>
      </div>
      <div className={styles.description}>
        <p>web front-end developer, wishing love and kindness to be spread</p>
      </div>
      <ProfileLinks />
    </div>
  );
}
