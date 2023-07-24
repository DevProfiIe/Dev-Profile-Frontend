/** @jsxImportSource @emotion/react */

/* Libraries & Hooks */
import { css } from '@emotion/react';
import background from '~/assets/images/background2.png';

/* Components */

/* ETC */
import line from '~/assets/images/line.png';
import Search from '~/components/search/Search';
import { BackgroundImage, HeightBox, HomeBox, HomeWrapper } from './home.styles';

const Home: React.FC = (): JSX.Element => {
  return (
    <HomeWrapper>
      <BackgroundImage zIndex={2} img={background} />
      <BackgroundImage zIndex={1} img={line} />
      <HomeBox>
        <h1
          css={css`
            font-weight: 500;
            font-size: 3rem;
            line-height: 100%;
            letter-spacing: -0.04em;
          `}
        >
          DEV-PROFILE 🧙🏻‍♂️
        </h1>
        <HeightBox height={'2.25rem'} />
        <div
          css={css`
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
          `}
        >
          <p
            css={css`
              font-weight: 500;
              font-size: 1.25rem;
              line-height: 134%;
              letter-spacing: -0.01em;
            `}
          >
            Just type in a box and our AI will instantly <br />
            summarize key information, recall exact details,
          </p>
          <p
            css={css`
              opacity: 0.16;
              white-space: nowrap;
              font-family: 'Euclid Circular A', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
              color: #01051b8f;
              font-weight: 500;
              font-size: 1.25rem;
              line-height: 134%;
              letter-spacing: -0.01em;
            `}
          >
            and discover underlying insights from github.
          </p>
        </div>
        <HeightBox height={'2.875rem'} />
        <Search outputBox={false} redirectTo='resume' />
      </HomeBox>
    </HomeWrapper>
  );
};

export default Home;
