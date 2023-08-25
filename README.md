# 서비스 소개

---

![서비스 설명](https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/a0ce229a-18ef-4daf-b55c-0acff24b8f42)

# 아키텍쳐

---

![아키텍처](https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/c027a98c-fe7b-4b7f-93db-fee827d564a5)

- React.js + vite를 사용하여 프론트엔드 아키텍처 구축하였음.
- 정적 타입의 수퍼셋 TypeScript를 사용하여 코드 유지 보수성 및 확장성 향상시킴.
- Redux-Toolkit을 사용하여 전역 상태를 관리함으로써 Props Drilling 을 개선함.

# 기술적 챌린지

---

<img width="749" alt="챌린지1" src="https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/f5968eda-4de7-45d9-91c2-059f578ed616">

- 뒤로가기 또는 페이지 이동 시 불필요한 API 호출이 반복적으로 발생.
- 브라우저를 이용한 웹 캐시를 구현하여 불필요한 API 호출 감소시킴.
- Web Storage를 이용하여 API 호출 전, 해당 URL에 관한 호출이 최근에 이루어졌는지 확인 후 cache hit 시 해당 데이터를 다시 가져옴.

<img width="760" alt="챌린지2" src="https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/4cae4e03-b9f2-4afd-9d49-fdcf1eeec54c">

- 커밋과 관련된 파일 목록 UI를 구성하는 것에 있어서 다양한 선택지가 존재했지만, 파일 구조를 효과적으로 보여줄 수 있는 트리 자료 구조를 선택.
- 트리 자료 구조로 되어있는 로우 데이터를 재귀적으로 탐색하며, 트리 UI에 적합한 데이터 구조로 가공.
- 가공된 데이터를 Tree 컴포넌트 및 Node 컴포넌트에 바인딩 하여 재귀적으로 렌더링 시킴.
    
<img width="1519" alt="챌린지3" src="https://github.com/DevProfiIe/Dev-Profile-Frontend/assets/128656530/f73168f0-d603-45a4-8431-5be6f2618b06">
    
- 라이브러리를 사용하지 않고, 스크롤 이벤트와 타이머 함수를 이용하여 인터렉티브한 페이지 구현.
- 목적에 적합한 디자인을 채택하여 더 나은 UI/UX를 제공함.






