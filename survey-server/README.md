# NodeJS - Express

## 개요
- NodeJS 백엔드 API 구현
- DB 접근 및 조작
  - 요구사항에 따라 C(create), R(read) 기능만 사용

## 구성
> 해당 소스는 es6 이상 문법을 사용하기 위하여 babel 라이브러리를 통해 일련의 컴파일 과정을 거친다.

### 디렉토리 구조(MVC 패턴)
- public(뷰 관련)
  - 현재 API 서버이기 때문에 view를 사용하지 않아 필요 없지만, 최초 서버 구동 시 동작 확인용
- src
  - bin/www.js: 서버 구동
  - configs: 설정 파일
  - controllers: 컨트롤러
  - models: DB 접근용 모델
  - routes: 라우팅
  - utils: 유틸리티

### 특이사항 / 부가설명
- MVC 패턴과 객체지향적으로 구조를 설계하려다 보니 의존성 주입에 대한 이슈가 발생
- utils/container.js와 utils/register.js 를 통해 이를 해결

**utils/container.js**
- 생성할 객체의 의존성을 주입해주는 컨테이너 역할을 수행한다.

**utils/register.js**
- 완전 자동화는 별도의 라이브러리로도 처리 가능하지만 이 프로젝트에서는 굳이 사용할 필요성을 못느겼다.
- 해당 파일에 container를 통해 주입 해줘야할 객체 및 생성자 파라미터를 미리 정의해 두고 사용

