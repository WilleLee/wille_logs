import { StaticImageData } from "next/image";
import avatar128 from "@images/avatar128.png";
import rokSupporterLogo from "@images/rok_supporter_logo.png";

export interface IProject {
  _id: string;
  title: string;
  imageSrc?: StaticImageData;
  link: string;
  githubLink?: string;
  techStack: string[];
  descriptions: string[];
}

export const projects: IProject[] = [
  {
    _id: "0",
    title: "wille logs...",
    imageSrc: avatar128,
    link: "https://wille-logs.vercel.app/",
    githubLink: "https://github.com/WilleLee/wille_logs",
    techStack: ["typescript", "react", "next(app)", "swr", "vitest", "mongodb"],
    descriptions: [
      "a blog app to save daily book marks with authentication",
      "full stack application with next.js and mongodb",
    ],
  },
  {
    _id: "1",
    title: "rok supporter",
    imageSrc: rokSupporterLogo,
    link: "https://github.com/WilleLee/rok-supporter",
    githubLink: "https://github.com/WilleLee/rok-supporter",
    techStack: ["javascript", "react", "zustand", "styled-components"],
    descriptions: [
      "a wep page to provide useful information and tools for the game rise of kingdoms",
      "participated in the front-end development using react",
    ],
  },
];
