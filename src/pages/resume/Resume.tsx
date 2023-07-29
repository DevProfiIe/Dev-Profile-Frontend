/* Libraries & Hooks */
import { ResponsiveRadar } from '@nivo/radar';
import { ResponsiveLine } from '@nivo/line';
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
import Message from '~/components/message/Message';
import { useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import useScroll from '~/hooks/useScroll';

const radarData = [
  {
    taste: 'Code Style',
    hong: 41,
  },
  {
    taste: 'Algorithm',
    hong: 95,
  },
  {
    taste: 'Commit Messages',
    hong: 80,
  },
  {
    taste: 'Error Handling',
    hong: 33,
  },
  {
    taste: 'Sincerity',
    hong: 92,
  },
];

const MAIN_TEXT = '이터의 속삭임: 코드로 이야기하는 개발자 Park Yun Chan 입니다.'.split('');

const Resume: React.FC = (): JSX.Element => {
  const [distance, setDistance] = useState<number | undefined>(10);
  const location = useLocation();
  const { scrollY } = useScroll();
  const textArea = useRef<HTMLDivElement>(null);
  const fixedElem = useRef<HTMLDivElement>(null);
  const textArr = MAIN_TEXT;
  let animeInterval: number;
  let textIndex = 0;

  const [len, setLen] = useState(0);
  const keyword = location.state.keyword;
  const { isError, isLoading, data, error } = useGetUserGithubInfoQuery({
    userName: keyword,
  });

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
    }, 1000);
    return () => {
      clearInterval(animeInterval);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <Message msg={JSON.stringify(error)} />;
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
            {data?.data?.userInfo?.name}
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
                데이터의 속삭임: 코드로 이야기하는 개발자 {data?.data?.userInfo?.name} 입니다.
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
            <ResumeTag color='#ffffff'>👨🏻‍🔧 AI : 30 Commits</ResumeTag>
            <ResumeTag color='#ffffff'>💀 Data-Science : 566 Commits</ResumeTag>
            <ResumeTag color='#ffffff'>🤳🏻 Mobile : 391 Commits</ResumeTag>
            <ResumeTag color='#ffffff'>🧑🏻‍💻 Web-Backend : 499 Commits</ResumeTag>
            <ResumeTag color='#ffffff'>💾 System-Programming : 123 Commits</ResumeTag>
            <ResumeTag color='#ffffff'>⚙️ Algorithm : 798 Commits</ResumeTag>
            <ResumeTag color='#ffffff'>🕹️ Game : 120 Commits</ResumeTag>
          </ResumeTagBox>
        </ResumeSection>
        <ResumeSection background={true} height='100vh'>
          <HeightBox height='5rem' />
          <ResumeChartBox>
            <ResumeLeftContents>
              <div
                css={css`
                  width: 100%;
                  height: 34.375rem;
                `}
              >
                <ResponsiveRadar
                  data={radarData}
                  keys={['hong']}
                  indexBy='taste'
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
              <HeightBox height='2rem' />
              <ResumeLeftTextBox>
                <ResumeLeftTextDetail>
                  <p>📌 Code Style</p>
                  <p>코드 스타일에 관한 지표</p>
                </ResumeLeftTextDetail>
                <ResumeLeftTextDetail>
                  <p>📌 Algorithm</p>
                  <p>알고리즘 구현 능력 지표.</p>
                </ResumeLeftTextDetail>
                <ResumeLeftTextDetail>
                  <p>📌 Commit Messages</p>
                  <p>커밋 기록에 관한 지표.</p>
                </ResumeLeftTextDetail>
                <ResumeLeftTextDetail>
                  <p>📌 Error Handling</p>
                  <p>에러 처리에 관한 지표.</p>
                </ResumeLeftTextDetail>
                <ResumeLeftTextDetail>
                  <p>📌 Sincerity</p>
                  <p>꾸준함에 관한 지표.</p>
                </ResumeLeftTextDetail>
              </ResumeLeftTextBox>
            </ResumeLeftContents>
            <ResumeRightContents>
              <ResumeHashTagWrapper>
                <div
                  css={css`
                    display: flex;
                    flex-flow: row wrap;
                    gap: 0.5rem 1rem;
                    width: 100%;
                    align-self: flex-start;
                  `}
                >
                  {data?.data.userInfo.keywordSet?.map((item, i) => (
                    <ResumeTag color='#F7F1E9' border='none' key={i}>
                      #{item}
                    </ResumeTag>
                  ))}
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
                  `}
                >
                  <ResponsiveLine
                    animate
                    axisBottom={{
                      format: '%b %d',
                      legend: 'time',
                      legendOffset: -12,
                      tickValues: 'every 2 days',
                    }}
                    curve='monotoneX'
                    data={[
                      {
                        data: [
                          {
                            x: '2018-01-01',
                            y: 7,
                          },
                          {
                            x: '2018-01-02',
                            y: 5,
                          },
                          {
                            x: '2018-01-03',
                            y: 11,
                          },
                          {
                            x: '2018-01-04',
                            y: 9,
                          },
                          {
                            x: '2018-01-05',
                            y: 12,
                          },
                          {
                            x: '2018-01-06',
                            y: 16,
                          },
                          {
                            x: '2018-01-07',
                            y: 13,
                          },
                          {
                            x: '2018-01-08',
                            y: 13,
                          },
                        ],
                        id: 'fake corp. A',
                      },
                    ]}
                    enablePointLabel
                    margin={{
                      bottom: 40,
                      left: 40,
                      right: 30,
                      top: 20,
                    }}
                    pointBorderColor={{
                      from: 'color',
                      modifiers: [['darker', 0.3]],
                    }}
                    pointBorderWidth={1}
                    pointSize={16}
                    useMesh
                    xFormat='time:%Y-%m-%d'
                    xScale={{
                      format: '%Y-%m-%d',
                      precision: 'day',
                      type: 'time',
                      useUTC: false,
                    }}
                    yScale={{
                      type: 'linear',
                    }}
                  ></ResponsiveLine>
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
        <ResumeSection height={data?.data.repositoryInfo.length * 700 + 'px'} ref={fixedElem}>
          <ResumeRepoWrapper>
            <ResumeRepoText>
              <span
                css={css`
                  display: inline-block;
                  margin-right: 2rem;
                `}
              >
                Commits
              </span>
              <span>{scrollY > 1657 ? Math.round((scrollY - 1657) * 0.1) : 0}</span>
            </ResumeRepoText>
            <HeightBox height='0.875rem' />
            <ResumeRepoSvgbox></ResumeRepoSvgbox>
            <HeightBox height='2rem' />
            <ResumeRepoContainer
              position={scrollY > 1657 ? Math.round(scrollY - 1657) : 0}
              length={data?.data.repositoryInfo.length}
            >
              <div
                css={css`
                  width: 200px;
                `}
              ></div>
              {data?.data.repositoryInfo?.map((item, i) => (
                <Repasitory key={item.id + i} {...item} />
              ))}
            </ResumeRepoContainer>
          </ResumeRepoWrapper>
        </ResumeSection>
        <div
          css={css`
            width: 100%;
            height: 100vh;
            background: blue;
            position: relative;
          `}
        ></div>
      </ResumeWrapper>
    </>
  );
};

export default Resume;
