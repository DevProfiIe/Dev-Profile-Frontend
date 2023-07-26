/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { css } from '@emotion/react';
import background from '~/assets/images/background2.png';
import { useEffect, useRef, useState } from 'react';

/* Components */
import Search from '~/components/search/Search';

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

const MAIN_TEXT = 'nd discover underlying insights from github.'.split('');

const Home: React.FC = (): JSX.Element => {
  const [distance, setDistance] = useState<number | undefined>(10);
  const textArea = useRef<HTMLDivElement>(null);
  const textArr = MAIN_TEXT;
  let animeInterval: number;
  let textIndex = 0;

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

  return (
    <HomeWrapper>
      <BackgroundImage zIndex={2} img={background} />
      <BackgroundImage zIndex={1} img={line} />
      <HomeSection>
        <div
          css={css`
            position: relative;
          `}
        >
          <HomeSearchBox>
            <h1
              css={css`
                font-weight: 500;
                font-size: 3rem;
                line-height: 100%;
              `}
            >
              DEV-PROFILE 🧙🏻‍♂️
            </h1>
            <HeightBox height={'2.25rem'} />
            <HomeParagragh>
              <p>
                Just type in a box and our AI will instantly <br />
                summarize key information, recall exact details,
              </p>
              <div
                css={css`
                  position: relative;
                `}
              >
                <HomeText>and discover underlying insights from github.</HomeText>
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
                  <div ref={textArea}>a</div>
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
            <Search outputBox={false} redirectTo='/resume' />
            <HeightBox height='5rem' />
            <HomeContentsBox />
          </HomeSearchBox>
        </div>
      </HomeSection>
    </HomeWrapper>
  );
};

export default Home;
