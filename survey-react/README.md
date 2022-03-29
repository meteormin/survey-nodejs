# React

## 개요

- 요구사항에 필요한 화면들을 구현하여
- Express로 구현한 백엔드 API 서버에서 데이터를 조회하거나 입력한다.

## 구성
- survey-react 라이브러리를 통한 메인 기능 구현
- react-ace 라이브러리를 통한 JSON 에디터 구현
- 라우팅은 react-router-dom을 사용했다.

### 디렉토리 구조

- App.js: 최상위 루트 컴포넌트
- index.js: react-dom으로 부터 컴포넌트 렌더링(시작점)
- config.js: 설정 파일
- Routes.js: 라우팅 및 네이게이션
- page: controller 역할, 화면에 필요한 컴포넌트에게 파라미터를 넘겨 주고 생성된 컴포넌트들을 리턴한다.
- components: 컴포넌트들의 집합
  - layouts: 기본 레이아웃 관련 컴포넌트(뼈대)
  - result: 설문 결과 관련 컴포넌트들
  - survey: 설문지 생성 관련 컴포넌트들
