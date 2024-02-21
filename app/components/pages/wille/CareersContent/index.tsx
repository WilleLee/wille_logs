"use client";

import React, { AllHTMLAttributes } from "react";
import Image from "next/image";
import styles from "./careersContent.module.scss";
import { careers, ICareerProject } from "@libs/careers";
import ThreadedBox from "@components/boxes/ThreadedBox";
import MetaBox from "@components/boxes/MetaBox";
import TextList from "@components/lists/TextList";
import BoxList from "@/components/lists/BoxList";

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
                  ({career.position[languageMode || "en"].join(", ")})
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
        <TextList items={project.descriptions[languageMode || "en"]} />
      )}
      <ul title="brief spefication of the project" className={styles.list}>
        <li>
          <h5>Roles</h5>
          <BoxList collapsed>
            {project.roles.map((role) => (
              <MetaBox key={role}>{role.toUpperCase()}</MetaBox>
            ))}
          </BoxList>
        </li>
        <li>
          <h5>Languages</h5>
          <BoxList>
            {project.languages.map((language) => (
              <MetaBox
                key={language.name}
                backgroundColor={language.backgroundColor}
                color={language.color}
              >
                {language.name}
              </MetaBox>
            ))}
          </BoxList>
        </li>
        <li>
          <h5>Stacks</h5>
          <BoxList collapsed>
            {project.stacks.map((stack) => (
              <MetaBox
                key={stack.name}
                backgroundColor={stack.backgroundColor}
                color={stack.color}
                id={stack.color}
              >
                {stack.name}
              </MetaBox>
            ))}
          </BoxList>
        </li>
        <li>
          <h5>Teams</h5>
          <BoxList collapsed>
            {project.teams.map((team) => (
              <MetaBox key={team}>{team.toUpperCase()}</MetaBox>
            ))}
          </BoxList>
        </li>
        <li>
          <h5>Teamworks</h5>
          <BoxList collapsed>
            {project.teamworks.map((teamwork) => (
              <MetaBox key={teamwork}>{teamwork}</MetaBox>
            ))}
          </BoxList>
        </li>
      </ul>
    </div>
  );
});
