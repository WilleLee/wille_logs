"use client";

import ThreadedBox from "@/components/boxes/ThreadedBox";
import Image from "next/image";
import React, { AllHTMLAttributes } from "react";
import { careers } from "./careers";
import styles from "./careersContent.module.scss";
import { IProject } from "../ProjectsContent/projects";

type Props = {};

export default function CareersContent({}: Props) {
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
                {career.company.toUpperCase()} <span>({career.position})</span>
              </h4>
              <p>
                {career.startDate} ~ {career.endDate}
              </p>
            </div>
            <div>
              {career.projects.map((project) => (
                <ProjectItem project={project} key={project.title} />
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
}

function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div key={project.title} className={styles.projectWrapper}>
      <h3>
        <a href={project.link} target="_blank">
          <span>{project.title}</span>
        </a>
      </h3>
      <ul>
        <li>&bull; {project.techStack.join(", ")}</li>
        {project.descriptions.map((description, index) => (
          <li key={`${project.title}_${index}`}>&bull; {description}</li>
        ))}
      </ul>
    </div>
  );
}
