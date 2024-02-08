import { StaticImageData } from "next/image";
import avatar128 from "@images/avatar128.png";

export interface IProject {
  _id: string;
  title: string;
  imageSrc?: StaticImageData;
  link: string;
  techStack: string[];
  descriptions: string[];
}

export const projects: IProject[] = [
  {
    _id: "0",
    title: "wille logs...",
    imageSrc: avatar128,
    link: "https://wille-logs.vercel.app/",
    techStack: ["typescript", "react", "next(app)", "swr", "vitest", "mongodb"],
    descriptions: [
      "a blog app to save daily book marks with authentication",
      "full stack application with next.js and mongodb",
    ],
  },
];
