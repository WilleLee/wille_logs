import newlinkLogo from "@images/newlink_logo.png";

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
  imageSrc: string;
  startDate: string;
  endDate: string;
  projects: ICareerProject[];
}

export const careers = [
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
            backgroundColor: "#f7df1e",
            color: "#000000",
          },
          {
            name: "scss",
            backgroundColor: "#c6538c",
            color: "#ffffff",
          },
        ],
        stacks: [
          {
            name: "next(pages)",
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          {
            name: "react",
            backgroundColor: "#61dafb",
            color: "#000000",
          },
          {
            name: "axios",
            backgroundColor: "#61dafb",
            color: "#000000",
          },
          {
            name: "react-query",
            backgroundColor: "#61dafb",
            color: "#000000",
          },
          {
            name: "highcharts",
            backgroundColor: "#614051",
            color: "#ffffff",
          },
          {
            name: "styled-components",
            backgroundColor: "#db7093",
            color: "#ffffff",
          },
          {
            name: "jenkins",
            backgroundColor: "#000000",
            color: "#ffffff",
          },
        ],
        teams: ["pm", "be", "fe", "design", "devOps", "qa"],
        teamworks: ["slack", "jira", "confluence", "gitLab", "notion", "figma"],
        descriptions: {
          en: [
            "web frontend development for cryptocurrency exchangement platform",
            "state management with redux",
            "charts drawn with tradingview and highcharts",
          ],
          ko: [
            "암호화폐 거래소 플랫폼의 웹 프론트엔드 개발",
            "리덕스를 이용한 상태 관리",
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
            backgroundColor: "#f7df1e",
            color: "#000000",
          },
          {
            name: "scss",
            backgroundColor: "#c6538c",
            color: "#ffffff",
          },
        ],
        stacks: [
          {
            name: "next(pages)",
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          {
            name: "react",
            backgroundColor: "#61dafb",
            color: "#000000",
          },
          {
            name: "redux",
            backgroundColor: "#764abc",
            color: "#ffffff",
          },
          {
            name: "axios",
            backgroundColor: "#61dafb",
            color: "#000000",
          },
          {
            name: "react-query",
            backgroundColor: "#61dafb",
            color: "#000000",
          },
          {
            name: "highcharts",
            backgroundColor: "#614051",
            color: "#ffffff",
          },
          {
            name: "tradingview",
            backgroundColor: "#61dafb",
            color: "#000000",
          },
          {
            name: "websocket",
            backgroundColor: "#61dafb",
            color: "#000000",
          },
          {
            name: "styled-components",
            backgroundColor: "#db7093",
            color: "#ffffff",
          },
          {
            name: "jenkins",
            backgroundColor: "#000000",
            color: "#ffffff",
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
