/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { css } from '@emotion/react';
import background from '~/assets/images/background2.png';
import { useEffect, useRef, useState } from 'react';

/* Components */

/* ETC */
import line from '~/assets/images/line.png';
import {
  BackgroundImage,
  HeightBox,
  HomeContentsBox,
  HomeParagragh,
  HomeSearchBox,
  HomeSection,
  HomeText,
  HomeWrapper,
} from './home.styles';
import { color } from '~/styles/theme/primary';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/redux/store';
import { UserGithubInfo } from '~/redux/api/types';
import logo from '~/assets/images/github.png';
import { change } from '~/redux/features/searchSlice';
import { showMessages } from '~/redux/features/popupSlice';

const MAIN_TEXT = 'EV-PROFILE is a service for culling suitable new developers.'.split('');

const Home: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [distance, setDistance] = useState<number | undefined>(10);
  const textArea = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const textArr = MAIN_TEXT;
  const [userInfo, setUserInfo] = useState<UserGithubInfo | null>(null);
  let animeIntervalResume: any;
  let textIndex = 0;

  /**
   * 분석하기 버튼 클릭 핸들러 함수
   */
  const analyzeHandler = () => {
    if (userInfo && userInfo.analyzed) {
      dispatch(change(userInfo.login));
      navigate(`resume/${userInfo.login}`);
    } else {
      dispatch(
        showMessages({
          msg: `분석 데이터가 존재하지 않습니다. \n 분석을 요청하시겠습니까?`,
          content: 'Not Found Analyzed Github Data',
          type: 'confirm',
        }),
      );
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo') ?? null;

    if (userInfo) {
      const userData = JSON.parse(userInfo) as UserGithubInfo;
      setUserInfo(userData);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (textArea && textArea.current) {
        animeIntervalResume = setInterval(() => {
          if (textIndex < textArr.length) {
            if (textArea && textArea.current) {
              textArea.current.textContent += textArr[textIndex];
            }
            textIndex++;
            setDistance(textArea.current?.offsetWidth);
          } else {
            clearInterval(animeIntervalResume);
          }
        }, 100);
      }
    }, 1000);

    return () => {
      clearInterval(animeIntervalResume);
    };
  }, []);

  return (
    <>
      <HomeWrapper>
        <BackgroundImage zIndex={2} img={background} />
        <BackgroundImage zIndex={1} img={line} />
        <HeightBox height='8rem' />
        <HomeSection>
          <div
            css={css`
              position: relative;
            `}
          >
            <HomeSearchBox>
              <h1
                css={css`
                  display: flex;
                  align-items: center;
                  font-weight: 600;
                  font-size: 3rem;
                  line-height: 100%;
                `}
              >
                <p>DEV-PROFILE</p>
                <p
                  css={css`
                    width: 30px;
                    height: 30px;
                    background-image: url(${logo});
                    background-position: left top;
                    background-size: contain;
                    background-repeat: no-repeat;
                    margin: 0 0 0.5rem 0.5rem;
                  `}
                ></p>
              </h1>
              <HeightBox height={'2.25rem'} />
              <HomeParagragh>
                <p>
                  It uses CHAT GPT to quickly analyze applicants' Github. <br />
                  After that, you can find the developer you want.
                </p>
                <div
                  css={css`
                    position: relative;
                  `}
                >
                  <HomeText>DEV-PROFILE is a service for culling suitable new developers.</HomeText>
                  <div
                    css={css`
                      position: absolute;
                      top: 0;
                      left: 0;
                      pointer-events: none;
                      font-weight: 700;
                      font-size: 1.25rem;
                      line-height: 134%;
                      letter-spacing: 0.05rem;
                    `}
                  >
                    <div ref={textArea}>D</div>
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
              </HomeParagragh>
              <HeightBox height={'2.875rem'} />
              {/* <Search outputBox={false} redirectTo='/resume' /> */}
              <HeightBox height={'2rem'} />
              <HomeContentsBox>
                <div
                  css={css`
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    font-size: 28px;
                    line-height: 116%;
                    font-weight: 500;
                    letter-spacing: -0.04em;
                    // -webkit-text-fill-color: transparent;
                    background: linear-gradient(
                      279.27deg,
                      rgb(14, 51, 255) -30.9%,
                      rgb(122, 255, 180) 97.94%
                    );
                    background-clip: text;
                    color: transparent;
                  `}
                >
                  Here are the GitHub analysis resumes of new developers with various project
                  experiences.
                </div>
                <div
                  css={css`
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    gap: 0 0.5rem;
                  `}
                >
                  <button
                    css={css`
                      padding: 16px 32px;
                      line-height: 1.6;
                      color: #01051b;
                      background-color: ${color.aquaMarine};
                      border: none;
                      border-radius: 32px;
                      text-decoration: none;
                      overflow: auto;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      user-select: none;
                      cursor: pointer;
                      transition: all 0.25s ease 0s;
                      text-align: center;
                      display: block;
                    `}
                    onClick={analyzeHandler}
                  >
                    <p>Let's Go Analyze</p>
                  </button>

                  <button
                    css={css`
                      padding: 16px 32px;
                      line-height: 1.6;
                      color: #01051b;
                      background-color: ${color.aquaMarine};
                      border: none;
                      border-radius: 32px;
                      text-decoration: none;
                      overflow: auto;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      user-select: none;
                      cursor: pointer;
                      transition: all 0.25s ease 0s;
                      text-align: center;
                      display: block;
                    `}
                    onClick={() => {
                      navigate('/gallary');
                    }}
                  >
                    <p>Go To Gallary</p>
                  </button>
                </div>
              </HomeContentsBox>
            </HomeSearchBox>
          </div>
        </HomeSection>
      </HomeWrapper>
    </>
  );
};

export default Home;
