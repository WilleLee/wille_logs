import React from "react";
import styles from "./profileLinks.module.scss";
import InstagramSvg from "@components/svgs/InstagramSvg";
import ThreadsSvg from "@components/svgs/ThreadsSvg";
import LinkedinSvg from "@components/svgs/LinkedinSvg";

const ProfileLinks = React.memo(function ProfileLinks() {
  return (
    <div className={styles.wrapper}>
      <p>
        <a href="https://github.com/WilleLee/wille_logs">github.com/WilleLee</a>
      </p>
      <div>
        <a
          href="https://www.linkedin.com/in/inpyo-lee-24b9aa292/"
          target="_blank"
        >
          <LinkedinSvg width="28" />
        </a>
        <a href="https://www.instagram.com/wille_lee_reactive/" target="_blank">
          <InstagramSvg width="28" />
        </a>
        <a href="https://www.threads.net/@wille_lee_reactive" target="_blank">
          <ThreadsSvg width="28" />
        </a>
      </div>
    </div>
  );
});

export default ProfileLinks;
