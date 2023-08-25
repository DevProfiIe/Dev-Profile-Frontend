# 서비스 소개

![서비스 설명](https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/a0ce229a-18ef-4daf-b55c-0acff24b8f42)

# 아키텍쳐

![아키텍처](https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/c027a98c-fe7b-4b7f-93db-fee827d564a5)

* React.js + vite를 사용하여 프론트엔드 아키텍처 구축하였음.
* 정적 타입의 수퍼셋 TypeScript를 사용하여 코드 유지 보수성 및 확장성 향상시킴.
* Redux-Toolkit을 사용하여 전역 상태를 관리함으로써 Props Drilling 을 개선함.

# 기술적 챌린지

## 브라우저를 활용한 웹 캐시 기능

![Group 18](https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/f240343c-6f5a-4bed-97fd-94304c2e15c2)

* 뒤로가기 또는 페이지 이동 시 불필요한 API 호출이 반복적으로 발생.
* 브라우저를 이용한 웹 캐시를 구현하여 불필요한 API 호출 감소시킴.
* Web Storage를 이용하여 API 호출 전, 해당 URL에 관한 호출이 최근에 이루어졌는지 확인 후 cache hit 시 해당 데이터를 다시 가져옴.

## 트리 구조를 활용한 파일 구조 렌더링

![Group 19](https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/bd20d731-de58-4b6b-a5fc-a8820eb7b88e)

* 커밋과 관련된 파일 목록 UI를 구성하는 것에 있어서 다양한 선택지가 존재했지만, 파일 구조를 효과적으로 보여줄 수 있는 트리 자료 구조를 선택.
* 트리 자료 구조로 되어있는 로우 데이터를 재귀적으로 탐색하며, 트리 UI에 적합한 데이터 구조로 가공.
* 가공된 데이터를 Tree 컴포넌트 및 Node 컴포넌트에 바인딩 하여 재귀적으로 렌더링 시킴.

## 인터렉티브 웹사이트 구현    

![Group 20](https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/62930a66-6014-4b6e-830b-9aafab2095a8)
    
* 라이브러리를 사용하지 않고, 스크롤 이벤트와 타이머 함수를 이용하여 인터렉티브한 페이지 구현.
* 애플리케이션의 목적에 적합한 디자인을 채택하여 더 나은 UI/UX를 제공함.

# 시연 동영상

<a href="https://drive.google.com/file/d/1EfHRAl9pGrDliwnOsVW0BLuGR3jCOdWJ/view" target="_blank">시연 동영상 링크</a>

# 실행 방법

* 의존성 패키지 설치
  
   ```yarn install```
  
* 로컬에서 실행

   ```yarn start```
