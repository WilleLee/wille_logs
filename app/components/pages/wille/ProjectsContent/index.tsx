"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRecoilValue } from "recoil";
import styles from "./projectsContent.module.scss";
import { projects } from "./projects";
import ThreadedBox from "@components/boxes/ThreadedBox";
import GithubSvg from "@components/svgs/GithubSvg";
import { languageModeState } from "@/atoms/languageModeState";

export default function ProjectsContent() {
  const languageMode = useRecoilValue(languageModeState);
  return (
    <>
      {projects.map((project) => (
        <ThreadedBox key={project._id}>
          <div>
            <Image
              className={styles.image}
              src={project.imageSrc as StaticImageData}
              width={36}
              alt={project.title}
            />
          </div>
          <div className={styles.threadContent}>
            <div>
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
                <p>2023.12 ~</p>

                <a
                  href={project.githubLink}
                  aria-label="visit github repositiory of will logs"
                  target="_blank"
                >
                  <GithubSvg aria-hidden />
                </a>
              </div>
            </div>
            <ul>
              <li>&bull; {project.techStack.join(", ")}</li>
              {project.descriptions[languageMode || "en"].map(
                (description, index) => (
                  <li key={`${project.title}_${index}`}>
                    &bull; {description}
                  </li>
                ),
              )}
            </ul>
          </div>
        </ThreadedBox>
      ))}
    </>
  );
}
