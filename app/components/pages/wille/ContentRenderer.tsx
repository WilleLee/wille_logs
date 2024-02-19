import React, { AllHTMLAttributes } from "react";
import { useRecoilValue } from "recoil";
import ProjectsContent from "./ProjectsContent";
import ExtraContent from "./ExtraContent";
import styles from "./contentRenderer.module.scss";
import CareersContent from "./CareersContent";
import { languageModeState } from "@/atoms/languageModeState";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  selectedTabId: number;
}

const ContentRenderer = React.memo(function ContentRenderer({
  selectedTabId,
  ...props
}: Props) {
  const languageMode = useRecoilValue(languageModeState);
  return (
    <div className={styles.wrapper} {...props}>
      {selectedTabId === 0 && <CareersContent languageMode={languageMode} />}
      {selectedTabId === 1 && <ProjectsContent languageMode={languageMode} />}
      {selectedTabId === 2 && <ExtraContent languageMode={languageMode} />}
    </div>
  );
});

export default ContentRenderer;
