"use client";

import ThreadedBox from "@/components/boxes/ThreadedBox";
import Image from "next/image";
import React from "react";
import { careers } from "./careers";

type Props = {};

export default function CareersContent({}: Props) {
  return (
    <>
      {careers.map((career) => (
        <ThreadedBox key={career._id}>
          <div>
            <div>
              <Image src={career.imageSrc} width={36} alt={career.company} />
              <h3>
                {career.company.toUpperCase()} <span>({career.position})</span>
              </h3>
            </div>
            <p>
              {career.startDate} ~ {career.endDate}
            </p>
          </div>
          {career.projects.map((project) => (
            <div key={project.title}>
              <h4>{project.title}</h4>
              <ul>
                <li>{project.techStack.join(", ")}</li>
              </ul>
            </div>
          ))}
        </ThreadedBox>
      ))}
    </>
  );
}
