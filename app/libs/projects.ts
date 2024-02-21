import avatar128 from "@images/avatar128.png";
import rokSupporterLogo from "@images/rok_supporter_logo.png";
import { stacks } from "./stacks";
import { StaticImageData } from "next/image";

export interface IProject {
  _id: string;
  title: string;
  imageSrc: StaticImageData;
  link: string;
  githubLink?: string;
  roles: string[];
  languages: {
    name: string;
    backgroundColor: string;
    color: string;
  }[];
  stacks: {
    name: string;
    backgroundColor: string;
    color: string;
  }[];
  descriptions: { en: string[]; ko: string[] };
}

export const projects: IProject[] = [
  {
    _id: "0",
    title: "wille logs...",
    imageSrc: avatar128,
    link: "https://wille-logs.vercel.app/",
    githubLink: "https://github.com/WilleLee/wille_logs",
    roles: ["be", "fe", "design"],
    languages: [
      {
        name: "typescript",
        backgroundColor: stacks.typescript.backgroundColor,
        color: stacks.typescript.color,
      },
      {
        name: "scss",
        backgroundColor: stacks.scss.backgroundColor,
        color: stacks.scss.color,
      },
    ],
    stacks: [
      {
        name: "next(app)",
        backgroundColor: stacks.next.backgroundColor,
        color: stacks.next.color,
      },
      {
        name: "react",
        backgroundColor: stacks.react.backgroundColor,
        color: stacks.react.color,
      },
      {
        name: "mongoDB",
        backgroundColor: stacks.mongodb.backgroundColor,
        color: stacks.mongodb.color,
      },
      {
        name: "recoil",
        backgroundColor: stacks.recoil.backgroundColor,
        color: stacks.recoil.color,
      },
      {
        name: "axios",
        backgroundColor: stacks.axios.backgroundColor,
        color: stacks.axios.color,
      },
      {
        name: "SWR",
        backgroundColor: stacks.swr.backgroundColor,
        color: stacks.swr.color,
      },
      {
        name: "vitest",
        backgroundColor: stacks.vitest.backgroundColor,
        color: stacks.vitest.color,
      },
    ],
    descriptions: {
      en: [
        "a blog web app to save daily book notes",
        "full stack application with next.js and mongodb",
      ],
      ko: [
        "감명 받은 책 내용을 저장하는 블로그 웹앱",
        "넥스트와 몽고DB를 사용한 풀스택 어플리케이션",
      ],
    },
  },
  {
    _id: "1",
    title: "rok supporter",
    imageSrc: rokSupporterLogo,
    link: "https://github.com/WilleLee/rok-supporter",
    githubLink: "https://github.com/WilleLee/rok-supporter",
    roles: ["fe", "design"],
    languages: [
      {
        name: "javascript",
        backgroundColor: stacks.javascript.backgroundColor,
        color: stacks.javascript.color,
      },
      {
        name: "scss",
        backgroundColor: stacks.scss.backgroundColor,
        color: stacks.scss.color,
      },
    ],
    stacks: [
      {
        name: "react",
        backgroundColor: stacks.react.backgroundColor,
        color: stacks.react.color,
      },
      {
        name: "express",
        backgroundColor: stacks.express.backgroundColor,
        color: stacks.express.color,
      },
      {
        name: "babel",
        backgroundColor: stacks.babel.backgroundColor,
        color: stacks.babel.color,
      },
      {
        name: "zustand",
        backgroundColor: stacks.zustand.backgroundColor,
        color: stacks.zustand.color,
      },
      {
        name: "styled-components",
        backgroundColor: stacks.styledComponents.backgroundColor,
        color: stacks.styledComponents.color,
      },
    ],
    //techStack: ["javascript", "react", "zustand", "styled-components"],
    descriptions: {
      en: [
        "a wep page to provide useful information and tools for the game rise of kingdoms",
        "participated in the front-end development using react",
      ],
      ko: [
        "모바일게임 라이즈 오브 킹덤즈를 위한 유용한 정보 및 도구를 제공하는 웹페이지",
        "리액트를 사용한 프론트엔드 개발 참여",
      ],
    },
  },
];
