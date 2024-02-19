import newlinkLogo from "@images/newlink_logo.png";
import { StaticImageData } from "next/image";
import { IProject } from "../ProjectsContent/projects";

export interface ICareer {
  _id: string;
  company: string;
  position: string[];
  imageSrc: StaticImageData;
  startDate: string;
  endDate: string;
  projects: IProject[];
}

export const careers: ICareer[] = [
  {
    _id: "0",
    company: "newlink",
    position: ["frontend, junior", "프론트엔드, 사원"],
    imageSrc: newlinkLogo,
    startDate: "2023.01",
    endDate: "2023.10",
    projects: [
      {
        _id: "0",
        title: "cashierest",
        link: "http://www.cashierest.com/",
        techStack: ["javascript", "react", "next(pages)", "redux"],
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
        techStack: ["javascript", "react", "next(pages)", "react-query"],
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
