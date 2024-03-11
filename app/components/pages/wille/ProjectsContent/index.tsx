"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./projectsContent.module.scss";
import { projects } from "@libs/projects";
import ThreadedBox from "@components/boxes/ThreadedBox";
import GithubSvg from "@components/svgs/GithubSvg";
import TextList from "@components/lists/TextList";
import BoxList from "@components/lists/BoxList";
import MetaBox from "@components/boxes/MetaBox";

type Props = {
  languageMode: "en" | "ko";
};

const ProjectsContent = React.memo(function ProjectsContent({
  languageMode,
}: Props) {
  return (
    <>
      {projects.map((project) => (
        <ThreadedBox key={project._id}>
          <div>
            {project.imageSrc && (
              <Image
                className={styles.image}
                src={project.imageSrc as StaticImageData}
                width={36}
                alt={project.title}
              />
            )}
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.header}>
              <h4>
                <a
                  href={project.link}
                  aria-label="visit wille logs"
                  target="_blank"
                >
                  {project.title}
                </a>
              </h4>
              <div>
                <p>
                  {project.startedAt} ~
                  {project.endedAt ? ` ${project.endedAt}` : ""}
                </p>

                <a
                  href={project.githubLink}
                  aria-label="visit github repositiory of will logs"
                  target="_blank"
                >
                  <GithubSvg aria-hidden />
                </a>
              </div>
            </div>
            <TextList items={project.descriptions[languageMode || "en"]} />
            <ul className={styles.list}>
              <li>
                <h5>{languageMode === "en" ? "Roles" : "역할"}</h5>
                <BoxList collapsed>
                  {project.roles.map((role) => (
                    <MetaBox key={role}>{role.toUpperCase()}</MetaBox>
                  ))}
                </BoxList>
              </li>
              <li>
                <h5>{languageMode === "en" ? "Languages" : "언어"}</h5>
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
                <h5>{languageMode === "en" ? "Skills" : "기술"}</h5>
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
              {project.teams && project.teams.length > 0 ? (
                <li>
                  <h5>{languageMode === "en" ? "Teams" : "팀"}</h5>
                  <BoxList collapsed>
                    {project.teams.map((team) => (
                      <MetaBox key={team}>{team.toUpperCase()}</MetaBox>
                    ))}
                  </BoxList>
                </li>
              ) : null}
              {project.teamworks && project.teamworks.length > 0 ? (
                <li>
                  <h5>{languageMode === "en" ? "Teamworks" : "협업"}</h5>
                  <BoxList collapsed>
                    {project.teamworks.map((teamwork) => (
                      <MetaBox key={teamwork}>{teamwork}</MetaBox>
                    ))}
                  </BoxList>
                </li>
              ) : null}
            </ul>
          </div>
        </ThreadedBox>
      ))}
    </>
  );
});

export default ProjectsContent;
