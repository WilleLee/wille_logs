import React, { AllHTMLAttributes } from "react";
import ProjectsContent from "./ProjectsContent";
import ExtraContent from "./ExtraContent";
import styles from "./contentRenderer.module.scss";
import CareersContent from "./CareersContent";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  selectedTabId: number;
}

const ContentRenderer = React.memo(function ContentRenderer({
  selectedTabId,
  ...props
}: Props) {
  return (
    <div className={styles.wrapper} {...props}>
      {selectedTabId === 0 && <CareersContent />}
      {selectedTabId === 1 && <ProjectsContent />}
      {selectedTabId === 2 && <ExtraContent />}
    </div>
  );
});

export default ContentRenderer;
