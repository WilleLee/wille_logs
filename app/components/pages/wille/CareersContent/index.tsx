"use client";

import React, { AllHTMLAttributes } from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import styles from "./careersContent.module.scss";
import { careers } from "./careers";
import ThreadedBox from "@/components/boxes/ThreadedBox";
import { IProject } from "@components/pages/wille/ProjectsContent/projects";
import { languageModeState } from "@/atoms/languageModeState";

export default function CareersContent() {
  const languageMode = useRecoilValue(languageModeState);
  return (
    <>
      {careers.map((career) => (
        <ThreadedBox key={career._id}>
          <div>
            <Image src={career.imageSrc} width={36} alt={career.company} />
          </div>
          <div className={styles.threadContent}>
            <div>
              <h4>
                {career.company.toUpperCase()}
                <span>
                  (
                  {languageMode === "ko"
                    ? career.position[1]
                    : career.position[0]}
                  )
                </span>
              </h4>
              <p>
                {career.startDate} ~ {career.endDate}
              </p>
            </div>
            <div>
              {career.projects.map((project) => (
                <ProjectItem
                  project={project}
                  key={project.title}
                  languageMode={languageMode}
                />
              ))}
            </div>
          </div>
        </ThreadedBox>
      ))}
    </>
  );
}

interface ProjectItemProps extends AllHTMLAttributes<HTMLDivElement> {
  project: IProject;
  languageMode: "en" | "ko";
}

function ProjectItem({ project, languageMode }: ProjectItemProps) {
  return (
    <div key={project.title} className={styles.projectWrapper}>
      <h3>
        <a
          href={project.link}
          target="_blank"
          aria-label={`visit ${project.title}`}
        >
          <span>{project.title}</span>
        </a>
      </h3>
      <ul>
        <li>&bull; {project.techStack.join(", ")}</li>
        {project.descriptions[languageMode || "en"].map(
          (description, index) => (
            <li key={`${project.title}_${index}`}>&bull; {description}</li>
          ),
        )}
        {/* {project.descriptions.map((description, index) => (
          <li key={`${project.title}_${index}`}>&bull; {description}</li>
        ))} */}
      </ul>
    </div>
  );
}
