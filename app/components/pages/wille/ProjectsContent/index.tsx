"use client";

import React from "react";
import { projects } from "./projects";
import ThreadedBox from "@/components/boxes/ThreadedBox";
import Image, { StaticImageData } from "next/image";
import styles from "./projectsContent.module.scss";
import GithubSvg from "@/components/svgs/GithubSvg";

export default function ProjectsContent() {
  return (
    <>
      {projects.map((project) => (
        <ThreadedBox key={project._id}>
          <div>
            <Image
              src={project.imageSrc as StaticImageData}
              width={36}
              alt={project.title}
            />
          </div>
          <div className={styles.threadContent}>
            <div>
              <h4>
                <a href={project.link} aria-label="visit wille logs">
                  {project.title}
                </a>
              </h4>
              <div>
                <p>2023.12 ~</p>

                <a
                  href={project.githubLink}
                  aria-label="visit github repositiory of will logs"
                >
                  <GithubSvg aria-hidden />
                </a>
              </div>
            </div>
            <ul>
              <li>&bull; {project.techStack.join(", ")}</li>
              {project.descriptions.map((description, index) => (
                <li key={`${project.title}_${index}`}>&bull; {description}</li>
              ))}
            </ul>
          </div>
        </ThreadedBox>
      ))}
    </>
  );
}
