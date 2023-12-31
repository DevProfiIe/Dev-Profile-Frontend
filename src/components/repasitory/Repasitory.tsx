import { HeightBox, RepositoryBox, RepositorySkills, RepositoryWrapper } from './repasitory.styles';
import { UserGithubRepositoryInfo } from '~/redux/api/types';
import { css } from '@emotion/react';

interface RepositoryProps {
  repo: UserGithubRepositoryInfo;
  indexNum: number;
  scrollY: number;
}

const Repasitory: React.FC<RepositoryProps> = ({
  repo,
  indexNum,
  scrollY,
}: RepositoryProps): JSX.Element => {
  const { endDate, frameworkUrls, myCommitCnt, repoDesc, repoName, startDate, totalCommitCnt } =
    repo;

  return (
    <RepositoryBox
      index={indexNum}
      nowRepo={
        scrollY > 1657 ? (Math.ceil((scrollY - 1657) / 1000) === indexNum ? true : false) : false
      }
    >
      <RepositoryWrapper
        nowRepo={
          scrollY > 1657 ? (Math.ceil((scrollY - 1657) / 1000) === indexNum ? true : false) : false
        }
      >
        <RepositorySkills>
          {frameworkUrls.map((item, i) => (
            <p key={i}>
              <img src={item.url} alt='기술스택' />
            </p>
          ))}
        </RepositorySkills>
        <HeightBox height='0.5rem' />
        <h2
          css={css`
            font-size: 2.5rem;
          `}
        >
          {repoName}
        </h2>
        <HeightBox height='0.5rem' />
        <p
          css={css`
            color: #aaa;
          `}
        >
          {startDate} ~ {endDate}
        </p>
        <HeightBox height='1.5rem' />
        <p
          css={css`
            line-height: 160%;
            font-size: 1.5rem;
            height: 5.5rem;
          `}
        >
          {repoDesc}
        </p>
        <HeightBox height='5.5rem' />
        <div>
          User Commit : {myCommitCnt} , Total Commit : {totalCommitCnt}
        </div>
      </RepositoryWrapper>
    </RepositoryBox>
  );
};

export default Repasitory;
