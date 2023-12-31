import { useEffect, useRef, useState } from 'react';
import {
  GallaryBtn,
  GallaryBtnWrapper,
  GallaryContent,
  GallaryContentsWrapper,
  GallaryDetails,
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
  ScrollBtn,
  StackTag,
} from './gallary.styles';
import { css } from '@emotion/react';
import { useGetBoardQuery, useGetBoardSortDataQuery, usePostBoardItemsMutation } from '~/redux/api';
import { ArrowIosDownward, ArrowIosUpward } from 'emotion-icons/evaicons-solid';
import { Close } from 'emotion-icons/evil';
import {
  GetBoardDataDetails,
  GetBoardDataParams,
  GetBoardSortDataKeywordDetail,
  GetBoardSortDataSkiisDetail,
  PostBoardQueryData,
  SkillFilterDetails,
  UserGithubInfo,
} from '~/redux/api/types';
import Loader from '~/components/loader/Loader';
import { useInView } from 'react-intersection-observer';
import { MailSend } from 'emotion-icons/remix-fill';
import { Send } from 'emotion-icons/feather';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/redux/store';
import { change } from '~/redux/features/searchSlice';
import { getCookie } from '~/utils/cookie';
import { iconList } from '~/utils/icon';
import { showMessages } from '~/redux/features/popupSlice';
import { color } from '~/styles/theme/primary';

const sortList = [
  {
    id: 0,
    sort: '',
    name: '전체',
  },
  {
    id: 1,
    sort: 'webFrontend',
    name: '프론트엔드',
  },
  {
    id: 2,
    sort: 'webBackend',
    name: '백엔드',
  },
  {
    id: 3,
    sort: 'game',
    name: '게임',
  },
  {
    id: 4,
    sort: 'ai',
    name: 'AI',
  },
];

const Gallary = () => {
  const token = getCookie('token');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isShowStackBox, setIsShowStackBox] = useState<boolean>(false);
  const [isShowTagBox, setIsShowTagBox] = useState<boolean>(false);
  const [isShowSortBox, setIsShowSortBox] = useState<boolean>(false);
  const [isShowShareBox, setIsShowShareBox] = useState<boolean>(false);
  const [sendBoardItems, setSendBoardItems] = useState<PostBoardQueryData>({
    sendUserLogin: '',
    receiveUserLogin: '',
    boardUserLogin: [],
    filterKeyword: [],
    filterSkill: [],
  });
  const [selectedSkills, setSelectedSkills] = useState<SkillFilterDetails[]>([]);
  const [tmpSkills, setTmpSkills] = useState<SkillFilterDetails>({
    name: '',
    duration: 0,
    sort: '',
  });
  const [positionX, setPositionX] = useState<number>(3);
  const termRef = useRef<HTMLButtonElement>(null);
  const [term, _setTerm] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedKeywords, setSelectedKeywords] = useState<GetBoardSortDataKeywordDetail[]>([]);
  const [getBoardParams, setGetBoardParams] = useState<GetBoardDataParams>({
    lang: [],
    frame: [],
    keywordsFilter: [],
    field: '',
    page: 1,
  });

  const [ref, inView] = useInView();
  const [nowPage, setNowPage] = useState<number>(1);

  const boardSortData = useGetBoardSortDataQuery({});

  const currentBoardData = useGetBoardQuery({
    ...getBoardParams,
    page: nowPage,
  });

  const [postBoardItems] = usePostBoardItemsMutation();

  const totalNum = currentBoardData.data?.data.total ?? 0;

  const [boardItems, setBoardItems] = useState<GetBoardDataDetails[]>([]);

  const stacks = boardSortData.data?.data.skills ?? [];
  const keyword = boardSortData.data?.data.keyword ?? [];

  const [selectedGallaryItems, setSelectedGallaryItems] = useState<GetBoardDataDetails[]>([]);
  const [hoveredItem, setHoveredItem] = useState<GetBoardSortDataKeywordDetail | null>(null);

  /**
   * 필터 버튼 클릭 핸들러 함수
   * @param type 버튼 타입
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
      setTmpSkills({
        name: '',
        duration: 0,
        sort: 'framework',
      });
      if (term === 0) {
        setPositionX(3);
      } else {
        setPositionX(10 * term);
      }
    }
  };

  /**
   * 기간 설정 클릭 이벤트 핸들러
   * @param e 마우스 이벤트
   */
  const termClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const elementWidth = termRef.current?.clientWidth ?? 0;
    const clickedX = e.nativeEvent.offsetX;
    setPositionX(Math.ceil((clickedX / elementWidth) * 100));
    setTmpSkills({
      name: tmpSkills.name,
      duration: Math.ceil(((clickedX / elementWidth) * 100) / 9),
      sort: tmpSkills.sort,
    });
  };

  /**
   * 스택 설정 클릭 이벤트 핸들러
   * @param skill
   */
  const clickSkillHandler = (skill: GetBoardSortDataSkiisDetail) => {
    setTmpSkills({
      name: skill.name,
      duration: tmpSkills.duration,
      sort: skill.sort,
    });
  };

  /**
   * 스킬 추가 핸들러
   */
  const addSkillHandler = () => {
    if (tmpSkills.name === '') {
      return;
    }

    const isExist = selectedSkills.some((item) => item.name === tmpSkills.name);

    if (isExist) {
      return;
    }

    setSelectedSkills(() => {
      parseSkillsParams([...selectedSkills, tmpSkills]);
      return [...selectedSkills, tmpSkills];
    });
    setIsShowStackBox(false);
  };

  /**
   * 스킬 삭제 핸들러
   * @param skill
   */
  const deleteSkillHandler = (skill: SkillFilterDetails) => {
    const newSelectedSkills = selectedSkills.filter((item) => item.name !== skill.name);
    setSelectedSkills([...newSelectedSkills]);

    if (skill.sort === 'framework') {
      const foundIndex = getBoardParams.frame.findIndex((_item, i) => {
        return _item === skill.name && getBoardParams.frame[i + 1] === skill.duration.toString();
      });

      const newBoardSkillParams = getBoardParams.frame.filter((_item, i) => {
        if (i !== foundIndex && i !== foundIndex + 1) {
          return _item;
        }
      });
      setSelectedGallaryItems([]);
      setGetBoardParams((state) => {
        return {
          ...state,
          frame: [...newBoardSkillParams],
        };
      });
    } else {
      const foundIndex = getBoardParams.lang.findIndex((_item, i) => {
        return _item === skill.name && getBoardParams.lang[i + 1] === skill.duration.toString();
      });

      const newBoardSkillParams = getBoardParams.lang.filter((_item, i) => {
        if (i !== foundIndex && i !== foundIndex + 1) {
          return _item;
        }
      });

      setNowPage(1);
      setSelectedGallaryItems([]);
      setGetBoardParams((state) => {
        return {
          ...state,
          lang: [...newBoardSkillParams],
        };
      });
    }
  };

  /**
   * 태그 선택 여부
   * @param keyword
   * @returns
   */
  const findTag = (keyword: GetBoardSortDataKeywordDetail): boolean => {
    const isExist = selectedKeywords.some((item) => item.num === keyword.num);

    return isExist;
  };

  /**
   * 분류 설정 클릭 핸들러
   * @param sort
   */
  const clickSortHandler = (sort: string) => {
    setSelectedSort(sort);
    setIsShowSortBox(false);
    setNowPage(1);
    setSelectedGallaryItems([]);
    setGetBoardParams({
      ...getBoardParams,
      field: sort,
    });
  };

  /**
   * 키워드 설정 클릭 핸들러
   * @param keyword
   */
  const clickKeywordHandler = (keyword: GetBoardSortDataKeywordDetail) => {
    const isExist = selectedKeywords.some((item) => item.num === keyword.num);

    if (isExist) {
      deleteKeywordHandler(keyword.num);
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  /**
   * 키워드 설정 삭제 핸들러
   * @param keyword
   */
  const deleteKeywordHandler = (keywordId: number) => {
    const newSelectedKeywords = selectedKeywords.filter((item) => item.num !== keywordId);
    const newGetBoardParamsKeyword = selectedKeywords
      .filter((item) => item.num !== keywordId)
      .map((item) => item.num);

    setSelectedKeywords([...newSelectedKeywords]);
    setNowPage(1);
    setSelectedGallaryItems([]);
    setGetBoardParams({
      ...getBoardParams,
      keywordsFilter: [...newGetBoardParamsKeyword],
    });
  };

  /**
   * 스킬 파라미터 파싱
   */
  const parseSkillsParams = (arr: SkillFilterDetails[]) => {
    arr.forEach((item) => {
      if (item.sort === 'framework') {
        setNowPage(1);

        setGetBoardParams({
          ...getBoardParams,

          frame: [...getBoardParams.frame, item.name, item.duration.toString()],
        });
      } else if (item.sort === 'lang') {
        setNowPage(1);

        setGetBoardParams({
          ...getBoardParams,

          lang: [...getBoardParams.lang, item.name, item.duration.toString()],
        });
      }
    });
  };

  /**
   * 키워드 적용하기
   */
  const modifyKeywords = () => {
    if (selectedKeywords.length === 0) {
      setIsShowTagBox(false);
      return;
    }

    const newArr = selectedKeywords.map((item) => item.num);
    setNowPage(1);
    setGetBoardParams({
      ...getBoardParams,
      keywordsFilter: [...newArr],
    });

    setSelectedGallaryItems([]);
    setIsShowTagBox(false);
  };

  /**
   * 아이템 별 필드 수정
   * @param field
   * @returns
   */
  const parseField = (field: string): string => {
    if (field === 'webFrontend') {
      return '프론트엔드 개발자';
    } else if (field === 'webBackend' || field === 'systemProgramming') {
      return '백엔드 개발자';
    } else if (field === 'ai') {
      return 'AI 개발자';
    } else if (field === 'database') {
      return '데이터베이스 전문가';
    } else {
      return '게임 개발자';
    }
  };

  /**
   * 공유하기 버튼 클릭 핸들러 함수 (드랍 UI 노출용)
   */
  const clickShareHandler = () => {
    setIsShowShareBox((state) => !state);
  };

  /**
   * 공유 버튼 클릭 핸들러 함수 (아이템 전송)
   */
  const shareBoardItemHandler = () => {
    const selectedCardIds =
      selectedGallaryItems.length === 0
        ? boardItems.map((item) => item.login)
        : selectedGallaryItems.map((item) => item.login);

    const selectedKeywodsFilter = selectedKeywords.map((item) => item.num);
    const selectedSkillsFilter = selectedSkills.map((item) => {
      return item.name + ' ' + item.duration + ' 개월';
    });

    const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '') as UserGithubInfo;

    postBoardItems({
      sendUserLogin: userInfo.login,
      receiveUserLogin: sendBoardItems.receiveUserLogin,
      boardUserLogin: selectedCardIds,
      filterKeyword: selectedKeywodsFilter,
      filterSkill: selectedSkillsFilter,
    })
      .then((res: any) => {
        if (res) {
          setIsShowShareBox((state) => !state);
          setSelectedGallaryItems([]);

          dispatch(
            showMessages({
              msg: '전송이 완료되었습니다.',
              content: 'DevProfile Message',
              type: 'alert',
            }),
          );
        }
      })
      .catch((err) => {
        dispatch(
          showMessages({
            msg: err,
            content: 'DevProfile Api Error',
            type: 'error',
          }),
        );
      });
  };

  /**
   * scroll To Top 핸들러 함수
   */
  const scrollTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * 카드 아이템 클릭 핸들러 함수
   * @param item 클릭한 아이템
   */
  const selectItemHandler = (item: GetBoardDataDetails) => {
    const isExist = selectedGallaryItems.some((resume) => resume.userName === item.userName);

    if (isExist) {
      const newItems = selectedGallaryItems.filter((resume) => resume.userName !== item.userName);

      setSelectedGallaryItems(newItems);
    } else {
      setSelectedGallaryItems((prevState) => {
        return [...prevState, item];
      });
    }
  };

  /**
   * selected item find 함수
   * @param item
   * @returns
   */
  const findSelectedItem = (item: GetBoardDataDetails) => {
    const isExist = selectedGallaryItems.some((resume) => resume.userName === item.userName);

    return isExist;
  };

  /**
   * 분석 보기 버튼 클릭 핸들러 함수
   * @param user
   */
  const navigateResumeHandler = (user: GetBoardDataDetails) => {
    dispatch(change(user.login));
    navigate(`/resume/dbscks97`);
  };

  useEffect(() => {
    if (currentBoardData.isSuccess) {
      if (nowPage <= 1) {
        setBoardItems([...(currentBoardData.data?.data.content ?? [])]);
      } else {
        const newArr = boardItems.slice(); // Make a shallow copy of boardItems
        newArr.splice(newArr.length, 0, ...(currentBoardData.data?.data.content ?? []));

        setBoardItems(newArr);
      }
    }
  }, [currentBoardData.isFetching, currentBoardData.data?.data.content]);

  useEffect(() => {
    if (inView && !currentBoardData.isLoading) {
      const totalNum = currentBoardData.data?.data.total ?? 0;
      const maxPageNum = Math.ceil(totalNum / 20);

      if (nowPage < maxPageNum) {
        setNowPage((prevState) => prevState + 1);
      }
    }
  }, [inView, currentBoardData.isLoading]);

  return (
    <>
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
                <p>{sortList.find((item) => item.sort === selectedSort)?.name}</p>
                <GallaryFilterBtnWrapper
                  css={css`
                    transform: ${isShowSortBox ? 'rotate(180deg)' : 'rotate(0)'};
                  `}
                  onClick={() => {
                    showDropMenuHandler('sort');
                  }}
                >
                  <ArrowIosDownward size={20}></ArrowIosDownward>
                </GallaryFilterBtnWrapper>
              </GallaryFilterContent>
              {isShowSortBox && (
                <GallaryFilterDropMenu width='10rem' height='5rem'>
                  <div
                    css={css`
                      display: flex;
                      flex-flow: column nowrap;
                      gap: 1rem 0;
                      font-size: 1rem;
                      color: #aaa;
                    `}
                  >
                    {sortList.map((item) => (
                      <button
                        css={css`
                          color: ${selectedSort === item.sort ? 'black' : ''};
                        `}
                        key={item.id}
                        onClick={() => {
                          clickSortHandler(item.sort);
                        }}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </GallaryFilterDropMenu>
              )}
            </div>
            <div
              css={css`
                padding-left: 2rem;
                position: relative;
                display: flex;
                align-items: center;
                gap: 0 1rem;
              `}
            >
              <GallaryFilterContent gap='0 1.2rem'>
                <div
                  css={css`
                    display: flex;
                    flex-flow: row nowrap;
                    gap: 0 0.5rem;
                  `}
                >
                  {selectedKeywords.length > 0 ? (
                    selectedKeywords.map((item, i) => (
                      <div
                        key={item.num}
                        css={css`
                          display: flex;
                          flex-flow: row nowrap;
                          align-items: center;
                          gap: 0 0.5rem;
                        `}
                      >
                        <p
                          css={css`
                            color: #189bfa;
                          `}
                        >
                          #{item.keyword}
                        </p>
                        <Close
                          onClick={() => {
                            deleteKeywordHandler(item.num);
                          }}
                          size={15}
                        />
                        {i === selectedKeywords.length - 1 ? '' : ','}
                      </div>
                    ))
                  ) : (
                    <p>전체</p>
                  )}
                </div>
                <GallaryFilterBtnWrapper
                  css={css`
                    transform: ${isShowTagBox ? 'rotate(180deg)' : 'rotate(0deg)'};
                  `}
                  onClick={() => {
                    showDropMenuHandler('tag');
                  }}
                >
                  <ArrowIosDownward size={20}></ArrowIosDownward>
                </GallaryFilterBtnWrapper>
              </GallaryFilterContent>
              {isShowTagBox && (
                <GallaryFilterDropMenu width='45rem' height='10rem'>
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row wrap;
                      align-content: flex-start;
                      width: 100%;
                      gap: 0.5rem;
                      margin-bottom: 1rem;
                      font-size: 0.875rem;
                    `}
                  >
                    {keyword.map((item) => (
                      <StackTag
                        onClick={() => {
                          clickKeywordHandler(item);
                        }}
                        key={item.num}
                        isSelected={findTag(item)}
                        onMouseEnter={() => {
                          setHoveredItem(item);
                        }}
                        onMouseLeave={() => {
                          setHoveredItem(null);
                        }}
                      >
                        #{item.keyword}
                        <div
                          css={css`
                            visibility: ${hoveredItem?.num === item.num ? 'visible' : 'hidden'};
                            position: absolute;
                            width: 550px;
                            height: auto;
                            background: radial-gradient(
                                73.24% 242.56% at 32.22% -52.96%,
                                rgba(14, 51, 255, 0) 56.38%,
                                rgba(14, 51, 255, 0.05) 75.52%,
                                rgba(68, 171, 255, 0.05) 85.8%,
                                rgba(122, 255, 180, 0.05) 94.99%
                              ),
                              rgba(15, 19, 41, 1);
                            top: 150%;
                            left: 50%;
                            transform: translateX(-50%);
                            z-index: 10;
                            border-radius: 1rem;
                            padding: 1rem 1.2rem;
                            line-height: 134%;
                            border: 2px solid #ececec;
                            color: white;
                            font-size: 1.3rem;

                            &:: before {
                              content: '';
                              display: block;
                              position: absolute;
                              text-align: center;
                              right: 50%;
                              transform: translateX(-50%);
                              top: -8px;
                              border-bottom: 8px solid ${color.myBiolet};
                              border-right: 8px solid transparent;
                              border-left: 8px solid transparent;
                            }
                          `}
                        >
                          "{item.keywordDescription}"
                        </div>
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
                      border-top: 1px solid #ececec;
                      padding: 1rem 0;
                    `}
                  >
                    <button
                      onClick={() => {
                        modifyKeywords();
                      }}
                    >
                      적용하기
                    </button>
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
                      <StackTag
                        onClick={() => {
                          clickSkillHandler(item);
                        }}
                        isSelected={tmpSkills.name === item.name}
                        key={item.name}
                      >
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
                    <p>
                      {tmpSkills.name} :{' '}
                      {tmpSkills.duration > 0 ? `${tmpSkills.duration}개월 이상` : '전체'}
                    </p>
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
                      <button onClick={addSkillHandler}>적용하기</button>
                    </div>
                  </div>
                </GallaryFilterDropMenu>
              )}
              {selectedSkills.map((item, _i) => (
                <StackTag key={item.name} color='#189bfa'>
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row nowrap;
                      align-items: center;
                      gap: 0 0.5rem;
                    `}
                  >
                    <p>
                      {item.name} : {item.duration > 0 ? `${item.duration}개월 이상` : '전체'}
                    </p>
                    <Close
                      onClick={() => {
                        deleteSkillHandler(item);
                      }}
                      size={15}
                    />
                  </div>
                </StackTag>
              ))}
            </div>
          </div>
          <div
            css={css`
              width: 100%;
              height: 2rem;
              display: flex;
              flex-flow: row nowrap;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <p>
              <span
                css={css`
                  font-size: 1.25rem;
                  font-weight: 700;
                  color: #189bfa;
                `}
              >
                {totalNum}
              </span>{' '}
              명이 존재합니다.
            </p>
            {
              <div
                css={css`
                  position: relative;
                `}
              >
                <button
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 0 0.5rem;
                    padding: 0.6rem 1.5rem;
                    border: 1px solid #ececec;
                    border-radius: 5px;
                    z-index: 2;
                  `}
                  onClick={clickShareHandler}
                >
                  <p>공유하기</p>
                  <MailSend size={25} />
                </button>
                {isShowShareBox && (
                  <div
                    css={css`
                      display: flex;
                      flex-flow: column nowrap;
                      align-items: center;
                      gap: 0.5rem 0;
                      height: auto;
                      width: 270px;
                      position: absolute;
                      top: 150%;
                      left: 0;
                      border-radius: 0.5rem;
                      background-color: white;
                      border: 1px solid #ececec;
                      padding: 1rem;
                      z-index: 2;
                    `}
                  >
                    <p
                      css={css`
                        line-height: 160%;
                      `}
                    >
                      <span
                        css={css`
                          font-size: 1.2rem;
                          font-weight: 700;
                          color: #189bfa;
                          margin-right: 0.5rem;
                        `}
                      >
                        {selectedGallaryItems.length > 0
                          ? selectedGallaryItems.length + '명의 '
                          : '전체 '}
                      </span>
                      분석 데이터를 전달합니다.
                    </p>
                    <div
                      css={css`
                        display: flex;
                        flex-flow: row nowrap;
                        gap: 0.8rem;
                      `}
                    >
                      <input
                        css={css`
                          width: 70%;
                          padding: 0.7rem;
                          border: 1px solid #ececec;
                          border-radius: 4px;
                        `}
                        type='text'
                        placeholder='Enter ID...'
                        onChange={(e) => {
                          setSendBoardItems((prevState) => {
                            return {
                              ...prevState,
                              receiveUserLogin: e.target.value,
                            };
                          });
                        }}
                      />
                      <button
                        css={css`
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          width: 40px;
                          height: 40px;
                          border-radius: 999px;
                          background-color: #189bfa;
                          color: white;
                        `}
                        onClick={shareBoardItemHandler}
                      >
                        <Send size={25}>보내기</Send>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            }
          </div>
        </GallaryFilterWrapper>
        <HeightBox height='3rem' />
        <GallaryContentsWrapper>
          {boardItems.map((item, i) => (
            <GallaryItem
              key={i}
              ref={i === boardItems.length - 1 ? ref : null}
              onClick={() => {
                if (token) {
                  selectItemHandler(item);
                }
              }}
              selected={findSelectedItem(item)}
            >
              <GallaryHeader>
                {item.language.map((lang) => (
                  <img
                    key={lang}
                    css={css`
                      height: 35px;
                    `}
                    src={iconList.find((icon) => icon.name === lang)?.url}
                    alt={lang}
                  />
                ))}
              </GallaryHeader>
              <GallaryContent>
                <GallaryItemImg imgUrl={item.avatarUrl}></GallaryItemImg>
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
                  {item.userName}
                </h2>
                <p
                  css={css`
                    width: 100%;
                    font-size: 1rem;
                    text-align: right;
                    margin-bottom: 2rem;
                  `}
                >
                  {parseField(item.field)}
                </p>
                <GallaryItemText>
                  {item.styles?.map((style) => (
                    <GallaryTag key={style}>#{style}</GallaryTag>
                  ))}
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
                      {item.repoCount}
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
                      {item.commitCount}
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
                      {item.commitDays} 일
                    </p>
                  </div>
                </GallaryDetails>
                <GallaryBtnWrapper>
                  <GallaryBtn
                    css={css`
                      border-radius: 4px;
                    `}
                    bgColor='#6366f1'
                    onClick={() => {
                      navigateResumeHandler(item);
                    }}
                  >
                    분석보기
                  </GallaryBtn>
                </GallaryBtnWrapper>
              </GallaryContent>
            </GallaryItem>
          ))}
          {currentBoardData.isFetching && <Loader />}
        </GallaryContentsWrapper>
        {/* <GallaryContactBox
        isShow={isShowContactbox}
        onDrop={(e) => {
          dragDropHandler(e);
        }}
        onDragOver={(e) => dragOverHandler(e)}
      >
        <GallaryDropBox>
          {newItem?.map((elem, i) => (
            <GallaryItemInBox key={elem.id} index={i + 1}>
              <GallaryImage />
              <GallaryTextBox>
                <GallaryTextLeft></GallaryTextLeft>
                <GallaryBtn>
                  <IosArrowRight height={25} />
                </GallaryBtn>
              </GallaryTextBox>
            </GallaryItemInBox>
          ))}
        </GallaryDropBox>
      </GallaryContactBox> */}
      </GallaryWrapper>
      <ScrollBtn onClick={scrollTopHandler}>
        <ArrowIosUpward size={25} />
      </ScrollBtn>
    </>
  );
};

export default Gallary;
