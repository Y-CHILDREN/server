<h1 align="center">
</h1>

<h1 align="center">
<!-- 배포후 도메인 href에 작성해주시면 될 거 같아요! -->
  <a href="" style="color:#3ACC97"> Trip J - server </a>
</h1>

<h3 align="center">여행을 J처럼!</h3>

<p align="center">

  <img alt="Stars" src="https://img.shields.io/github/stars/Y-CHILDREN/server?style=social">
  
  <a href="https://github.com/Y-CHILDREN/server">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Y-CHILDREN/server">
  </a>
  
  <a href="https://github.com/Y-CHILDREN">
    <img alt="made by Y-CHILDREN" src="https://img.shields.io/badge/made%20by-Y--CHILDREN-blueviolet">
  </a>
</p>

<h4 align="center"> 
	 Status: Finished
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> •  
</p>

## About

**Trip J**는 여행 일정 계획을 시각적으로 쉽게 생성하고 관리할 수 있도록 돕는 웹 애플리케이션입니다.

---

## How it works

이 프로젝트는 다음과 같은 두 부분으로 나뉩니다:

1. Backend (현재 repository)
2. Frontend (**client** repository)

> 이 repository는 **백엔드** 전용이며, 프론트엔드와 연동하여 사용할 수 있습니다.

### 1. repository clone

```bash
$ git clone https://github.com/Y-CHILDREN/server.git
```

### 2. 프로젝트 폴더 이동

```bash
$ cd server
```

### 3. 의존성 설치

```bash
$ pnpm install
```

### 4. 환경 변수 설정

`.env` 파일을 프로젝트 루트에 생성하고 필요한 환경 변수를 설정합니다.

```
PORT=3000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. 개발 서버 실행

```bash
$ npm run dev
```

기본적으로 http://localhost:3000 에서 서버가 실행됩니다.

## Tech Stack

### 🧠 Language & Type Safety

| 기술                                              | 설명                                   | 배지                                                                                                                                         |
| ------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [**TypeScript**](https://www.typescriptlang.org/) | 정적 타입을 지원하는 JavaScript 슈퍼셋 | [![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat)](https://www.typescriptlang.org/) |

### 🧩 **Backend Framework & Libraries**

| 기술                                             | 설명                       | 배지                                                                                                                       |
| ------------------------------------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [**Express**](https://expressjs.com/)            | 웹 애플리케이션 프레임워크 | [![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white&style=flat)](https://expressjs.com/) |
| [**cors**](https://github.com/expressjs/cors)    | CORS 미들웨어              | [![cors](https://img.shields.io/badge/-cors-000000?style=flat)](https://github.com/expressjs/cors)                         |
| [**dotenv**](https://github.com/motdotla/dotenv) | 환경 변수 관리             | [![dotenv](https://img.shields.io/badge/-dotenv-000000?style=flat)](https://github.com/motdotla/dotenv)                    |

### 🧪 **Development & Testing**

| 기술                                 | 설명                  | 배지                                                                                                                        |
| ------------------------------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [**Vitest**](https://vitest.dev/)    | 테스팅 프레임워크     | [![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?logo=vitest&logoColor=white&style=flat)](https://vitest.dev/)        |
| [**Nodemon**](https://nodemon.io/)   | 자동 서버 재시작 도구 | [![Nodemon](https://img.shields.io/badge/-Nodemon-76D04B?logo=nodemon&logoColor=white&style=flat)](https://nodemon.io/)     |
| [**ESLint**](https://eslint.org/)    | 코드 린팅 도구        | [![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white&style=flat)](https://eslint.org/)        |
| [**Prettier**](https://prettier.io/) | 코드 포맷팅 도구      | [![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=white&style=flat)](https://prettier.io/) |

> See the file [package.json](https://github.com/Y-CHILDREN/server/blob/main/package.json)

---

### 🧱 **Architecture**

| 설계 방식              | 설명                                                                   |
| ---------------------- | ---------------------------------------------------------------------- |
| **Clean Architecture** | 클린 아키텍처 기반 설계로, 관심사의 분리와 테스트 용이성을 고려한 구조 |

<p align="center">
  <img src="/public/CleanArchitecture.jpg" width="600"/>
</p>
