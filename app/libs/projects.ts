import avatar128 from "@images/avatar128.png";
import rokSupporterLogo from "@images/rok_supporter_logo.png";
import { stacks } from "./stacks";
import { StaticImageData } from "next/image";

export interface IProject {
  _id: string;
  title: string;
  imageSrc?: StaticImageData;
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
  teams?: string[];
  teamworks?: string[];
}

export const projects: IProject[] = [
  {
    _id: "0",
    title: "wille logs...",
    imageSrc: avatar128,
    link: "https://wille-logs.vercel.app/",
    githubLink: "https://github.com/WilleLee/wille_logs",
    roles: ["fe", "be", "devOps"],
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
        "supports PWA, responsive design, and web accessibility",
        "supports Ko/En and light/dark mode by recoil states",
      ],
      ko: [
        "감명 받은 책 내용을 저장하는 블로그 웹앱",
        "넥스트와 몽고DB를 사용한 풀스택 어플리케이션",
        "PWA, 반응형 디자인, 웹 접근성 지원",
        "recoil 상태에 의한 한/영 및 라이트/다크 모드 전환 지원",
      ],
    },
  },
  {
    _id: "1",
    title: "LOA IN",
    //imageSrc: avatar128,
    link: "https://github.com/KwanjungKim/Loa-project",
    githubLink: "https://github.com/KwanjungKim/Loa-project",
    roles: ["fe"],
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
        name: "react",
        backgroundColor: stacks.react.backgroundColor,
        color: stacks.react.color,
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
        name: "vite",
        backgroundColor: stacks.vite.backgroundColor,
        color: stacks.vite.color,
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
        "supports PWA, responsive design, and web accessibility",
        "supports Ko/En and light/dark mode by recoil states",
      ],
      ko: [
        "감명 받은 책 내용을 저장하는 블로그 웹앱",
        "넥스트와 몽고DB를 사용한 풀스택 어플리케이션",
        "PWA, 반응형 디자인, 웹 접근성 지원",
        "recoil 상태에 의한 한/영 및 라이트/다크 모드 전환 지원",
      ],
    },
    teams: ["fe", "be", "devOps"],
    teamworks: ["gitHub"],
  },
  {
    _id: "2",
    title: "rok supporter",
    imageSrc: rokSupporterLogo,
    link: "https://github.com/WilleLee/rok-supporter",
    githubLink: "https://github.com/WilleLee/rok-supporter",
    roles: ["fe"],
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
    descriptions: {
      en: [
        "a wep page to provide useful information and tools for the game rise of kingdoms",
        "participated in the front-end development using react",
        "global state management by zustand and styles with styled-components",
      ],
      ko: [
        "모바일게임 라이즈 오브 킹덤즈를 위한 유용한 정보 및 도구를 제공하는 웹페이지",
        "리액트를 사용한 프론트엔드 개발 참여",
        "zustand에 의한 전역 상태 관리와 styled-components에 의한 스타일 작성 및 핸들링",
      ],
    },
    teams: ["fe", "be", "devOps"],
    teamworks: ["gitHub", "aws"],
  },
];
