"use client";

import React, { AllHTMLAttributes } from "react";
import Image from "next/image";
import styles from "./careersContent.module.scss";
import { careers, ICareerProject } from "@libs/careers";
import ThreadedBox from "@/components/boxes/ThreadedBox";
import LinkedButton from "@/components/buttons/LinkedButton";
import MetaBox from "@/components/boxes/MetaBox";

type Props = {
  languageMode: "en" | "ko";
};

export default function CareersContent({ languageMode }: Props) {
  return (
    <>
      {careers.map((career) => (
        <ThreadedBox key={career._id} title={career.company}>
          <div>
            <Image src={career.imageSrc} width={36} alt={career.company} />
          </div>
          <div className={styles.threadContent}>
            <div>
              <h4>
                {career.company.toUpperCase()}
                <span>
                  (
                  {/* {languageMode === "ko"
                    ? career.position.ko
                    : career.position[0]} */}
                  {career.position[languageMode || "en"].join(", ")})
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
  project: ICareerProject;
  languageMode: "en" | "ko";
}

const ProjectItem = React.memo(function ProjectItem({
  project,
  languageMode,
}: ProjectItemProps) {
  return (
    <div
      key={project.title}
      className={styles.projectWrapper}
      title={project.title}
    >
      <h3>
        <a
          href={project.link}
          target="_blank"
          aria-label={`visit ${project.title}`}
        >
          <span>{project.title}</span>
        </a>
      </h3>
      {project.descriptions[languageMode || "en"].length > 0 && (
        <ul
          title="description of the project"
          className={`${styles.list} ${styles.description}`}
        >
          {project.descriptions[languageMode || "en"].map(
            (description, index) => (
              <li key={`${project.title}_${index}`}>&bull; {description}</li>
            ),
          )}
        </ul>
      )}
      <ul
        title="brief spefication of the project"
        className={`${styles.list} ${styles.specification}`}
      >
        <li>
          <h5>Roles</h5>
          {/* <div>{project.roles.join(", ")}</div> */}
          <div className={styles.collapsed}>
            {project.roles.map((role) => (
              <MetaBox key={role}>{role.toUpperCase()}</MetaBox>
            ))}
          </div>
        </li>
        <li>
          <h5>Languages</h5>
          {/* <div>{project.languages.join(", ")}</div> */}
          <div>
            {project.languages.map((language) => (
              <MetaBox
                key={language.name}
                style={{
                  backgroundColor: `${language.backgroundColor} !important`,
                  color: `${language.color} !important`,
                }}
              >
                {language.name.toUpperCase()}
              </MetaBox>
            ))}
          </div>
        </li>
        <li>
          <h5>Stacks</h5>
          {/* <div>{project.stacks.join(", ")}</div> */}
          <div className={styles.stacks}>
            {project.stacks.map((stack) => (
              <MetaBox
                key={stack.name}
                style={{
                  backgroundColor: `${stack.backgroundColor} !important`,
                  color: `${stack.color} !important`,
                }}
                id={stack.color}
              >
                {stack.name.toUpperCase()}
              </MetaBox>
            ))}
          </div>
        </li>
        <li>
          <h5>Teams</h5>
          {/* <div>{project.teams.join(", ")}</div> */}
          <div className={styles.collapsed}>
            {project.teams.map((team) => (
              <MetaBox key={team}>{team.toUpperCase()}</MetaBox>
            ))}
          </div>
        </li>
        <li>
          <h5>Teamworks</h5>
          {/* <div>{project.teamworks.join(", ")}</div> */}
          <div className={styles.collapsed}>
            {project.teamworks.map((teamwork) => (
              <MetaBox key={teamwork}>{teamwork.toUpperCase()}</MetaBox>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
});
