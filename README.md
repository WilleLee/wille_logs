# Wille logs v2.0.0

## 개발 명세

<a  href="https://docs.google.com/presentation/d/1PcN8LeZvUc7AFdF8_p4HjTP1PfoJVcXAMg9kTAUOaOQ/edit#slide=id.p" target="_blank">

![development plans](https://img.shields.io/badge/기획%20슬라이드-FBBC04?style=flat-square&logo=googleslides&logoColor=000000)

</a>

### 개발 환경

| 분류        |                                                                                                                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 언어/런타임 | ![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=000000) ![typescript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=FFFFFF) |
| 프레임워크  | ![next](https://img.shields.io/badge/Next-000000?style=flat-square&logo=Next.js&logoColor=FFFFFF)                                                                                                                                 |
| 스타일      | ![css](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=FFFFFF) ![tailwind css](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=FFFFFF)              |
| DB          | ![mongo database](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=FFFFFF)                                                                                                                    |
| 테스트      | ![vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=Vitest&logoColor=FFFFFF)                                                                                                                              |
| CI/CD       | ![github actions](https://img.shields.io/badge/Actions-2088FF?style=flat-square&logo=githubactions&logoColor=FFFFFF) ![vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=FFFFFF)         |
| 기획/디자인 | ![google slides](https://img.shields.io/badge/Google%20Slides-FBBC04?style=flat-square&logo=googleslides&logoColor=000000)                                                                                                        |

### 브랜치 전략

- `main`: 서비스 배포
- `dev`: 프리뷰 배포 및 개발/테스트

### 모델

#### User

| 필드      | 타입       |
| --------- | ---------- |
| \_id      | `ObjectId` |
| email     | `string`   |
| password  | `string`   |
| nickname  | `string`   |
| createdAt | `Date`     |

#### Thread

| 필드        | 타입         |
| ----------- | ------------ |
| \_id        | `ObjectId`   |
| title       | `string`     |
| tags        | `ObjectId[]` |
| book        | `object`     |
| book.title  | `string`     |
| book.author | `string`     |
| book.page   | `number`     |
| createdAt   | `Date`       |
| creator     | `ObjectId`   |

#### Tag

| 필드      | 타입         |
| --------- | ------------ |
| \_id      | `ObjectId`   |
| name      | `string`     |
| threads   | `ObjectId[]` |
| usedCount | `number`     |

### API

#### `/users`

- `GET /users`: 유저 정보 조회
- `POST /users`: 회원가입
- `DELETE /users`: 회원탈퇴
- `POST /users/login`: 로그인

#### `/threads`

- `GET /threads`: 스레드 목록 조회
- `POST /threads`: 스레드 생성
- `GET /threads/:id`: 스레드 조회
- `DELETE /threads/:id`: 스레드 삭제

#### `/tags`

- `GET /tags`: 태그 목록 조회
- `GET /tags/:id`: 태그 조회

### 페이지

- `GET /`: 메인 페이지
- `GET /login`: 로그인 페이지
- `GET /signup`: 회원가입 페이지
- `GET /thread/:id`: 스레드 상세 페이지
- `GET /my`: 마이 페이지

### 페이지 별 유즈케이스

- 메인 페이지
  - 스레드 목록 조회
  - 태그 목록 조회
- 로그인 페이지
  - 로그인
- 회원가입 페이지
  - 회원가입
- 스레드 상세 페이지
  - 스레드 조회
  - 스레드 삭제
- 마이 페이지
  - 로그아웃
  - (추후) 회원탈퇴

## 트러블슈팅
