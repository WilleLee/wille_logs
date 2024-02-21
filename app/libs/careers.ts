import newlinkLogo from "@images/newlink_logo.png";
import { stacks } from "./stacks";
import { StaticImageData } from "next/image";

export interface ICareerProject {
  _id: string;
  title: string;
  link: string;
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
  teams: string[];
  teamworks: string[];
  descriptions: {
    en: string[];
    ko: string[];
  };
}

export interface ICareer {
  _id: string;
  company: string;
  position: {
    en: string[];
    ko: string[];
  };
  imageSrc: StaticImageData;
  startDate: string;
  endDate: string;
  projects: ICareerProject[];
}

export const careers: ICareer[] = [
  {
    _id: "0",
    company: "newlink",
    position: {
      en: ["frontend", "junior"],
      ko: ["프론트엔트", "사원"],
    },
    imageSrc: newlinkLogo,
    startDate: "2023.01",
    endDate: "2023.10",
    projects: [
      {
        _id: "0",
        title: "cashierest",
        link: "http://www.cashierest.com/",
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
            name: "next(pages)",
            backgroundColor: stacks.next.backgroundColor,
            color: stacks.next.color,
          },
          {
            name: "react",
            backgroundColor: stacks.react.backgroundColor,
            color: stacks.react.color,
          },
          {
            name: "redux",
            backgroundColor: stacks.redux.backgroundColor,
            color: stacks.redux.color,
          },
          {
            name: "axios",
            backgroundColor: stacks.axios.backgroundColor,
            color: stacks.axios.color,
          },
          {
            name: "react-query",
            backgroundColor: stacks.reactQuery.backgroundColor,
            color: stacks.reactQuery.color,
          },
          {
            name: "highcharts",
            backgroundColor: stacks.highcharts.backgroundColor,
            color: stacks.highcharts.color,
          },
          {
            name: "tradingview",
            backgroundColor: stacks.tradingview.backgroundColor,
            color: stacks.tradingview.color,
          },
          {
            name: "websocket",
            backgroundColor: stacks.websocket.backgroundColor,
            color: stacks.websocket.color,
          },
          {
            name: "styled-components",
            backgroundColor: stacks.styledComponents.backgroundColor,
            color: stacks.styledComponents.color,
          },
          {
            name: "jenkins",
            backgroundColor: stacks.jenkins.backgroundColor,
            color: stacks.jenkins.color,
          },
        ],
        teams: ["pm", "be", "fe", "design", "devOps", "qa"],
        teamworks: ["slack", "jira", "confluence", "gitLab", "notion", "figma"],
        descriptions: {
          en: [
            "web frontend development for cryptocurrency exchangement platform",
            "state management with redux",
            "server states caching by react-query",
            "charts drawn with tradingview and highcharts",
          ],
          ko: [
            "암호화폐 거래소 플랫폼의 웹 프론트엔드 개발",
            "리덕스를 이용한 상태 관리",
            "react-query를 이용한 서버 상태 캐싱",
            "tradingview와 highcharts를 이용한 차트 생성",
          ],
        },
      },
      {
        _id: "1",
        title: "국제표준금거래소",
        link: "https://goodgold.co.kr/",
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
            name: "next(pages)",
            backgroundColor: stacks.next.backgroundColor,
            color: stacks.next.color,
          },
          {
            name: "react",
            backgroundColor: stacks.react.backgroundColor,
            color: stacks.react.color,
          },
          {
            name: "axios",
            backgroundColor: stacks.axios.backgroundColor,
            color: stacks.axios.color,
          },
          {
            name: "react-query",
            backgroundColor: stacks.reactQuery.backgroundColor,
            color: stacks.reactQuery.color,
          },
          {
            name: "highcharts",
            backgroundColor: stacks.highcharts.backgroundColor,
            color: stacks.highcharts.color,
          },
          {
            name: "styled-components",
            backgroundColor: stacks.styledComponents.backgroundColor,
            color: stacks.styledComponents.color,
          },
          {
            name: "jenkins",
            backgroundColor: stacks.jenkins.backgroundColor,
            color: stacks.jenkins.color,
          },
        ],
        teams: ["pm", "be", "fe", "design", "devops"],
        teamworks: ["slack", "confluence", "gitLab", "notion", "figma"],
        descriptions: {
          en: [
            "web frontend development for gold products shopping mall",
            "server states caching by react-query",
            "charts drawn with highcharts",
          ],
          ko: [
            "금제품 쇼핑몰의 웹 프론트엔드 개발",
            "react-query를 이용한 서버 상태 캐싱",
            "highcharts를 이용한 차트 생성",
          ],
        },
      },
    ],
  },
];
