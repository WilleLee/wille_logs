import newlinkLogo from "@images/newlink_logo.png";
import { StaticImageData } from "next/image";
import { IProject } from "../ProjectsContent/projects";

// export interface IProject {
//   title: string;
//   link: string;
//   techStack: string[];
//   descriptions: string[];
// }

export interface ICareer {
  _id: string;
  company: string;
  position: string;
  imageSrc: StaticImageData;
  startDate: string;
  endDate: string;
  projects: IProject[];
}

export const careers: ICareer[] = [
  {
    _id: "0",
    company: "newlink",
    position: "frontend junior",
    imageSrc: newlinkLogo,
    startDate: "2023.01",
    endDate: "2023.10",
    projects: [
      {
        _id: "0",
        title: "cashierest",
        link: "http://www.cashierest.com/",
        techStack: ["javascript", "react", "next(pages)", "redux"],
        descriptions: [
          "web frontend development for cryptocurrency exchangement platform",
          "state management with redux",
          "charts drawn with tradingview and highcharts",
        ],
      },
      {
        _id: "1",
        title: "국제표준금거래소",
        link: "https://goodgold.co.kr/",
        techStack: ["javascript", "react", "next(pages)", "react-query"],
        descriptions: [
          "web frontend development for gold products shopping mall",
          "server state management with react-query",
          "charts drawn with highcharts",
        ],
      },
    ],
  },
];
