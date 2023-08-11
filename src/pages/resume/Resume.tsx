/* Libraries & Hooks */
import { ResponsiveRadar } from '@nivo/radar';
import { ResponsiveCalendar } from '@nivo/calendar';
import { useGetUserGithubInfoQuery } from '~/redux/api';

/* Components */

/* Styles */
import { css } from '@emotion/react';
import {
  ResumeSection,
  ResumeWrapper,
  HeightBox,
  ResumeTagBox,
  ResumeTag,
  ResumeChartBox,
  ResumeLeftContents,
  ResumeRightContents,
  ResumeHashTagWrapper,
  ResumeLeftTextBox,
  ResumeLeftTextDetail,
  ResumeTimeLineWrapper,
  ResumeRepoWrapper,
  ResumeRepoText,
  ResumeRepoSvgbox,
  ResumeRepoContainer,
} from './resume.styles';
import Repasitory from '~/components/repasitory/Repasitory';
import Loader from '~/components/loader/Loader';
import { useRef, useState, useEffect } from 'react';
import useScroll from '~/hooks/useScroll';
import Chat from '~/components/chat/Chat';
import { color } from '~/styles/theme/primary';
import { UserGithubData } from '~/redux/api/types';
import { useAppDispatch } from '~/redux/store';
import { commitSearch } from '~/redux/features/searchSlice';
import { showMessages } from '~/redux/features/popupSlice';
import { useLocation } from 'react-router-dom';

/* etx */

const MAIN_TEXT = '이터의 속삭임: 코드로 이야기하는 개발자 Park Yun Chan 입니다.'.split('');

const Resume: React.FC = (): JSX.Element => {
  const [distance, setDistance] = useState<number | undefined>(10);
  const { scrollY } = useScroll();
  const textArea = useRef<HTMLDivElement>(null);
  const textArr = MAIN_TEXT;
  let animeInterval: any;
  let textIndex = 0;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [keyword, setKeyword] = useState<string>('');

  const { isError, isLoading, data, error } = useGetUserGithubInfoQuery({
    userName: keyword,
  });

  if (isError) {
    dispatch(
      showMessages({
        msg: error,
        content: 'DevProfile Api Error',
        type: 'error',
      }),
    );
  }

  const userData = (data?.data as UserGithubData) ?? {
    boardData: [],
    repositoryInfo: [],
    userInfo: {
      ai: -1,
      algorithm: -1,
      dataScience: -1,
      database: -1,
      document: -1,
      game: -1,
      keywordSet: [],
      login: '',
      name: '',
      systemProgramming: -1,
      webBackend: -1,
      commitCalender: [],
      commitStart: '',
      commitEnd: '',
      webFrontend: -1,
    },
    styleInfo: [],
  };

  const radarData = userData.boardData?.map((item) => {
    return {
      field: item.field,
      user: item.userlogin.score,
    };
  });

  const keywordTextData = userData.userInfo?.userKeywordAnalyze?.split('.');

  /**
   *
   */
  const searchKeywordHandler = (keyword: string) => {
    dispatch(commitSearch({ commitKeyword: keyword }));
  };

  useEffect(() => {
    const parseParams = location.pathname.split('/');

    setKeyword(parseParams[parseParams.length - 1]);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (textArea && textArea.current) {
        animeInterval = setInterval(function () {
          if (textIndex < textArr.length) {
            if (textArea && textArea.current) {
              textArea.current.textContent += textArr[textIndex];
            }
            textIndex++;
            setDistance(textArea.current?.offsetWidth);
          } else {
            clearInterval(animeInterval);
          }
        }, 100);
      }
    }, 3000);

    return () => {
      clearInterval(animeInterval);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    dispatch(
      showMessages({
        msg: error,
        content: 'DevProfile Api error',
        type: 'error',
      }),
    );
  }

  return (
    <>
      <ResumeWrapper>
        <ResumeSection>
          <HeightBox height='3rem' />
          <h1
            css={css`
              font-weight: 700;
              font-size: 3rem;
              line-height: 100%;
            `}
          >
            {userData.userInfo?.name}
          </h1>
          <HeightBox height='1.25rem' />
          <div>
            <div
              css={css`
                position: relative;
              `}
            >
              <div
                css={css`
                  opacity: 0.16;
                  white-space: nowrap;
                  color: #01051b8f;
                  font-weight: 500;
                  font-size: 1.25rem;
                  line-height: 134%;
                  letter-spacing: -0.01em;
                `}
              >
                데이터의 속삭임: 코드로 이야기하는 개발자 {userData.userInfo?.name} 입니다.
              </div>
              <div
                css={css`
                  position: absolute;
                  top: 0;
                  left: 0;
                  pointer-events: none;
                  font-weight: 500;
                  font-size: 1.25rem;
                  line-height: 134%;
                  letter-spacing: -0.01em;
                `}
              >
                <div ref={textArea}>데</div>
                <div
                  css={css`
                    position: relative;
                    display: inline-block;
                    margin-right: 2px;
                  `}
                >
                  <div
                    css={css`
                      position: absolute;
                      transform: translateY(-150%);
                      top: 0;
                      left: ${distance + 'px'};
                    `}
                  >
                    <div
                      css={css`
                        background: hsla(231, 100%, 53%, 1);
                        width: 4px;
                        height: 38px;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                      `}
                    >
                      <div
                        css={css`
                          position: absolute;
                          top: 0;
                          right: unset;
                          left: 0;
                          transform: translateY(calc(-100% + 2px));
                          user-select: none;
                          color: #ffffff;
                          background: hsla(231, 100%, 53%, 1);
                          border-radius: 8px 20px 20px 0px;
                          padding: 8px 12px 8px 8px;
                          font-size: 20px;
                          font-weight: 400;
                          line-height: 100%;
                          letter-spacing: -0.02em;
                          display: flex;
                          width: max-content;
                          gap: 12px;

                          &: before {
                            content: '';
                            position: absolute;
                            z-index: 3;
                            background-color: transparent;
                            bottom: 0px;
                            left: 4px;
                            transform: translateY(100%);
                            height: 50px;
                            width: 16px;
                            border-top-left-radius: 16px;
                            box-shadow: 0 -16px 0 0 hsla(231, 100%, 53%, 1);
                          }
                        `}
                      >
                        <div
                          css={css`
                            flex-shrink: 0;
                            position: relative;
                            z-index: 3;
                          `}
                        >
                          DEV-PROFILE
                        </div>
                        <div
                          css={css`
                            transform: none;
                          `}
                        >
                          🧙🏻‍♂️
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HeightBox height='1.25rem' />
          <ResumeTagBox>
            <ResumeTag color='#ffffff'>👨🏻‍🔧 AI : {userData.userInfo?.ai ?? 0} Commits</ResumeTag>
            <ResumeTag color='#ffffff'>
              🧑🏻‍💻 Web-Backend : {userData.userInfo?.webBackend ?? 0} Commits
            </ResumeTag>
            <ResumeTag color='#ffffff'>
              🧑🏻‍💻 Web-Frontend : {userData.userInfo?.webFrontend ?? 0} Commits
            </ResumeTag>
            <ResumeTag color='#ffffff'>
              💾 Database : {userData.userInfo?.database ?? 0} Commits
            </ResumeTag>
            <ResumeTag color='#ffffff'>🕹️ Game : {userData.userInfo?.game ?? 0} Commits</ResumeTag>
            <ResumeTag color='#ffffff'>
              💎 System-Programming : {userData.userInfo?.systemProgramming ?? 0} Commits
            </ResumeTag>
          </ResumeTagBox>
        </ResumeSection>
        <ResumeSection background={true} height='100vh'>
          <HeightBox height='5rem' />
          <ResumeChartBox>
            <ResumeLeftContents
              onClick={() => {
                dispatch(commitSearch({ commitKeyword: '' }));
              }}
            >
              <div
                css={css`
                  width: 100%;
                  height: 50%;
                `}
              >
                <ResponsiveRadar
                  data={radarData}
                  keys={['user']}
                  indexBy='field'
                  valueFormat='>-.2f'
                  margin={{ top: 70, right: 80, bottom: 50, left: 80 }}
                  borderColor={{ from: 'color' }}
                  gridLabelOffset={36}
                  gridShape='linear'
                  dotSize={10}
                  dotColor={{ theme: 'background' }}
                  dotBorderWidth={2}
                  colors={{ scheme: 'set3' }}
                  blendMode='multiply'
                  motionConfig='wobbly'
                  legends={[
                    {
                      anchor: 'top-left',
                      direction: 'column',
                      translateX: -50,
                      translateY: -40,
                      itemWidth: 80,
                      itemHeight: 20,
                      itemTextColor: '#999',
                      symbolSize: 12,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemTextColor: '#000',
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
              <ResumeLeftTextBox>
                <ResumeLeftTextDetail>
                  <p>📌 AI</p>
                  <p>
                    {userData.boardData[0]?.feature.map((item, i) => {
                      return (
                        <ResumeTag color={color.mintGreen} key={i}>
                          #{item}
                        </ResumeTag>
                      );
                    })}
                  </p>
                </ResumeLeftTextDetail>
                <ResumeLeftTextDetail>
                  <p>📌 Database</p>
                  <p>
                    {userData.boardData[1]?.feature.map((item, i) => {
                      return (
                        <ResumeTag color={color.mintGreen} key={i}>
                          #{item}
                        </ResumeTag>
                      );
                    })}
                  </p>
                </ResumeLeftTextDetail>
                <ResumeLeftTextDetail>
                  <p>📌 Web-Backend</p>
                  <p>
                    {userData.boardData[2]?.feature.map((item, i) => {
                      return (
                        <ResumeTag color={color.mintGreen} key={i}>
                          #{item}
                        </ResumeTag>
                      );
                    })}
                  </p>
                </ResumeLeftTextDetail>
                <ResumeLeftTextDetail>
                  <p>📌 Web-Frontend</p>
                  <p>
                    {userData.boardData[3]?.feature.map((item, i) => {
                      return (
                        <ResumeTag color={color.mintGreen} key={i}>
                          #{item}
                        </ResumeTag>
                      );
                    })}
                  </p>
                </ResumeLeftTextDetail>
                <ResumeLeftTextDetail>
                  <p>📌 Game</p>
                  <p>
                    {userData.boardData[4]?.feature.map((item, i) => {
                      return (
                        <ResumeTag color={color.mintGreen} key={i}>
                          #{item}
                        </ResumeTag>
                      );
                    })}
                  </p>
                </ResumeLeftTextDetail>
                <ResumeLeftTextDetail>
                  <p>📌 System-programming</p>
                  <p>
                    {userData.boardData[5]?.feature.map((item, i) => {
                      return (
                        <ResumeTag color={color.mintGreen} key={i}>
                          #{item}
                        </ResumeTag>
                      );
                    })}
                  </p>
                </ResumeLeftTextDetail>
              </ResumeLeftTextBox>
            </ResumeLeftContents>
            <ResumeRightContents>
              <ResumeHashTagWrapper>
                <div
                  css={css`
                    border-bottom: 1px solid #ececec;
                    padding: 0 0 0.5rem 0;
                    margin-bottom: 1rem;
                  `}
                >
                  <h2
                    css={css`
                      font-size: 2rem;
                      font-weight: 600;
                      margin-bottom: 1rem;
                    `}
                  >
                    {userData.userInfo?.userTitle}
                  </h2>
                  <div
                    css={css`
                      display: flex;
                      flex-flow: column nowrap;
                      gap: 0.5rem 0;
                    `}
                  >
                    {/* <p
                      css={css`
                        font-size: 1rem;
                        line-height: 134%;
                        color: ${color.myBiolet};
                      `}
                    >
                      {userData.userInfo.userKeywordAnalyze}
                    </p> */}
                    {keywordTextData?.map((item) => (
                      <p
                        key={item}
                        css={css`
                          font-size: 1rem;
                          line-height: 134%;
                          color: ${color.myBiolet};
                        `}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p
                    css={css`
                      font-size: 2rem;
                      font-weight: 600;
                      margin-bottom: 1rem;
                    `}
                  >
                    키워드
                  </p>
                  <div
                    css={css`
                      display: flex;
                      flex-flow: row wrap;
                      gap: 0.5rem 1rem;
                      width: 100%;
                      align-self: start;
                    `}
                  >
                    {userData.userInfo?.keywordSet?.map((item, i) => (
                      <ResumeTag
                        onClick={() => {
                          searchKeywordHandler(item);
                        }}
                        color='#F7F1E9'
                        border='none'
                        key={i}
                      >
                        #{item}
                      </ResumeTag>
                    ))}
                  </div>
                </div>
              </ResumeHashTagWrapper>
              <ResumeTimeLineWrapper>
                <div
                  css={css`
                    width: 100%;
                    height: 90%;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    overflow: hidden;
                  `}
                >
                  <ResponsiveCalendar
                    data={userData.userInfo?.commitCalender}
                    from={userData.userInfo?.commitStart}
                    to={userData.userInfo?.commitEnd}
                    emptyColor='#eeeeee'
                    colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    yearSpacing={40}
                    monthBorderColor='#ffffff'
                    dayBorderWidth={2}
                    dayBorderColor='#ffffff'
                    legends={[
                      {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left',
                      },
                    ]}
                  />
                </div>
              </ResumeTimeLineWrapper>
            </ResumeRightContents>
          </ResumeChartBox>
        </ResumeSection>
        {/* <ResumeSection height='100vh'>
          <div
            css={css`
              width: 90%;
              padding: 2rem 0;
              display: flex;
              flex-flow: column nowrap;
              justify-content: center;
              align-items: center;
              gap: 2rem 0;
            `}
          >
            {data?.data.repositoryInfo?.map((item, i) => (
              <Repasitory key={item.id + i} {...item} />
            ))}
          </div>
        </ResumeSection> */}
        <ResumeSection height={(userData.repositoryInfo?.length + 1) * 1000 + 'px'}>
          <ResumeRepoWrapper>
            <ResumeRepoText>
              {userData.styleInfo.map((item, i) => (
                <span
                  key={item.keyword}
                  css={css`
                    position: absolute;
                    transition: 0.2s;
                    color: hsla(146, 100%, 74%, 1);
                    font-size: 87px;
                    font-weight: 500;
                    letter-spacing: -0.03em;
                    font-variant: tabular-nums;
                    opacity: ${Math.ceil((scrollY - 1657) * 0.0003) === i ? '1' : '0'};
                    transform: translateY(
                      ${Math.ceil((scrollY - 1657) * 0.0003) === i ? '0%' : '-120%'}
                    );
                    left: 15%;
                    top: 100px;
                  `}
                >
                  #{item.keyword}
                </span>
              ))}

              {userData.styleInfo.map((item, i) => (
                <div
                  key={item.keyword}
                  css={css`
                    width: 45rem;
                    height: 15rem;
                    position: absolute;
                    background: radial-gradient(
                        73.24% 242.56% at 32.22% -52.96%,
                        rgba(14, 51, 255, 0) 56.38%,
                        rgba(14, 51, 255, 0.05) 75.52%,
                        rgba(68, 171, 255, 0.05) 85.8%,
                        rgba(122, 255, 180, 0.05) 94.99%
                      ),
                      rgba(15, 19, 41, 0.92);
                    border-radius: 24px;
                    backdrop-filter: blur(22px);
                    padding: 24px 32px;
                    right: 10%;
                    z-index: 5;
                    color: white;
                    opacity: ${Math.ceil((scrollY - 1657) * 0.0003) === i ? '1' : '0'};
                    transform: translateX(
                      ${Math.ceil((scrollY - 1657) * 0.0003) === i ? '0%' : '120%'}
                    );
                    transition: 0.2s;
                  `}
                >
                  <p
                    css={css`
                      font-size: 32px;
                      font-weight: 600;
                    `}
                  >
                    ❔ {item.keyword}
                  </p>
                  <HeightBox height='2rem' />
                  <p
                    css={css`
                      font-size: 28px;
                      font-weight: 600;
                      line-height: 116%;
                      letter-spacing: -0.02rem;
                    `}
                  >
                    {item.detail}
                  </p>
                </div>
              ))}

              {/* <span
                css={css`
                  display: inline-block;
                  margin-right: 2rem;
                `}
              >
                #
                {userData.styles.length > Math.round((scrollY - 1657) * 0.0001)
                  ? userData.styles[Math.round((scrollY - 1657) * 0.0001)]
                  : userData.styles[userData.styles.length - 1]}
              </span> */}
              {/* <span>{scrollY > 1657 ? Math.round((scrollY - 1657) * 0.0001) : 0}</span> */}
            </ResumeRepoText>
            <ResumeRepoSvgbox position={scrollY > 1657 ? Math.round(scrollY - 1657) : 0}>
              <svg
                width='1512'
                height='59'
                viewBox='0 0 1512 59'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint0_linear_3426_14976)'
                ></rect>
                <rect
                  x='12'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint1_linear_3426_14976)'
                ></rect>
                <rect
                  x='24'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint2_linear_3426_14976)'
                ></rect>
                <rect
                  x='36'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint3_linear_3426_14976)'
                ></rect>
                <rect
                  x='48'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint4_linear_3426_14976)'
                ></rect>
                <rect
                  x='60'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint5_linear_3426_14976)'
                ></rect>
                <rect
                  x='72'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint6_linear_3426_14976)'
                ></rect>
                <rect
                  x='84'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint7_linear_3426_14976)'
                ></rect>
                <rect
                  x='96'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint8_linear_3426_14976)'
                ></rect>
                <rect
                  x='108'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint9_linear_3426_14976)'
                ></rect>
                <rect
                  x='120'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint10_linear_3426_14976)'
                ></rect>
                <rect
                  x='132'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint11_linear_3426_14976)'
                ></rect>
                <rect
                  x='144'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint12_linear_3426_14976)'
                ></rect>
                <rect
                  x='156'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint13_linear_3426_14976)'
                ></rect>
                <rect
                  x='168'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint14_linear_3426_14976)'
                ></rect>
                <rect
                  x='180'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint15_linear_3426_14976)'
                ></rect>
                <rect
                  x='192'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint16_linear_3426_14976)'
                ></rect>
                <rect
                  x='204'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint17_linear_3426_14976)'
                ></rect>
                <rect
                  x='216'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint18_linear_3426_14976)'
                ></rect>
                <rect
                  x='228'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint19_linear_3426_14976)'
                ></rect>
                <rect
                  x='240'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint20_linear_3426_14976)'
                ></rect>
                <rect
                  x='252'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint21_linear_3426_14976)'
                ></rect>
                <rect
                  x='264'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint22_linear_3426_14976)'
                ></rect>
                <rect
                  x='276'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint23_linear_3426_14976)'
                ></rect>
                <rect
                  x='288'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint24_linear_3426_14976)'
                ></rect>
                <rect
                  x='300'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint25_linear_3426_14976)'
                ></rect>
                <rect
                  x='312'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint26_linear_3426_14976)'
                ></rect>
                <rect
                  x='324'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint27_linear_3426_14976)'
                ></rect>
                <rect
                  x='336'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint28_linear_3426_14976)'
                ></rect>
                <rect
                  x='348'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint29_linear_3426_14976)'
                ></rect>
                <rect
                  x='360'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint30_linear_3426_14976)'
                ></rect>
                <rect
                  x='372'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint31_linear_3426_14976)'
                ></rect>
                <rect
                  x='384'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint32_linear_3426_14976)'
                ></rect>
                <rect
                  x='396'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint33_linear_3426_14976)'
                ></rect>
                <rect
                  x='408'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint34_linear_3426_14976)'
                ></rect>
                <rect
                  x='420'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint35_linear_3426_14976)'
                ></rect>
                <rect
                  x='432'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint36_linear_3426_14976)'
                ></rect>
                <rect
                  x='444'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint37_linear_3426_14976)'
                ></rect>
                <rect
                  x='456'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint38_linear_3426_14976)'
                ></rect>
                <rect
                  x='468'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint39_linear_3426_14976)'
                ></rect>
                <rect
                  x='480'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint40_linear_3426_14976)'
                ></rect>
                <rect
                  x='492'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint41_linear_3426_14976)'
                ></rect>
                <rect
                  x='504'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint42_linear_3426_14976)'
                ></rect>
                <rect
                  x='516'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint43_linear_3426_14976)'
                ></rect>
                <rect
                  x='528'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint44_linear_3426_14976)'
                ></rect>
                <rect
                  x='540'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint45_linear_3426_14976)'
                ></rect>
                <rect
                  x='552'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint46_linear_3426_14976)'
                ></rect>
                <rect
                  x='564'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint47_linear_3426_14976)'
                ></rect>
                <rect
                  x='576'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint48_linear_3426_14976)'
                ></rect>
                <rect
                  x='588'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint49_linear_3426_14976)'
                ></rect>
                <rect
                  x='600'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint50_linear_3426_14976)'
                ></rect>
                <rect
                  x='612'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint51_linear_3426_14976)'
                ></rect>
                <rect
                  x='624'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint52_linear_3426_14976)'
                ></rect>
                <rect
                  x='636'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint53_linear_3426_14976)'
                ></rect>
                <rect
                  x='648'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint54_linear_3426_14976)'
                ></rect>
                <rect
                  x='660'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint55_linear_3426_14976)'
                ></rect>
                <rect
                  x='672'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint56_linear_3426_14976)'
                ></rect>
                <rect
                  x='684'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint57_linear_3426_14976)'
                ></rect>
                <rect
                  x='696'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint58_linear_3426_14976)'
                ></rect>
                <rect
                  x='708'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint59_linear_3426_14976)'
                ></rect>
                <rect
                  x='720'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint60_linear_3426_14976)'
                ></rect>
                <rect
                  x='732'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint61_linear_3426_14976)'
                ></rect>
                <rect
                  x='744'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint62_linear_3426_14976)'
                ></rect>
                <rect
                  x='756'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint63_linear_3426_14976)'
                ></rect>
                <rect
                  x='768'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint64_linear_3426_14976)'
                ></rect>
                <rect
                  x='780'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint65_linear_3426_14976)'
                ></rect>
                <rect
                  x='792'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint66_linear_3426_14976)'
                ></rect>
                <rect
                  x='804'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint67_linear_3426_14976)'
                ></rect>
                <rect
                  x='816'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint68_linear_3426_14976)'
                ></rect>
                <rect
                  x='828'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint69_linear_3426_14976)'
                ></rect>
                <rect
                  x='840'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint70_linear_3426_14976)'
                ></rect>
                <rect
                  x='852'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint71_linear_3426_14976)'
                ></rect>
                <rect
                  x='864'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint72_linear_3426_14976)'
                ></rect>
                <rect
                  x='876'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint73_linear_3426_14976)'
                ></rect>
                <rect
                  x='888'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint74_linear_3426_14976)'
                ></rect>
                <rect
                  x='900'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint75_linear_3426_14976)'
                ></rect>
                <rect
                  x='912'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint76_linear_3426_14976)'
                ></rect>
                <rect
                  x='924'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint77_linear_3426_14976)'
                ></rect>
                <rect
                  x='936'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint78_linear_3426_14976)'
                ></rect>
                <rect
                  x='948'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint79_linear_3426_14976)'
                ></rect>
                <rect
                  x='960'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint80_linear_3426_14976)'
                ></rect>
                <rect
                  x='972'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint81_linear_3426_14976)'
                ></rect>
                <rect
                  x='984'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint82_linear_3426_14976)'
                ></rect>
                <rect
                  x='996'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint83_linear_3426_14976)'
                ></rect>
                <rect
                  x='1008'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint84_linear_3426_14976)'
                ></rect>
                <rect
                  x='1020'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint85_linear_3426_14976)'
                ></rect>
                <rect
                  x='1032'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint86_linear_3426_14976)'
                ></rect>
                <rect
                  x='1044'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint87_linear_3426_14976)'
                ></rect>
                <rect
                  x='1056'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint88_linear_3426_14976)'
                ></rect>
                <rect
                  x='1068'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint89_linear_3426_14976)'
                ></rect>
                <rect
                  x='1080'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint90_linear_3426_14976)'
                ></rect>
                <rect
                  x='1092'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint91_linear_3426_14976)'
                ></rect>
                <rect
                  x='1104'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint92_linear_3426_14976)'
                ></rect>
                <rect
                  x='1116'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint93_linear_3426_14976)'
                ></rect>
                <rect
                  x='1128'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint94_linear_3426_14976)'
                ></rect>
                <rect
                  x='1140'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint95_linear_3426_14976)'
                ></rect>
                <rect
                  x='1152'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint96_linear_3426_14976)'
                ></rect>
                <rect
                  x='1164'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint97_linear_3426_14976)'
                ></rect>
                <rect
                  x='1176'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint98_linear_3426_14976)'
                ></rect>
                <rect
                  x='1188'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint99_linear_3426_14976)'
                ></rect>
                <rect
                  x='1200'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint100_linear_3426_14976)'
                ></rect>
                <rect
                  x='1212'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint101_linear_3426_14976)'
                ></rect>
                <rect
                  x='1224'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint102_linear_3426_14976)'
                ></rect>
                <rect
                  x='1236'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint103_linear_3426_14976)'
                ></rect>
                <rect
                  x='1248'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint104_linear_3426_14976)'
                ></rect>
                <rect
                  x='1260'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint105_linear_3426_14976)'
                ></rect>
                <rect
                  x='1272'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint106_linear_3426_14976)'
                ></rect>
                <rect
                  x='1284'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint107_linear_3426_14976)'
                ></rect>
                <rect
                  x='1296'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint108_linear_3426_14976)'
                ></rect>
                <rect
                  x='1308'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint109_linear_3426_14976)'
                ></rect>
                <rect
                  x='1320'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint110_linear_3426_14976)'
                ></rect>
                <rect
                  x='1332'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint111_linear_3426_14976)'
                ></rect>
                <rect
                  x='1344'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint112_linear_3426_14976)'
                ></rect>
                <rect
                  x='1356'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint113_linear_3426_14976)'
                ></rect>
                <rect
                  x='1368'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint114_linear_3426_14976)'
                ></rect>
                <rect
                  x='1380'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint115_linear_3426_14976)'
                ></rect>
                <rect
                  x='1392'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint116_linear_3426_14976)'
                ></rect>
                <rect
                  x='1404'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint117_linear_3426_14976)'
                ></rect>
                <rect
                  x='1416'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint118_linear_3426_14976)'
                ></rect>
                <rect
                  x='1428'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint119_linear_3426_14976)'
                ></rect>
                <rect
                  x='1440'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint120_linear_3426_14976)'
                ></rect>
                <rect
                  x='1452'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint121_linear_3426_14976)'
                ></rect>
                <rect
                  x='1464'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint122_linear_3426_14976)'
                ></rect>
                <rect
                  x='1476'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint123_linear_3426_14976)'
                ></rect>
                <rect
                  x='1488'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint124_linear_3426_14976)'
                ></rect>
                <rect
                  x='1500'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint125_linear_3426_14976)'
                ></rect>
                <defs>
                  <linearGradient
                    id='paint0_linear_3426_14976'
                    x1='-9.33334'
                    y1='41.2434'
                    x2='-22.1241'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_3426_14976'
                    x1='2.66666'
                    y1='50.6382'
                    x2='32.9331'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint2_linear_3426_14976'
                    x1='14.6667'
                    y1='67.8618'
                    x2='53.1312'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint3_linear_3426_14976'
                    x1='26.6667'
                    y1='67.8618'
                    x2='65.1312'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint4_linear_3426_14976'
                    x1='38.6667'
                    y1='60.0329'
                    x2='67.3187'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint5_linear_3426_14976'
                    x1='50.6667'
                    y1='60.0329'
                    x2='79.3187'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint6_linear_3426_14976'
                    x1='62.6667'
                    y1='50.6382'
                    x2='92.9331'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint7_linear_3426_14976'
                    x1='74.6667'
                    y1='50.6382'
                    x2='104.933'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint8_linear_3426_14976'
                    x1='86.6667'
                    y1='50.6382'
                    x2='116.933'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint9_linear_3426_14976'
                    x1='98.6667'
                    y1='50.6382'
                    x2='128.933'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint10_linear_3426_14976'
                    x1='110.667'
                    y1='60.0329'
                    x2='139.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint11_linear_3426_14976'
                    x1='122.667'
                    y1='60.0329'
                    x2='151.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint12_linear_3426_14976'
                    x1='134.667'
                    y1='67.8618'
                    x2='173.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint13_linear_3426_14976'
                    x1='146.667'
                    y1='67.8618'
                    x2='185.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint14_linear_3426_14976'
                    x1='158.333'
                    y1='92.1056'
                    x2='212.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint15_linear_3426_14976'
                    x1='170.333'
                    y1='92.1056'
                    x2='224.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint16_linear_3426_14976'
                    x1='182.667'
                    y1='67.8618'
                    x2='221.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint17_linear_3426_14976'
                    x1='194.667'
                    y1='67.8618'
                    x2='233.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint18_linear_3426_14976'
                    x1='206.667'
                    y1='60.0329'
                    x2='235.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint19_linear_3426_14976'
                    x1='218.667'
                    y1='60.0329'
                    x2='247.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint20_linear_3426_14976'
                    x1='230.667'
                    y1='67.8618'
                    x2='269.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint21_linear_3426_14976'
                    x1='242.667'
                    y1='67.8618'
                    x2='281.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint22_linear_3426_14976'
                    x1='254.333'
                    y1='92.1056'
                    x2='308.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint23_linear_3426_14976'
                    x1='266.333'
                    y1='92.1056'
                    x2='320.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint24_linear_3426_14976'
                    x1='278.667'
                    y1='67.8618'
                    x2='317.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint25_linear_3426_14976'
                    x1='290.667'
                    y1='67.8618'
                    x2='329.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint26_linear_3426_14976'
                    x1='302.333'
                    y1='92.1056'
                    x2='356.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint27_linear_3426_14976'
                    x1='314.333'
                    y1='92.1056'
                    x2='368.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint28_linear_3426_14976'
                    x1='326.667'
                    y1='67.8618'
                    x2='365.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint29_linear_3426_14976'
                    x1='338.667'
                    y1='67.8618'
                    x2='377.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint30_linear_3426_14976'
                    x1='350.667'
                    y1='67.8618'
                    x2='389.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint31_linear_3426_14976'
                    x1='362.667'
                    y1='67.8618'
                    x2='401.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint32_linear_3426_14976'
                    x1='374.667'
                    y1='60.0329'
                    x2='403.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint33_linear_3426_14976'
                    x1='386.667'
                    y1='60.0329'
                    x2='415.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint34_linear_3426_14976'
                    x1='398.667'
                    y1='55.3355'
                    x2='439.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint35_linear_3426_14976'
                    x1='410.667'
                    y1='67.8618'
                    x2='449.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint36_linear_3426_14976'
                    x1='422.667'
                    y1='67.8618'
                    x2='461.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint37_linear_3426_14976'
                    x1='434.667'
                    y1='67.8618'
                    x2='473.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint38_linear_3426_14976'
                    x1='446.333'
                    y1='92.1056'
                    x2='500.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint39_linear_3426_14976'
                    x1='458.667'
                    y1='55.3355'
                    x2='499.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint40_linear_3426_14976'
                    x1='470.667'
                    y1='60.0329'
                    x2='499.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint41_linear_3426_14976'
                    x1='482.667'
                    y1='55.3355'
                    x2='505.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint42_linear_3426_14976'
                    x1='494.667'
                    y1='60.0329'
                    x2='523.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint43_linear_3426_14976'
                    x1='506.667'
                    y1='60.0329'
                    x2='535.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint44_linear_3426_14976'
                    x1='518.667'
                    y1='55.3355'
                    x2='541.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint45_linear_3426_14976'
                    x1='530.667'
                    y1='55.3355'
                    x2='553.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint46_linear_3426_14976'
                    x1='542.667'
                    y1='45.9408'
                    x2='562.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint47_linear_3426_14976'
                    x1='554.667'
                    y1='45.9408'
                    x2='574.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint48_linear_3426_14976'
                    x1='566.667'
                    y1='41.2434'
                    x2='553.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint49_linear_3426_14976'
                    x1='578.667'
                    y1='41.2434'
                    x2='565.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint50_linear_3426_14976'
                    x1='590.667'
                    y1='45.9408'
                    x2='610.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint51_linear_3426_14976'
                    x1='602.667'
                    y1='55.3355'
                    x2='625.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint52_linear_3426_14976'
                    x1='614.333'
                    y1='92.1056'
                    x2='668.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint53_linear_3426_14976'
                    x1='626.333'
                    y1='92.1056'
                    x2='680.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint54_linear_3426_14976'
                    x1='638.667'
                    y1='67.8618'
                    x2='677.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint55_linear_3426_14976'
                    x1='650.667'
                    y1='67.8618'
                    x2='689.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint56_linear_3426_14976'
                    x1='662.667'
                    y1='67.8618'
                    x2='701.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint57_linear_3426_14976'
                    x1='674.667'
                    y1='67.8618'
                    x2='713.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint58_linear_3426_14976'
                    x1='686.333'
                    y1='92.1056'
                    x2='740.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint59_linear_3426_14976'
                    x1='698.333'
                    y1='92.1056'
                    x2='752.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint60_linear_3426_14976'
                    x1='710.667'
                    y1='67.8618'
                    x2='749.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint61_linear_3426_14976'
                    x1='722.667'
                    y1='67.8618'
                    x2='761.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint62_linear_3426_14976'
                    x1='734.333'
                    y1='92.1056'
                    x2='788.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint63_linear_3426_14976'
                    x1='746.333'
                    y1='92.1056'
                    x2='800.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint64_linear_3426_14976'
                    x1='758.667'
                    y1='67.8618'
                    x2='797.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint65_linear_3426_14976'
                    x1='770.667'
                    y1='67.8618'
                    x2='809.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint66_linear_3426_14976'
                    x1='782.667'
                    y1='55.3355'
                    x2='823.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint67_linear_3426_14976'
                    x1='794.667'
                    y1='45.9408'
                    x2='814.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint68_linear_3426_14976'
                    x1='806.667'
                    y1='45.9408'
                    x2='826.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint69_linear_3426_14976'
                    x1='818.667'
                    y1='41.2434'
                    x2='805.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint70_linear_3426_14976'
                    x1='830.667'
                    y1='41.2434'
                    x2='817.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint71_linear_3426_14976'
                    x1='842.667'
                    y1='45.9408'
                    x2='862.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint72_linear_3426_14976'
                    x1='854.667'
                    y1='45.9408'
                    x2='874.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint73_linear_3426_14976'
                    x1='866.667'
                    y1='55.3355'
                    x2='907.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint74_linear_3426_14976'
                    x1='878.667'
                    y1='55.3355'
                    x2='919.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint75_linear_3426_14976'
                    x1='890.667'
                    y1='55.3355'
                    x2='931.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint76_linear_3426_14976'
                    x1='902.667'
                    y1='55.3355'
                    x2='943.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint77_linear_3426_14976'
                    x1='914.667'
                    y1='55.3355'
                    x2='955.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint78_linear_3426_14976'
                    x1='926.667'
                    y1='55.3355'
                    x2='967.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint79_linear_3426_14976'
                    x1='938.667'
                    y1='45.9408'
                    x2='958.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint80_linear_3426_14976'
                    x1='950.667'
                    y1='45.9408'
                    x2='970.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint81_linear_3426_14976'
                    x1='962.667'
                    y1='55.3355'
                    x2='1003.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint82_linear_3426_14976'
                    x1='974.667'
                    y1='55.3355'
                    x2='1015.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint83_linear_3426_14976'
                    x1='986.667'
                    y1='67.8618'
                    x2='1025.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint84_linear_3426_14976'
                    x1='998.667'
                    y1='67.8618'
                    x2='1037.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint85_linear_3426_14976'
                    x1='1010.33'
                    y1='92.1056'
                    x2='1064.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint86_linear_3426_14976'
                    x1='1022.33'
                    y1='92.1056'
                    x2='1076.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint87_linear_3426_14976'
                    x1='1034.67'
                    y1='67.8618'
                    x2='1073.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint88_linear_3426_14976'
                    x1='1046.67'
                    y1='67.8618'
                    x2='1085.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint89_linear_3426_14976'
                    x1='1058.67'
                    y1='67.8618'
                    x2='1097.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint90_linear_3426_14976'
                    x1='1070.67'
                    y1='67.8618'
                    x2='1109.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint91_linear_3426_14976'
                    x1='1082.67'
                    y1='55.3355'
                    x2='1123.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint92_linear_3426_14976'
                    x1='1094.67'
                    y1='55.3355'
                    x2='1135.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint93_linear_3426_14976'
                    x1='1106.67'
                    y1='55.3355'
                    x2='1147.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint94_linear_3426_14976'
                    x1='1118.67'
                    y1='55.3355'
                    x2='1159.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint95_linear_3426_14976'
                    x1='1130.33'
                    y1='92.1056'
                    x2='1184.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint96_linear_3426_14976'
                    x1='1142.33'
                    y1='92.1056'
                    x2='1196.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint97_linear_3426_14976'
                    x1='1154.67'
                    y1='67.8618'
                    x2='1193.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint98_linear_3426_14976'
                    x1='1166.67'
                    y1='67.8618'
                    x2='1205.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint99_linear_3426_14976'
                    x1='1178.67'
                    y1='67.8618'
                    x2='1217.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint100_linear_3426_14976'
                    x1='1190.67'
                    y1='67.8618'
                    x2='1229.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint101_linear_3426_14976'
                    x1='1202.33'
                    y1='92.1056'
                    x2='1256.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint102_linear_3426_14976'
                    x1='1214.33'
                    y1='92.1056'
                    x2='1268.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint103_linear_3426_14976'
                    x1='1226.67'
                    y1='67.8618'
                    x2='1265.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint104_linear_3426_14976'
                    x1='1238.67'
                    y1='67.8618'
                    x2='1277.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint105_linear_3426_14976'
                    x1='1250.33'
                    y1='92.1056'
                    x2='1304.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint106_linear_3426_14976'
                    x1='1262.33'
                    y1='92.1056'
                    x2='1316.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint107_linear_3426_14976'
                    x1='1274.67'
                    y1='67.8618'
                    x2='1313.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint108_linear_3426_14976'
                    x1='1286.67'
                    y1='67.8618'
                    x2='1325.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint109_linear_3426_14976'
                    x1='1298.67'
                    y1='55.3355'
                    x2='1339.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint110_linear_3426_14976'
                    x1='1310.67'
                    y1='55.3355'
                    x2='1351.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint111_linear_3426_14976'
                    x1='1322.67'
                    y1='60.0329'
                    x2='1351.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint112_linear_3426_14976'
                    x1='1334.67'
                    y1='60.0329'
                    x2='1363.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint113_linear_3426_14976'
                    x1='1346.67'
                    y1='55.3355'
                    x2='1387.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint114_linear_3426_14976'
                    x1='1358.67'
                    y1='55.3355'
                    x2='1399.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint115_linear_3426_14976'
                    x1='1370.67'
                    y1='45.9408'
                    x2='1390.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint116_linear_3426_14976'
                    x1='1382.67'
                    y1='45.9408'
                    x2='1402.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint117_linear_3426_14976'
                    x1='1394.67'
                    y1='45.9408'
                    x2='1414.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint118_linear_3426_14976'
                    x1='1406.67'
                    y1='45.9408'
                    x2='1426.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint119_linear_3426_14976'
                    x1='1418.67'
                    y1='55.3355'
                    x2='1441.12'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint120_linear_3426_14976'
                    x1='1430.67'
                    y1='55.3355'
                    x2='1453.12'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint121_linear_3426_14976'
                    x1='1442.67'
                    y1='55.3355'
                    x2='1483.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint122_linear_3426_14976'
                    x1='1454.67'
                    y1='55.3355'
                    x2='1495.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint123_linear_3426_14976'
                    x1='1466.67'
                    y1='60.0329'
                    x2='1495.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint124_linear_3426_14976'
                    x1='1478.67'
                    y1='60.0329'
                    x2='1507.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint125_linear_3426_14976'
                    x1='1490.67'
                    y1='45.9408'
                    x2='1510.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                </defs>
              </svg>
              <svg
                width='1512'
                height='59'
                viewBox='0 0 1512 59'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint0_linear_3426_14976)'
                ></rect>
                <rect
                  x='12'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint1_linear_3426_14976)'
                ></rect>
                <rect
                  x='24'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint2_linear_3426_14976)'
                ></rect>
                <rect
                  x='36'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint3_linear_3426_14976)'
                ></rect>
                <rect
                  x='48'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint4_linear_3426_14976)'
                ></rect>
                <rect
                  x='60'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint5_linear_3426_14976)'
                ></rect>
                <rect
                  x='72'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint6_linear_3426_14976)'
                ></rect>
                <rect
                  x='84'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint7_linear_3426_14976)'
                ></rect>
                <rect
                  x='96'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint8_linear_3426_14976)'
                ></rect>
                <rect
                  x='108'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint9_linear_3426_14976)'
                ></rect>
                <rect
                  x='120'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint10_linear_3426_14976)'
                ></rect>
                <rect
                  x='132'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint11_linear_3426_14976)'
                ></rect>
                <rect
                  x='144'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint12_linear_3426_14976)'
                ></rect>
                <rect
                  x='156'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint13_linear_3426_14976)'
                ></rect>
                <rect
                  x='168'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint14_linear_3426_14976)'
                ></rect>
                <rect
                  x='180'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint15_linear_3426_14976)'
                ></rect>
                <rect
                  x='192'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint16_linear_3426_14976)'
                ></rect>
                <rect
                  x='204'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint17_linear_3426_14976)'
                ></rect>
                <rect
                  x='216'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint18_linear_3426_14976)'
                ></rect>
                <rect
                  x='228'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint19_linear_3426_14976)'
                ></rect>
                <rect
                  x='240'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint20_linear_3426_14976)'
                ></rect>
                <rect
                  x='252'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint21_linear_3426_14976)'
                ></rect>
                <rect
                  x='264'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint22_linear_3426_14976)'
                ></rect>
                <rect
                  x='276'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint23_linear_3426_14976)'
                ></rect>
                <rect
                  x='288'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint24_linear_3426_14976)'
                ></rect>
                <rect
                  x='300'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint25_linear_3426_14976)'
                ></rect>
                <rect
                  x='312'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint26_linear_3426_14976)'
                ></rect>
                <rect
                  x='324'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint27_linear_3426_14976)'
                ></rect>
                <rect
                  x='336'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint28_linear_3426_14976)'
                ></rect>
                <rect
                  x='348'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint29_linear_3426_14976)'
                ></rect>
                <rect
                  x='360'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint30_linear_3426_14976)'
                ></rect>
                <rect
                  x='372'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint31_linear_3426_14976)'
                ></rect>
                <rect
                  x='384'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint32_linear_3426_14976)'
                ></rect>
                <rect
                  x='396'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint33_linear_3426_14976)'
                ></rect>
                <rect
                  x='408'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint34_linear_3426_14976)'
                ></rect>
                <rect
                  x='420'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint35_linear_3426_14976)'
                ></rect>
                <rect
                  x='432'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint36_linear_3426_14976)'
                ></rect>
                <rect
                  x='444'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint37_linear_3426_14976)'
                ></rect>
                <rect
                  x='456'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint38_linear_3426_14976)'
                ></rect>
                <rect
                  x='468'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint39_linear_3426_14976)'
                ></rect>
                <rect
                  x='480'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint40_linear_3426_14976)'
                ></rect>
                <rect
                  x='492'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint41_linear_3426_14976)'
                ></rect>
                <rect
                  x='504'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint42_linear_3426_14976)'
                ></rect>
                <rect
                  x='516'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint43_linear_3426_14976)'
                ></rect>
                <rect
                  x='528'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint44_linear_3426_14976)'
                ></rect>
                <rect
                  x='540'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint45_linear_3426_14976)'
                ></rect>
                <rect
                  x='552'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint46_linear_3426_14976)'
                ></rect>
                <rect
                  x='564'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint47_linear_3426_14976)'
                ></rect>
                <rect
                  x='576'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint48_linear_3426_14976)'
                ></rect>
                <rect
                  x='588'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint49_linear_3426_14976)'
                ></rect>
                <rect
                  x='600'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint50_linear_3426_14976)'
                ></rect>
                <rect
                  x='612'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint51_linear_3426_14976)'
                ></rect>
                <rect
                  x='624'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint52_linear_3426_14976)'
                ></rect>
                <rect
                  x='636'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint53_linear_3426_14976)'
                ></rect>
                <rect
                  x='648'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint54_linear_3426_14976)'
                ></rect>
                <rect
                  x='660'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint55_linear_3426_14976)'
                ></rect>
                <rect
                  x='672'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint56_linear_3426_14976)'
                ></rect>
                <rect
                  x='684'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint57_linear_3426_14976)'
                ></rect>
                <rect
                  x='696'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint58_linear_3426_14976)'
                ></rect>
                <rect
                  x='708'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint59_linear_3426_14976)'
                ></rect>
                <rect
                  x='720'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint60_linear_3426_14976)'
                ></rect>
                <rect
                  x='732'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint61_linear_3426_14976)'
                ></rect>
                <rect
                  x='744'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint62_linear_3426_14976)'
                ></rect>
                <rect
                  x='756'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint63_linear_3426_14976)'
                ></rect>
                <rect
                  x='768'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint64_linear_3426_14976)'
                ></rect>
                <rect
                  x='780'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint65_linear_3426_14976)'
                ></rect>
                <rect
                  x='792'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint66_linear_3426_14976)'
                ></rect>
                <rect
                  x='804'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint67_linear_3426_14976)'
                ></rect>
                <rect
                  x='816'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint68_linear_3426_14976)'
                ></rect>
                <rect
                  x='828'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint69_linear_3426_14976)'
                ></rect>
                <rect
                  x='840'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint70_linear_3426_14976)'
                ></rect>
                <rect
                  x='852'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint71_linear_3426_14976)'
                ></rect>
                <rect
                  x='864'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint72_linear_3426_14976)'
                ></rect>
                <rect
                  x='876'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint73_linear_3426_14976)'
                ></rect>
                <rect
                  x='888'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint74_linear_3426_14976)'
                ></rect>
                <rect
                  x='900'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint75_linear_3426_14976)'
                ></rect>
                <rect
                  x='912'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint76_linear_3426_14976)'
                ></rect>
                <rect
                  x='924'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint77_linear_3426_14976)'
                ></rect>
                <rect
                  x='936'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint78_linear_3426_14976)'
                ></rect>
                <rect
                  x='948'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint79_linear_3426_14976)'
                ></rect>
                <rect
                  x='960'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint80_linear_3426_14976)'
                ></rect>
                <rect
                  x='972'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint81_linear_3426_14976)'
                ></rect>
                <rect
                  x='984'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint82_linear_3426_14976)'
                ></rect>
                <rect
                  x='996'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint83_linear_3426_14976)'
                ></rect>
                <rect
                  x='1008'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint84_linear_3426_14976)'
                ></rect>
                <rect
                  x='1020'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint85_linear_3426_14976)'
                ></rect>
                <rect
                  x='1032'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint86_linear_3426_14976)'
                ></rect>
                <rect
                  x='1044'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint87_linear_3426_14976)'
                ></rect>
                <rect
                  x='1056'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint88_linear_3426_14976)'
                ></rect>
                <rect
                  x='1068'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint89_linear_3426_14976)'
                ></rect>
                <rect
                  x='1080'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint90_linear_3426_14976)'
                ></rect>
                <rect
                  x='1092'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint91_linear_3426_14976)'
                ></rect>
                <rect
                  x='1104'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint92_linear_3426_14976)'
                ></rect>
                <rect
                  x='1116'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint93_linear_3426_14976)'
                ></rect>
                <rect
                  x='1128'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint94_linear_3426_14976)'
                ></rect>
                <rect
                  x='1140'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint95_linear_3426_14976)'
                ></rect>
                <rect
                  x='1152'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint96_linear_3426_14976)'
                ></rect>
                <rect
                  x='1164'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint97_linear_3426_14976)'
                ></rect>
                <rect
                  x='1176'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint98_linear_3426_14976)'
                ></rect>
                <rect
                  x='1188'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint99_linear_3426_14976)'
                ></rect>
                <rect
                  x='1200'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint100_linear_3426_14976)'
                ></rect>
                <rect
                  x='1212'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint101_linear_3426_14976)'
                ></rect>
                <rect
                  x='1224'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint102_linear_3426_14976)'
                ></rect>
                <rect
                  x='1236'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint103_linear_3426_14976)'
                ></rect>
                <rect
                  x='1248'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint104_linear_3426_14976)'
                ></rect>
                <rect
                  x='1260'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint105_linear_3426_14976)'
                ></rect>
                <rect
                  x='1272'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint106_linear_3426_14976)'
                ></rect>
                <rect
                  x='1284'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint107_linear_3426_14976)'
                ></rect>
                <rect
                  x='1296'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint108_linear_3426_14976)'
                ></rect>
                <rect
                  x='1308'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint109_linear_3426_14976)'
                ></rect>
                <rect
                  x='1320'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint110_linear_3426_14976)'
                ></rect>
                <rect
                  x='1332'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint111_linear_3426_14976)'
                ></rect>
                <rect
                  x='1344'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint112_linear_3426_14976)'
                ></rect>
                <rect
                  x='1356'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint113_linear_3426_14976)'
                ></rect>
                <rect
                  x='1368'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint114_linear_3426_14976)'
                ></rect>
                <rect
                  x='1380'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint115_linear_3426_14976)'
                ></rect>
                <rect
                  x='1392'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint116_linear_3426_14976)'
                ></rect>
                <rect
                  x='1404'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint117_linear_3426_14976)'
                ></rect>
                <rect
                  x='1416'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint118_linear_3426_14976)'
                ></rect>
                <rect
                  x='1428'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint119_linear_3426_14976)'
                ></rect>
                <rect
                  x='1440'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint120_linear_3426_14976)'
                ></rect>
                <rect
                  x='1452'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint121_linear_3426_14976)'
                ></rect>
                <rect
                  x='1464'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint122_linear_3426_14976)'
                ></rect>
                <rect
                  x='1476'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint123_linear_3426_14976)'
                ></rect>
                <rect
                  x='1488'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint124_linear_3426_14976)'
                ></rect>
                <rect
                  x='1500'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint125_linear_3426_14976)'
                ></rect>
                <defs>
                  <linearGradient
                    id='paint0_linear_3426_14976'
                    x1='-9.33334'
                    y1='41.2434'
                    x2='-22.1241'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_3426_14976'
                    x1='2.66666'
                    y1='50.6382'
                    x2='32.9331'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint2_linear_3426_14976'
                    x1='14.6667'
                    y1='67.8618'
                    x2='53.1312'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint3_linear_3426_14976'
                    x1='26.6667'
                    y1='67.8618'
                    x2='65.1312'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint4_linear_3426_14976'
                    x1='38.6667'
                    y1='60.0329'
                    x2='67.3187'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint5_linear_3426_14976'
                    x1='50.6667'
                    y1='60.0329'
                    x2='79.3187'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint6_linear_3426_14976'
                    x1='62.6667'
                    y1='50.6382'
                    x2='92.9331'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint7_linear_3426_14976'
                    x1='74.6667'
                    y1='50.6382'
                    x2='104.933'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint8_linear_3426_14976'
                    x1='86.6667'
                    y1='50.6382'
                    x2='116.933'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint9_linear_3426_14976'
                    x1='98.6667'
                    y1='50.6382'
                    x2='128.933'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint10_linear_3426_14976'
                    x1='110.667'
                    y1='60.0329'
                    x2='139.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint11_linear_3426_14976'
                    x1='122.667'
                    y1='60.0329'
                    x2='151.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint12_linear_3426_14976'
                    x1='134.667'
                    y1='67.8618'
                    x2='173.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint13_linear_3426_14976'
                    x1='146.667'
                    y1='67.8618'
                    x2='185.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint14_linear_3426_14976'
                    x1='158.333'
                    y1='92.1056'
                    x2='212.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint15_linear_3426_14976'
                    x1='170.333'
                    y1='92.1056'
                    x2='224.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint16_linear_3426_14976'
                    x1='182.667'
                    y1='67.8618'
                    x2='221.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint17_linear_3426_14976'
                    x1='194.667'
                    y1='67.8618'
                    x2='233.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint18_linear_3426_14976'
                    x1='206.667'
                    y1='60.0329'
                    x2='235.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint19_linear_3426_14976'
                    x1='218.667'
                    y1='60.0329'
                    x2='247.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint20_linear_3426_14976'
                    x1='230.667'
                    y1='67.8618'
                    x2='269.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint21_linear_3426_14976'
                    x1='242.667'
                    y1='67.8618'
                    x2='281.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint22_linear_3426_14976'
                    x1='254.333'
                    y1='92.1056'
                    x2='308.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint23_linear_3426_14976'
                    x1='266.333'
                    y1='92.1056'
                    x2='320.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint24_linear_3426_14976'
                    x1='278.667'
                    y1='67.8618'
                    x2='317.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint25_linear_3426_14976'
                    x1='290.667'
                    y1='67.8618'
                    x2='329.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint26_linear_3426_14976'
                    x1='302.333'
                    y1='92.1056'
                    x2='356.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint27_linear_3426_14976'
                    x1='314.333'
                    y1='92.1056'
                    x2='368.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint28_linear_3426_14976'
                    x1='326.667'
                    y1='67.8618'
                    x2='365.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint29_linear_3426_14976'
                    x1='338.667'
                    y1='67.8618'
                    x2='377.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint30_linear_3426_14976'
                    x1='350.667'
                    y1='67.8618'
                    x2='389.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint31_linear_3426_14976'
                    x1='362.667'
                    y1='67.8618'
                    x2='401.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint32_linear_3426_14976'
                    x1='374.667'
                    y1='60.0329'
                    x2='403.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint33_linear_3426_14976'
                    x1='386.667'
                    y1='60.0329'
                    x2='415.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint34_linear_3426_14976'
                    x1='398.667'
                    y1='55.3355'
                    x2='439.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint35_linear_3426_14976'
                    x1='410.667'
                    y1='67.8618'
                    x2='449.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint36_linear_3426_14976'
                    x1='422.667'
                    y1='67.8618'
                    x2='461.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint37_linear_3426_14976'
                    x1='434.667'
                    y1='67.8618'
                    x2='473.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint38_linear_3426_14976'
                    x1='446.333'
                    y1='92.1056'
                    x2='500.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint39_linear_3426_14976'
                    x1='458.667'
                    y1='55.3355'
                    x2='499.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint40_linear_3426_14976'
                    x1='470.667'
                    y1='60.0329'
                    x2='499.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint41_linear_3426_14976'
                    x1='482.667'
                    y1='55.3355'
                    x2='505.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint42_linear_3426_14976'
                    x1='494.667'
                    y1='60.0329'
                    x2='523.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint43_linear_3426_14976'
                    x1='506.667'
                    y1='60.0329'
                    x2='535.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint44_linear_3426_14976'
                    x1='518.667'
                    y1='55.3355'
                    x2='541.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint45_linear_3426_14976'
                    x1='530.667'
                    y1='55.3355'
                    x2='553.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint46_linear_3426_14976'
                    x1='542.667'
                    y1='45.9408'
                    x2='562.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint47_linear_3426_14976'
                    x1='554.667'
                    y1='45.9408'
                    x2='574.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint48_linear_3426_14976'
                    x1='566.667'
                    y1='41.2434'
                    x2='553.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint49_linear_3426_14976'
                    x1='578.667'
                    y1='41.2434'
                    x2='565.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint50_linear_3426_14976'
                    x1='590.667'
                    y1='45.9408'
                    x2='610.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint51_linear_3426_14976'
                    x1='602.667'
                    y1='55.3355'
                    x2='625.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint52_linear_3426_14976'
                    x1='614.333'
                    y1='92.1056'
                    x2='668.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint53_linear_3426_14976'
                    x1='626.333'
                    y1='92.1056'
                    x2='680.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint54_linear_3426_14976'
                    x1='638.667'
                    y1='67.8618'
                    x2='677.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint55_linear_3426_14976'
                    x1='650.667'
                    y1='67.8618'
                    x2='689.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint56_linear_3426_14976'
                    x1='662.667'
                    y1='67.8618'
                    x2='701.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint57_linear_3426_14976'
                    x1='674.667'
                    y1='67.8618'
                    x2='713.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint58_linear_3426_14976'
                    x1='686.333'
                    y1='92.1056'
                    x2='740.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint59_linear_3426_14976'
                    x1='698.333'
                    y1='92.1056'
                    x2='752.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint60_linear_3426_14976'
                    x1='710.667'
                    y1='67.8618'
                    x2='749.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint61_linear_3426_14976'
                    x1='722.667'
                    y1='67.8618'
                    x2='761.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint62_linear_3426_14976'
                    x1='734.333'
                    y1='92.1056'
                    x2='788.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint63_linear_3426_14976'
                    x1='746.333'
                    y1='92.1056'
                    x2='800.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint64_linear_3426_14976'
                    x1='758.667'
                    y1='67.8618'
                    x2='797.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint65_linear_3426_14976'
                    x1='770.667'
                    y1='67.8618'
                    x2='809.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint66_linear_3426_14976'
                    x1='782.667'
                    y1='55.3355'
                    x2='823.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint67_linear_3426_14976'
                    x1='794.667'
                    y1='45.9408'
                    x2='814.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint68_linear_3426_14976'
                    x1='806.667'
                    y1='45.9408'
                    x2='826.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint69_linear_3426_14976'
                    x1='818.667'
                    y1='41.2434'
                    x2='805.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint70_linear_3426_14976'
                    x1='830.667'
                    y1='41.2434'
                    x2='817.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint71_linear_3426_14976'
                    x1='842.667'
                    y1='45.9408'
                    x2='862.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint72_linear_3426_14976'
                    x1='854.667'
                    y1='45.9408'
                    x2='874.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint73_linear_3426_14976'
                    x1='866.667'
                    y1='55.3355'
                    x2='907.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint74_linear_3426_14976'
                    x1='878.667'
                    y1='55.3355'
                    x2='919.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint75_linear_3426_14976'
                    x1='890.667'
                    y1='55.3355'
                    x2='931.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint76_linear_3426_14976'
                    x1='902.667'
                    y1='55.3355'
                    x2='943.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint77_linear_3426_14976'
                    x1='914.667'
                    y1='55.3355'
                    x2='955.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint78_linear_3426_14976'
                    x1='926.667'
                    y1='55.3355'
                    x2='967.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint79_linear_3426_14976'
                    x1='938.667'
                    y1='45.9408'
                    x2='958.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint80_linear_3426_14976'
                    x1='950.667'
                    y1='45.9408'
                    x2='970.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint81_linear_3426_14976'
                    x1='962.667'
                    y1='55.3355'
                    x2='1003.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint82_linear_3426_14976'
                    x1='974.667'
                    y1='55.3355'
                    x2='1015.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint83_linear_3426_14976'
                    x1='986.667'
                    y1='67.8618'
                    x2='1025.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint84_linear_3426_14976'
                    x1='998.667'
                    y1='67.8618'
                    x2='1037.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint85_linear_3426_14976'
                    x1='1010.33'
                    y1='92.1056'
                    x2='1064.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint86_linear_3426_14976'
                    x1='1022.33'
                    y1='92.1056'
                    x2='1076.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint87_linear_3426_14976'
                    x1='1034.67'
                    y1='67.8618'
                    x2='1073.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint88_linear_3426_14976'
                    x1='1046.67'
                    y1='67.8618'
                    x2='1085.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint89_linear_3426_14976'
                    x1='1058.67'
                    y1='67.8618'
                    x2='1097.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint90_linear_3426_14976'
                    x1='1070.67'
                    y1='67.8618'
                    x2='1109.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint91_linear_3426_14976'
                    x1='1082.67'
                    y1='55.3355'
                    x2='1123.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint92_linear_3426_14976'
                    x1='1094.67'
                    y1='55.3355'
                    x2='1135.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint93_linear_3426_14976'
                    x1='1106.67'
                    y1='55.3355'
                    x2='1147.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint94_linear_3426_14976'
                    x1='1118.67'
                    y1='55.3355'
                    x2='1159.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint95_linear_3426_14976'
                    x1='1130.33'
                    y1='92.1056'
                    x2='1184.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint96_linear_3426_14976'
                    x1='1142.33'
                    y1='92.1056'
                    x2='1196.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint97_linear_3426_14976'
                    x1='1154.67'
                    y1='67.8618'
                    x2='1193.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint98_linear_3426_14976'
                    x1='1166.67'
                    y1='67.8618'
                    x2='1205.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint99_linear_3426_14976'
                    x1='1178.67'
                    y1='67.8618'
                    x2='1217.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint100_linear_3426_14976'
                    x1='1190.67'
                    y1='67.8618'
                    x2='1229.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint101_linear_3426_14976'
                    x1='1202.33'
                    y1='92.1056'
                    x2='1256.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint102_linear_3426_14976'
                    x1='1214.33'
                    y1='92.1056'
                    x2='1268.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint103_linear_3426_14976'
                    x1='1226.67'
                    y1='67.8618'
                    x2='1265.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint104_linear_3426_14976'
                    x1='1238.67'
                    y1='67.8618'
                    x2='1277.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint105_linear_3426_14976'
                    x1='1250.33'
                    y1='92.1056'
                    x2='1304.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint106_linear_3426_14976'
                    x1='1262.33'
                    y1='92.1056'
                    x2='1316.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint107_linear_3426_14976'
                    x1='1274.67'
                    y1='67.8618'
                    x2='1313.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint108_linear_3426_14976'
                    x1='1286.67'
                    y1='67.8618'
                    x2='1325.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint109_linear_3426_14976'
                    x1='1298.67'
                    y1='55.3355'
                    x2='1339.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint110_linear_3426_14976'
                    x1='1310.67'
                    y1='55.3355'
                    x2='1351.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint111_linear_3426_14976'
                    x1='1322.67'
                    y1='60.0329'
                    x2='1351.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint112_linear_3426_14976'
                    x1='1334.67'
                    y1='60.0329'
                    x2='1363.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint113_linear_3426_14976'
                    x1='1346.67'
                    y1='55.3355'
                    x2='1387.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint114_linear_3426_14976'
                    x1='1358.67'
                    y1='55.3355'
                    x2='1399.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint115_linear_3426_14976'
                    x1='1370.67'
                    y1='45.9408'
                    x2='1390.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint116_linear_3426_14976'
                    x1='1382.67'
                    y1='45.9408'
                    x2='1402.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint117_linear_3426_14976'
                    x1='1394.67'
                    y1='45.9408'
                    x2='1414.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint118_linear_3426_14976'
                    x1='1406.67'
                    y1='45.9408'
                    x2='1426.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint119_linear_3426_14976'
                    x1='1418.67'
                    y1='55.3355'
                    x2='1441.12'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint120_linear_3426_14976'
                    x1='1430.67'
                    y1='55.3355'
                    x2='1453.12'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint121_linear_3426_14976'
                    x1='1442.67'
                    y1='55.3355'
                    x2='1483.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint122_linear_3426_14976'
                    x1='1454.67'
                    y1='55.3355'
                    x2='1495.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint123_linear_3426_14976'
                    x1='1466.67'
                    y1='60.0329'
                    x2='1495.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint124_linear_3426_14976'
                    x1='1478.67'
                    y1='60.0329'
                    x2='1507.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint125_linear_3426_14976'
                    x1='1490.67'
                    y1='45.9408'
                    x2='1510.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                </defs>
              </svg>
              <svg
                width='1512'
                height='59'
                viewBox='0 0 1512 59'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint0_linear_3426_14976)'
                ></rect>
                <rect
                  x='12'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint1_linear_3426_14976)'
                ></rect>
                <rect
                  x='24'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint2_linear_3426_14976)'
                ></rect>
                <rect
                  x='36'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint3_linear_3426_14976)'
                ></rect>
                <rect
                  x='48'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint4_linear_3426_14976)'
                ></rect>
                <rect
                  x='60'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint5_linear_3426_14976)'
                ></rect>
                <rect
                  x='72'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint6_linear_3426_14976)'
                ></rect>
                <rect
                  x='84'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint7_linear_3426_14976)'
                ></rect>
                <rect
                  x='96'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint8_linear_3426_14976)'
                ></rect>
                <rect
                  x='108'
                  y='16'
                  width='4'
                  height='27'
                  rx='2'
                  fill='url(#paint9_linear_3426_14976)'
                ></rect>
                <rect
                  x='120'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint10_linear_3426_14976)'
                ></rect>
                <rect
                  x='132'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint11_linear_3426_14976)'
                ></rect>
                <rect
                  x='144'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint12_linear_3426_14976)'
                ></rect>
                <rect
                  x='156'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint13_linear_3426_14976)'
                ></rect>
                <rect
                  x='168'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint14_linear_3426_14976)'
                ></rect>
                <rect
                  x='180'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint15_linear_3426_14976)'
                ></rect>
                <rect
                  x='192'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint16_linear_3426_14976)'
                ></rect>
                <rect
                  x='204'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint17_linear_3426_14976)'
                ></rect>
                <rect
                  x='216'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint18_linear_3426_14976)'
                ></rect>
                <rect
                  x='228'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint19_linear_3426_14976)'
                ></rect>
                <rect
                  x='240'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint20_linear_3426_14976)'
                ></rect>
                <rect
                  x='252'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint21_linear_3426_14976)'
                ></rect>
                <rect
                  x='264'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint22_linear_3426_14976)'
                ></rect>
                <rect
                  x='276'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint23_linear_3426_14976)'
                ></rect>
                <rect
                  x='288'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint24_linear_3426_14976)'
                ></rect>
                <rect
                  x='300'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint25_linear_3426_14976)'
                ></rect>
                <rect
                  x='312'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint26_linear_3426_14976)'
                ></rect>
                <rect
                  x='324'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint27_linear_3426_14976)'
                ></rect>
                <rect
                  x='336'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint28_linear_3426_14976)'
                ></rect>
                <rect
                  x='348'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint29_linear_3426_14976)'
                ></rect>
                <rect
                  x='360'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint30_linear_3426_14976)'
                ></rect>
                <rect
                  x='372'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint31_linear_3426_14976)'
                ></rect>
                <rect
                  x='384'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint32_linear_3426_14976)'
                ></rect>
                <rect
                  x='396'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint33_linear_3426_14976)'
                ></rect>
                <rect
                  x='408'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint34_linear_3426_14976)'
                ></rect>
                <rect
                  x='420'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint35_linear_3426_14976)'
                ></rect>
                <rect
                  x='432'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint36_linear_3426_14976)'
                ></rect>
                <rect
                  x='444'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint37_linear_3426_14976)'
                ></rect>
                <rect
                  x='456'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint38_linear_3426_14976)'
                ></rect>
                <rect
                  x='468'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint39_linear_3426_14976)'
                ></rect>
                <rect
                  x='480'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint40_linear_3426_14976)'
                ></rect>
                <rect
                  x='492'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint41_linear_3426_14976)'
                ></rect>
                <rect
                  x='504'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint42_linear_3426_14976)'
                ></rect>
                <rect
                  x='516'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint43_linear_3426_14976)'
                ></rect>
                <rect
                  x='528'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint44_linear_3426_14976)'
                ></rect>
                <rect
                  x='540'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint45_linear_3426_14976)'
                ></rect>
                <rect
                  x='552'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint46_linear_3426_14976)'
                ></rect>
                <rect
                  x='564'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint47_linear_3426_14976)'
                ></rect>
                <rect
                  x='576'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint48_linear_3426_14976)'
                ></rect>
                <rect
                  x='588'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint49_linear_3426_14976)'
                ></rect>
                <rect
                  x='600'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint50_linear_3426_14976)'
                ></rect>
                <rect
                  x='612'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint51_linear_3426_14976)'
                ></rect>
                <rect
                  x='624'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint52_linear_3426_14976)'
                ></rect>
                <rect
                  x='636'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint53_linear_3426_14976)'
                ></rect>
                <rect
                  x='648'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint54_linear_3426_14976)'
                ></rect>
                <rect
                  x='660'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint55_linear_3426_14976)'
                ></rect>
                <rect
                  x='672'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint56_linear_3426_14976)'
                ></rect>
                <rect
                  x='684'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint57_linear_3426_14976)'
                ></rect>
                <rect
                  x='696'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint58_linear_3426_14976)'
                ></rect>
                <rect
                  x='708'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint59_linear_3426_14976)'
                ></rect>
                <rect
                  x='720'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint60_linear_3426_14976)'
                ></rect>
                <rect
                  x='732'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint61_linear_3426_14976)'
                ></rect>
                <rect
                  x='744'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint62_linear_3426_14976)'
                ></rect>
                <rect
                  x='756'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint63_linear_3426_14976)'
                ></rect>
                <rect
                  x='768'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint64_linear_3426_14976)'
                ></rect>
                <rect
                  x='780'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint65_linear_3426_14976)'
                ></rect>
                <rect
                  x='792'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint66_linear_3426_14976)'
                ></rect>
                <rect
                  x='804'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint67_linear_3426_14976)'
                ></rect>
                <rect
                  x='816'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint68_linear_3426_14976)'
                ></rect>
                <rect
                  x='828'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint69_linear_3426_14976)'
                ></rect>
                <rect
                  x='840'
                  y='22'
                  width='4'
                  height='15'
                  rx='2'
                  fill='url(#paint70_linear_3426_14976)'
                ></rect>
                <rect
                  x='852'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint71_linear_3426_14976)'
                ></rect>
                <rect
                  x='864'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint72_linear_3426_14976)'
                ></rect>
                <rect
                  x='876'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint73_linear_3426_14976)'
                ></rect>
                <rect
                  x='888'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint74_linear_3426_14976)'
                ></rect>
                <rect
                  x='900'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint75_linear_3426_14976)'
                ></rect>
                <rect
                  x='912'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint76_linear_3426_14976)'
                ></rect>
                <rect
                  x='924'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint77_linear_3426_14976)'
                ></rect>
                <rect
                  x='936'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint78_linear_3426_14976)'
                ></rect>
                <rect
                  x='948'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint79_linear_3426_14976)'
                ></rect>
                <rect
                  x='960'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint80_linear_3426_14976)'
                ></rect>
                <rect
                  x='972'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint81_linear_3426_14976)'
                ></rect>
                <rect
                  x='984'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint82_linear_3426_14976)'
                ></rect>
                <rect
                  x='996'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint83_linear_3426_14976)'
                ></rect>
                <rect
                  x='1008'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint84_linear_3426_14976)'
                ></rect>
                <rect
                  x='1020'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint85_linear_3426_14976)'
                ></rect>
                <rect
                  x='1032'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint86_linear_3426_14976)'
                ></rect>
                <rect
                  x='1044'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint87_linear_3426_14976)'
                ></rect>
                <rect
                  x='1056'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint88_linear_3426_14976)'
                ></rect>
                <rect
                  x='1068'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint89_linear_3426_14976)'
                ></rect>
                <rect
                  x='1080'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint90_linear_3426_14976)'
                ></rect>
                <rect
                  x='1092'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint91_linear_3426_14976)'
                ></rect>
                <rect
                  x='1104'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint92_linear_3426_14976)'
                ></rect>
                <rect
                  x='1116'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint93_linear_3426_14976)'
                ></rect>
                <rect
                  x='1128'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint94_linear_3426_14976)'
                ></rect>
                <rect
                  x='1140'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint95_linear_3426_14976)'
                ></rect>
                <rect
                  x='1152'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint96_linear_3426_14976)'
                ></rect>
                <rect
                  x='1164'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint97_linear_3426_14976)'
                ></rect>
                <rect
                  x='1176'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint98_linear_3426_14976)'
                ></rect>
                <rect
                  x='1188'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint99_linear_3426_14976)'
                ></rect>
                <rect
                  x='1200'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint100_linear_3426_14976)'
                ></rect>
                <rect
                  x='1212'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint101_linear_3426_14976)'
                ></rect>
                <rect
                  x='1224'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint102_linear_3426_14976)'
                ></rect>
                <rect
                  x='1236'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint103_linear_3426_14976)'
                ></rect>
                <rect
                  x='1248'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint104_linear_3426_14976)'
                ></rect>
                <rect
                  x='1260'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint105_linear_3426_14976)'
                ></rect>
                <rect
                  x='1272'
                  width='4'
                  height='59'
                  rx='2'
                  fill='url(#paint106_linear_3426_14976)'
                ></rect>
                <rect
                  x='1284'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint107_linear_3426_14976)'
                ></rect>
                <rect
                  x='1296'
                  y='5'
                  width='4'
                  height='49'
                  rx='2'
                  fill='url(#paint108_linear_3426_14976)'
                ></rect>
                <rect
                  x='1308'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint109_linear_3426_14976)'
                ></rect>
                <rect
                  x='1320'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint110_linear_3426_14976)'
                ></rect>
                <rect
                  x='1332'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint111_linear_3426_14976)'
                ></rect>
                <rect
                  x='1344'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint112_linear_3426_14976)'
                ></rect>
                <rect
                  x='1356'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint113_linear_3426_14976)'
                ></rect>
                <rect
                  x='1368'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint114_linear_3426_14976)'
                ></rect>
                <rect
                  x='1380'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint115_linear_3426_14976)'
                ></rect>
                <rect
                  x='1392'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint116_linear_3426_14976)'
                ></rect>
                <rect
                  x='1404'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint117_linear_3426_14976)'
                ></rect>
                <rect
                  x='1416'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint118_linear_3426_14976)'
                ></rect>
                <rect
                  x='1428'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint119_linear_3426_14976)'
                ></rect>
                <rect
                  x='1440'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint120_linear_3426_14976)'
                ></rect>
                <rect
                  x='1452'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint121_linear_3426_14976)'
                ></rect>
                <rect
                  x='1464'
                  y='13'
                  width='4'
                  height='33'
                  rx='2'
                  fill='url(#paint122_linear_3426_14976)'
                ></rect>
                <rect
                  x='1476'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint123_linear_3426_14976)'
                ></rect>
                <rect
                  x='1488'
                  y='10'
                  width='4'
                  height='39'
                  rx='2'
                  fill='url(#paint124_linear_3426_14976)'
                ></rect>
                <rect
                  x='1500'
                  y='19'
                  width='4'
                  height='21'
                  rx='2'
                  fill='url(#paint125_linear_3426_14976)'
                ></rect>
                <defs>
                  <linearGradient
                    id='paint0_linear_3426_14976'
                    x1='-9.33334'
                    y1='41.2434'
                    x2='-22.1241'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_3426_14976'
                    x1='2.66666'
                    y1='50.6382'
                    x2='32.9331'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint2_linear_3426_14976'
                    x1='14.6667'
                    y1='67.8618'
                    x2='53.1312'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint3_linear_3426_14976'
                    x1='26.6667'
                    y1='67.8618'
                    x2='65.1312'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint4_linear_3426_14976'
                    x1='38.6667'
                    y1='60.0329'
                    x2='67.3187'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint5_linear_3426_14976'
                    x1='50.6667'
                    y1='60.0329'
                    x2='79.3187'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint6_linear_3426_14976'
                    x1='62.6667'
                    y1='50.6382'
                    x2='92.9331'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint7_linear_3426_14976'
                    x1='74.6667'
                    y1='50.6382'
                    x2='104.933'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint8_linear_3426_14976'
                    x1='86.6667'
                    y1='50.6382'
                    x2='116.933'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint9_linear_3426_14976'
                    x1='98.6667'
                    y1='50.6382'
                    x2='128.933'
                    y2='-8.47815'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint10_linear_3426_14976'
                    x1='110.667'
                    y1='60.0329'
                    x2='139.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint11_linear_3426_14976'
                    x1='122.667'
                    y1='60.0329'
                    x2='151.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint12_linear_3426_14976'
                    x1='134.667'
                    y1='67.8618'
                    x2='173.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint13_linear_3426_14976'
                    x1='146.667'
                    y1='67.8618'
                    x2='185.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint14_linear_3426_14976'
                    x1='158.333'
                    y1='92.1056'
                    x2='212.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint15_linear_3426_14976'
                    x1='170.333'
                    y1='92.1056'
                    x2='224.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint16_linear_3426_14976'
                    x1='182.667'
                    y1='67.8618'
                    x2='221.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint17_linear_3426_14976'
                    x1='194.667'
                    y1='67.8618'
                    x2='233.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint18_linear_3426_14976'
                    x1='206.667'
                    y1='60.0329'
                    x2='235.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint19_linear_3426_14976'
                    x1='218.667'
                    y1='60.0329'
                    x2='247.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint20_linear_3426_14976'
                    x1='230.667'
                    y1='67.8618'
                    x2='269.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint21_linear_3426_14976'
                    x1='242.667'
                    y1='67.8618'
                    x2='281.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint22_linear_3426_14976'
                    x1='254.333'
                    y1='92.1056'
                    x2='308.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint23_linear_3426_14976'
                    x1='266.333'
                    y1='92.1056'
                    x2='320.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint24_linear_3426_14976'
                    x1='278.667'
                    y1='67.8618'
                    x2='317.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint25_linear_3426_14976'
                    x1='290.667'
                    y1='67.8618'
                    x2='329.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint26_linear_3426_14976'
                    x1='302.333'
                    y1='92.1056'
                    x2='356.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint27_linear_3426_14976'
                    x1='314.333'
                    y1='92.1056'
                    x2='368.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint28_linear_3426_14976'
                    x1='326.667'
                    y1='67.8618'
                    x2='365.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint29_linear_3426_14976'
                    x1='338.667'
                    y1='67.8618'
                    x2='377.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint30_linear_3426_14976'
                    x1='350.667'
                    y1='67.8618'
                    x2='389.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint31_linear_3426_14976'
                    x1='362.667'
                    y1='67.8618'
                    x2='401.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint32_linear_3426_14976'
                    x1='374.667'
                    y1='60.0329'
                    x2='403.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint33_linear_3426_14976'
                    x1='386.667'
                    y1='60.0329'
                    x2='415.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint34_linear_3426_14976'
                    x1='398.667'
                    y1='55.3355'
                    x2='439.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint35_linear_3426_14976'
                    x1='410.667'
                    y1='67.8618'
                    x2='449.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint36_linear_3426_14976'
                    x1='422.667'
                    y1='67.8618'
                    x2='461.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint37_linear_3426_14976'
                    x1='434.667'
                    y1='67.8618'
                    x2='473.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint38_linear_3426_14976'
                    x1='446.333'
                    y1='92.1056'
                    x2='500.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint39_linear_3426_14976'
                    x1='458.667'
                    y1='55.3355'
                    x2='499.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint40_linear_3426_14976'
                    x1='470.667'
                    y1='60.0329'
                    x2='499.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint41_linear_3426_14976'
                    x1='482.667'
                    y1='55.3355'
                    x2='505.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint42_linear_3426_14976'
                    x1='494.667'
                    y1='60.0329'
                    x2='523.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint43_linear_3426_14976'
                    x1='506.667'
                    y1='60.0329'
                    x2='535.319'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint44_linear_3426_14976'
                    x1='518.667'
                    y1='55.3355'
                    x2='541.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint45_linear_3426_14976'
                    x1='530.667'
                    y1='55.3355'
                    x2='553.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint46_linear_3426_14976'
                    x1='542.667'
                    y1='45.9408'
                    x2='562.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint47_linear_3426_14976'
                    x1='554.667'
                    y1='45.9408'
                    x2='574.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint48_linear_3426_14976'
                    x1='566.667'
                    y1='41.2434'
                    x2='553.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint49_linear_3426_14976'
                    x1='578.667'
                    y1='41.2434'
                    x2='565.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint50_linear_3426_14976'
                    x1='590.667'
                    y1='45.9408'
                    x2='610.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint51_linear_3426_14976'
                    x1='602.667'
                    y1='55.3355'
                    x2='625.119'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint52_linear_3426_14976'
                    x1='614.333'
                    y1='92.1056'
                    x2='668.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint53_linear_3426_14976'
                    x1='626.333'
                    y1='92.1056'
                    x2='680.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint54_linear_3426_14976'
                    x1='638.667'
                    y1='67.8618'
                    x2='677.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint55_linear_3426_14976'
                    x1='650.667'
                    y1='67.8618'
                    x2='689.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint56_linear_3426_14976'
                    x1='662.667'
                    y1='67.8618'
                    x2='701.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint57_linear_3426_14976'
                    x1='674.667'
                    y1='67.8618'
                    x2='713.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint58_linear_3426_14976'
                    x1='686.333'
                    y1='92.1056'
                    x2='740.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint59_linear_3426_14976'
                    x1='698.333'
                    y1='92.1056'
                    x2='752.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint60_linear_3426_14976'
                    x1='710.667'
                    y1='67.8618'
                    x2='749.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint61_linear_3426_14976'
                    x1='722.667'
                    y1='67.8618'
                    x2='761.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint62_linear_3426_14976'
                    x1='734.333'
                    y1='92.1056'
                    x2='788.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint63_linear_3426_14976'
                    x1='746.333'
                    y1='92.1056'
                    x2='800.483'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint64_linear_3426_14976'
                    x1='758.667'
                    y1='67.8618'
                    x2='797.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint65_linear_3426_14976'
                    x1='770.667'
                    y1='67.8618'
                    x2='809.131'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint66_linear_3426_14976'
                    x1='782.667'
                    y1='55.3355'
                    x2='823.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint67_linear_3426_14976'
                    x1='794.667'
                    y1='45.9408'
                    x2='814.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint68_linear_3426_14976'
                    x1='806.667'
                    y1='45.9408'
                    x2='826.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint69_linear_3426_14976'
                    x1='818.667'
                    y1='41.2434'
                    x2='805.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint70_linear_3426_14976'
                    x1='830.667'
                    y1='41.2434'
                    x2='817.876'
                    y2='-28.3909'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.114961' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint71_linear_3426_14976'
                    x1='842.667'
                    y1='45.9408'
                    x2='862.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint72_linear_3426_14976'
                    x1='854.667'
                    y1='45.9408'
                    x2='874.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint73_linear_3426_14976'
                    x1='866.667'
                    y1='55.3355'
                    x2='907.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint74_linear_3426_14976'
                    x1='878.667'
                    y1='55.3355'
                    x2='919.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint75_linear_3426_14976'
                    x1='890.667'
                    y1='55.3355'
                    x2='931.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint76_linear_3426_14976'
                    x1='902.667'
                    y1='55.3355'
                    x2='943.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint77_linear_3426_14976'
                    x1='914.667'
                    y1='55.3355'
                    x2='955.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint78_linear_3426_14976'
                    x1='926.667'
                    y1='55.3355'
                    x2='967.674'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint79_linear_3426_14976'
                    x1='938.667'
                    y1='45.9408'
                    x2='958.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint80_linear_3426_14976'
                    x1='950.667'
                    y1='45.9408'
                    x2='970.613'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint81_linear_3426_14976'
                    x1='962.667'
                    y1='55.3355'
                    x2='1003.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint82_linear_3426_14976'
                    x1='974.667'
                    y1='55.3355'
                    x2='1015.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint83_linear_3426_14976'
                    x1='986.667'
                    y1='67.8618'
                    x2='1025.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint84_linear_3426_14976'
                    x1='998.667'
                    y1='67.8618'
                    x2='1037.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint85_linear_3426_14976'
                    x1='1010.33'
                    y1='92.1056'
                    x2='1064.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint86_linear_3426_14976'
                    x1='1022.33'
                    y1='92.1056'
                    x2='1076.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint87_linear_3426_14976'
                    x1='1034.67'
                    y1='67.8618'
                    x2='1073.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint88_linear_3426_14976'
                    x1='1046.67'
                    y1='67.8618'
                    x2='1085.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint89_linear_3426_14976'
                    x1='1058.67'
                    y1='67.8618'
                    x2='1097.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint90_linear_3426_14976'
                    x1='1070.67'
                    y1='67.8618'
                    x2='1109.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint91_linear_3426_14976'
                    x1='1082.67'
                    y1='55.3355'
                    x2='1123.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint92_linear_3426_14976'
                    x1='1094.67'
                    y1='55.3355'
                    x2='1135.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint93_linear_3426_14976'
                    x1='1106.67'
                    y1='55.3355'
                    x2='1147.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint94_linear_3426_14976'
                    x1='1118.67'
                    y1='55.3355'
                    x2='1159.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint95_linear_3426_14976'
                    x1='1130.33'
                    y1='92.1056'
                    x2='1184.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint96_linear_3426_14976'
                    x1='1142.33'
                    y1='92.1056'
                    x2='1196.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint97_linear_3426_14976'
                    x1='1154.67'
                    y1='67.8618'
                    x2='1193.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint98_linear_3426_14976'
                    x1='1166.67'
                    y1='67.8618'
                    x2='1205.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint99_linear_3426_14976'
                    x1='1178.67'
                    y1='67.8618'
                    x2='1217.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint100_linear_3426_14976'
                    x1='1190.67'
                    y1='67.8618'
                    x2='1229.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint101_linear_3426_14976'
                    x1='1202.33'
                    y1='92.1056'
                    x2='1256.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint102_linear_3426_14976'
                    x1='1214.33'
                    y1='92.1056'
                    x2='1268.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint103_linear_3426_14976'
                    x1='1226.67'
                    y1='67.8618'
                    x2='1265.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint104_linear_3426_14976'
                    x1='1238.67'
                    y1='67.8618'
                    x2='1277.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint105_linear_3426_14976'
                    x1='1250.33'
                    y1='92.1056'
                    x2='1304.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint106_linear_3426_14976'
                    x1='1262.33'
                    y1='92.1056'
                    x2='1316.48'
                    y2='30.5674'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='0.903684' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint107_linear_3426_14976'
                    x1='1274.67'
                    y1='67.8618'
                    x2='1313.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint108_linear_3426_14976'
                    x1='1286.67'
                    y1='67.8618'
                    x2='1325.13'
                    y2='21.5355'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint109_linear_3426_14976'
                    x1='1298.67'
                    y1='55.3355'
                    x2='1339.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint110_linear_3426_14976'
                    x1='1310.67'
                    y1='55.3355'
                    x2='1351.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint111_linear_3426_14976'
                    x1='1322.67'
                    y1='60.0329'
                    x2='1351.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint112_linear_3426_14976'
                    x1='1334.67'
                    y1='60.0329'
                    x2='1363.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint113_linear_3426_14976'
                    x1='1346.67'
                    y1='55.3355'
                    x2='1387.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint114_linear_3426_14976'
                    x1='1358.67'
                    y1='55.3355'
                    x2='1399.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint115_linear_3426_14976'
                    x1='1370.67'
                    y1='45.9408'
                    x2='1390.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint116_linear_3426_14976'
                    x1='1382.67'
                    y1='45.9408'
                    x2='1402.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint117_linear_3426_14976'
                    x1='1394.67'
                    y1='45.9408'
                    x2='1414.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint118_linear_3426_14976'
                    x1='1406.67'
                    y1='45.9408'
                    x2='1426.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint119_linear_3426_14976'
                    x1='1418.67'
                    y1='55.3355'
                    x2='1441.12'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint120_linear_3426_14976'
                    x1='1430.67'
                    y1='55.3355'
                    x2='1453.12'
                    y2='15.1827'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint121_linear_3426_14976'
                    x1='1442.67'
                    y1='55.3355'
                    x2='1483.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint122_linear_3426_14976'
                    x1='1454.67'
                    y1='55.3355'
                    x2='1495.67'
                    y2='-10.1967'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='0.711834' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint123_linear_3426_14976'
                    x1='1466.67'
                    y1='60.0329'
                    x2='1495.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint124_linear_3426_14976'
                    x1='1478.67'
                    y1='60.0329'
                    x2='1507.32'
                    y2='16.6764'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                  <linearGradient
                    id='paint125_linear_3426_14976'
                    x1='1490.67'
                    y1='45.9408'
                    x2='1510.61'
                    y2='-4.1483'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop offset='0.101395' stopColor='#0E33FF'></stop>
                    <stop offset='1' stopColor='#7AFFB4'></stop>
                  </linearGradient>
                </defs>
              </svg>
            </ResumeRepoSvgbox>
            <ResumeRepoContainer>
              {userData.repositoryInfo?.map((item, i) => (
                <Repasitory key={item.id} repo={item} indexNum={i + 1} scrollY={scrollY} />
              ))}
            </ResumeRepoContainer>
          </ResumeRepoWrapper>
        </ResumeSection>
        {/* <div
          css={css`
            width: 100%;
            height: 50vh;
            background: ${color.merino};
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          this is Footer
        </div> */}
      </ResumeWrapper>
      <Chat />
    </>
  );
};

export default Resume;
