import { useRef, useState } from 'react';
import {
  GallaryBtn,
  GallaryBtnWrapper,
  GallaryContactBox,
  GallaryContent,
  GallaryContentsWrapper,
  GallaryDetails,
  GallaryDropBox,
  GallaryFilterBox,
  GallaryFilterBtnWrapper,
  GallaryFilterContent,
  GallaryFilterDropMenu,
  GallaryFilterWrapper,
  GallaryHeader,
  GallaryItem,
  GallaryItemImg,
  GallaryItemText,
  GallaryTag,
  GallaryWrapper,
  HeightBox,
  StackTag,
} from './gallary.styles';
import { css } from '@emotion/react';
import { useGetBoardQuery } from '~/redux/api';
import { ArrowIosDownward } from 'emotion-icons/evaicons-solid';
import { Close } from 'emotion-icons/evil';

interface Item {
  id: string;
  contents: string;
  name: string;
  stack: string[];
}

interface StackItem {
  id: number;
  name: string;
  sorted: string;
}

const Gallary = () => {
  const [item, _setItem] = useState<Item[]>([
    {
      id: '1',
      contents: '데이터의 속삭임: 코드로 이야기하는 개발자 Park Yun Chan.',
      name: 'dbscks97',
      stack: ['Spring', 'C#', 'JavaScript'],
    },
    {
      id: '2',
      contents: '알고리즘 마법사: 코딩의 미래를 이끄는 개발자 YoonpyoHong.',
      name: 'YoonpyoHong',
      stack: ['React', 'TypeScript', 'Angular'],
    },
    {
      id: '3',
      contents: '오류의 명인: 불완전함을 완성시키는 개발자 cocounni',
      name: 'cocounni',
      stack: ['C', 'Java', 'React'],
    },
    {
      id: '3',
      contents: '오류의 명인: 불완전함을 완성시키는 개발자 cocounni',
      name: 'cocounni',
      stack: ['C', 'Java', 'React'],
    },
  ]);
  const [newItem, setNewItem] = useState<Item[]>([]);
  const [isShowContactbox, setIsShowContactBox] = useState<boolean>(false);
  const [isShowStackBox, setIsShowStackBox] = useState<boolean>(false);
  const [isShowTagBox, setIsShowTagBox] = useState<boolean>(false);
  const [isShowSortBox, setIsShowSortBox] = useState<boolean>(false);
  const [selectedStack, setSelectedStack] = useState<StackItem[]>([]);
  const [positionX, setPositionX] = useState<number>(3);
  const termRef = useRef<HTMLButtonElement>(null);
  const [tempTerm, setTempTerm] = useState<number>(0);
  const [term, setTerm] = useState<number>(0);
  const stacks = [
    {
      id: 1,
      name: 'JavaScript',
      sorted: 'frontend',
    },
    {
      id: 2,
      name: 'JAVA',
      sorted: 'backend',
    },
    {
      id: 3,
      name: 'Pytyon',
      sorted: 'backend',
    },
    {
      id: 4,
      name: 'React',
      sorted: 'frontend',
    },
    {
      id: 5,
      name: 'Angular',
      sorted: 'frontend',
    },
    {
      id: 6,
      name: 'Vue',
      sorted: 'frontend',
    },
    {
      id: 7,
      name: 'TypeScript',
      sorted: 'frontend',
    },
  ];

  /**
   *
   * @param selectedTag
   * @returns
   */
  const stackClickHandler = (selectedTag: StackItem) => {
    const isExist = findTag(selectedTag);

    if (isExist) {
      const newTags = selectedStack.filter((item) => item.id !== selectedTag.id);

      setSelectedStack([...newTags]);
      return;
    }

    setSelectedStack([...selectedStack, { ...selectedTag }]);
  };

  /**
   *
   * @param insertTag
   * @returns
   */
  const findTag = (insertTag: StackItem): boolean => {
    const tag = selectedStack?.find((item) => item.id === insertTag.id);

    return tag ? true : false;
  };

  /**
   *
   */
  const showDropMenuHandler = (type: 'sort' | 'tag' | 'stack') => {
    if (type === 'sort') {
      setIsShowSortBox((state) => !state);
      setIsShowTagBox(false);
      setIsShowStackBox(false);
    } else if (type === 'tag') {
      setIsShowTagBox((state) => !state);
      setIsShowSortBox(false);
      setIsShowStackBox(false);
    } else {
      setIsShowStackBox((state) => !state);
      setIsShowTagBox(false);
      setIsShowSortBox(false);
      setTempTerm(term);
      if (term === 0) {
        setPositionX(3);
      } else {
        setPositionX(10 * term);
      }
    }
  };

  /**
   *
   * @param e
   * @param id
   */
  const dranOnHandler = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setIsShowContactBox(true);
    e.dataTransfer.setData('text/plain', id);
  };

  /**
   *
   * @param e
   */
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  /**
   *
   * @param e
   */
  const dragDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const id: string = e.dataTransfer.getData('text/plain').toString();

    setNewItem([
      ...newItem,
      {
        id: id,
        contents: `Item ${id}`,
        name: 'new',
        stack: ['React'],
      },
    ]);
  };

  /**
   *
   * @param e
   */
  const termClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const elementWidth = termRef.current?.clientWidth;
    const clickedX = e.nativeEvent.offsetX;
    setPositionX(Math.ceil((clickedX / elementWidth) * 100));
    setTempTerm(Math.ceil(((clickedX / elementWidth) * 100) / 12));
  };

  return (
    <GallaryWrapper>
      <HeightBox height='1.5rem' />
      <GallaryFilterWrapper>
        <div
          css={css`
            display: flex;
            align-items: center;
            font-size: 1.5rem;
          `}
        >
          <div
            css={css`
              border-right: 3px solid #eee;
              padding-right: 2rem;
              position: relative;
            `}
          >
            <GallaryFilterContent gap='0 1.2rem'>
              <p>전체</p>
              <GallaryFilterBtnWrapper
                onClick={() => {
                  showDropMenuHandler('sort');
                }}
              >
                <ArrowIosDownward size={20}></ArrowIosDownward>
              </GallaryFilterBtnWrapper>
            </GallaryFilterContent>
            {isShowSortBox && (
              <GallaryFilterDropMenu width='10rem' height='5rem'>
                <ul
                  css={css`
                    display: flex;
                    flex-flow: column nowrap;
                    gap: 1rem 0;
                    font-size: 1rem;
                    color: #aaa;
                  `}
                >
                  <li>전체</li>
                  <li>프론트엔드</li>
                  <li>백엔드</li>
                  <li>모바일</li>
                  <li>AI</li>
                </ul>
              </GallaryFilterDropMenu>
            )}
          </div>
          <div
            css={css`
              padding-left: 2rem;
              position: relative;
            `}
          >
            <GallaryFilterContent gap='0 1.2rem'>
              <p>태그</p>
              <GallaryFilterBtnWrapper
                onClick={() => {
                  showDropMenuHandler('tag');
                }}
              >
                <ArrowIosDownward size={20}></ArrowIosDownward>
              </GallaryFilterBtnWrapper>
            </GallaryFilterContent>
            {isShowTagBox && (
              <GallaryFilterDropMenu width='30rem' height='10rem'>
                <div
                  css={css`
                    display: flex;
                    flex-flow: row wrap;
                    align-content: flex-start;
                    width: 100%;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                  `}
                >
                  {stacks.map((item) => (
                    <StackTag border={findTag(item)} key={item.id}>
                      {item.name}
                    </StackTag>
                  ))}
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    width: 100%;
                    height: 3rem;
                    position: relative;
                    border-bottom: 1px solid #ececec;
                  `}
                ></div>
                <div
                  css={css`
                    height: 1rem;
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    gap: 0 1rem;
                    font-size: 0.875rem;
                  `}
                >
                  <button
                    onClick={() => {
                      setIsShowTagBox(false);
                    }}
                  >
                    {' '}
                    취소
                  </button>
                  <button onClick={() => {}}>적용하기</button>
                </div>
              </GallaryFilterDropMenu>
            )}
          </div>
        </div>
        <div
          css={css`
            display: flex;
            gap: 0 1rem;
          `}
        >
          {/* <div>after items</div> */}
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              gap: 0 0.7rem;
              align-items: center;
              position: relative;
            `}
          >
            <GallaryFilterBox
              onClick={() => {
                showDropMenuHandler('stack');
              }}
            >
              <GallaryFilterContent gap='0'>
                <p>기술 스택</p>
                <p
                  css={css`
                    display: flex;
                    gap: 0 0.5rem;
                    color: #189bfa;
                  `}
                >
                  {selectedStack?.map((item, i) => (
                    <span key={i}>{item.name}</span>
                  ))}
                </p>
              </GallaryFilterContent>
            </GallaryFilterBox>
            {isShowStackBox && (
              <GallaryFilterDropMenu width='30rem' height='10rem'>
                <div
                  css={css`
                    display: flex;
                    flex-flow: row wrap;
                    align-content: flex-start;
                    width: 100%;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                  `}
                >
                  {stacks.map((item) => (
                    <StackTag border={findTag(item)} key={item.id}>
                      {item.name}
                    </StackTag>
                  ))}
                </div>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 3rem;
                    position: relative;
                    border-top: 1px solid #ececec;
                  `}
                >
                  <button
                    css={css`
                      width: 100%;
                      height: 10px;
                      border-radius: 999px;
                      background-color: #ececec;
                    `}
                    ref={termRef}
                    onClick={termClickHandler}
                  ></button>
                  <button
                    css={css`
                      width: ${positionX}%;
                      height: 10px;
                      border-radius: 999px;
                      background-color: #189bfa;
                      position: absolute;
                    `}
                    onClick={termClickHandler}
                  >
                    <p
                      css={css`
                        width: 25px;
                        height: 25px;
                        background-color: white;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        border-radius: 999px;
                        pointer: cursor;
                        border: 5px solid #189bfa;
                      `}
                    ></p>
                  </button>
                </div>
                <div
                  css={css`
                    height: 1rem;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.875rem;
                    border-top: 1px solid #ececec;
                    padding: 1rem 0;
                  `}
                >
                  <p>선택한 스택 : {tempTerm} 개월</p>
                  <div
                    css={css`
                      display: flex;
                      gap: 0 0.5rem;
                    `}
                  >
                    <button
                      onClick={() => {
                        setIsShowStackBox(false);
                      }}
                    >
                      {' '}
                      취소
                    </button>
                    <button
                      onClick={() => {
                        setTerm(tempTerm);
                      }}
                    >
                      적용하기
                    </button>
                  </div>
                </div>
              </GallaryFilterDropMenu>
            )}
            <StackTag color='#189bfa' border={false}>
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  align-items: center;
                  gap: 0 0.5rem;
                `}
              >
                <p>스택 : 6개월 이상</p>
                <Close size={15} />
              </div>
            </StackTag>
          </div>

          {/* <div>after items</div> */}
        </div>
      </GallaryFilterWrapper>
      <HeightBox height='3rem' />
      <GallaryContentsWrapper>
        {item.map((item, i) => (
          <GallaryItem key={i}>
            <GallaryHeader>
              <p>스택</p>
            </GallaryHeader>
            <GallaryContent>
              <GallaryItemImg>
                <img src='' alt='' />
              </GallaryItemImg>
              <h2
                css={css`
                  width: 100%;
                  font-size: 1.75rem;
                  font-weight: 700;
                  padding: 0.5rem 0;
                  text-align: right;
                  line-height: 1.3;
                `}
              >
                이성헌
              </h2>
              <p
                css={css`
                  width: 100%;
                  font-siee: 1.2rem;
                  text-align: right;
                  margin-bottom: 2rem;
                `}
              >
                프론트엔드 개발자
              </p>
              <GallaryItemText>
                <GallaryTag>#알고리즘 귀재</GallaryTag>
                <GallaryTag>#모듈의 장악자</GallaryTag>
                <GallaryTag>#설명충</GallaryTag>
              </GallaryItemText>
              <GallaryDetails>
                <div>
                  <p
                    css={css`
                      margin-bottom: 0.5rem;
                      font-size: 0.875rem;
                    `}
                  >
                    레포지토리
                  </p>
                  <p
                    css={css`
                      font-size: 1.125rem;
                      font-weight: 700;
                    `}
                  >
                    12
                  </p>
                </div>
                <div>
                  <p
                    css={css`
                      margin-bottom: 0.5rem;
                      font-size: 0.875rem;
                    `}
                  >
                    커밋
                  </p>
                  <p
                    css={css`
                      font-size: 1.125rem;
                      font-weight: 700;
                    `}
                  >
                    230
                  </p>
                </div>
                <div>
                  <p
                    css={css`
                      margin-bottom: 0.5rem;
                      font-size: 0.875rem;
                    `}
                  >
                    기간
                  </p>
                  <p
                    css={css`
                      font-size: 1.125rem;
                      font-weight: 700;
                    `}
                  >
                    6
                  </p>
                </div>
              </GallaryDetails>
              <GallaryBtnWrapper>
                <GallaryBtn
                  css={css`
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                  `}
                  bgColor='#6366f1'
                >
                  분석보기
                </GallaryBtn>
                <GallaryBtn
                  css={css`
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                  `}
                  bgColor='#7375f2'
                >
                  PDF 출력
                </GallaryBtn>
              </GallaryBtnWrapper>
            </GallaryContent>
          </GallaryItem>
        ))}
      </GallaryContentsWrapper>
      <GallaryContactBox
        isShow={isShowContactbox}
        onDrop={(e) => {
          dragDropHandler(e);
        }}
        onDragOver={(e) => dragOverHandler(e)}
      >
        <GallaryDropBox>
          {/* {newItem?.map((elem, i) => (
            <GallaryItemInBox key={elem.id} index={i + 1}>
              <GallaryImage />
              <GallaryTextBox>
                <GallaryTextLeft></GallaryTextLeft>
                <GallaryBtn>
                  <IosArrowRight height={25} />
                </GallaryBtn>
              </GallaryTextBox>
            </GallaryItemInBox>
          ))} */}
        </GallaryDropBox>
      </GallaryContactBox>
    </GallaryWrapper>
  );
};

export default Gallary;
