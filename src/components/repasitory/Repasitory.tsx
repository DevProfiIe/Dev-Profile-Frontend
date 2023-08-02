// import { BarDatum } from '@nivo/bar';
import useScroll from '~/hooks/useScroll';
import {
  ChartWrapper,
  RepasitoryBox,
  RepasitoryContents,
  RepasitoryDetails,
  RepasitoryWrapper,
  SkillsBox,
} from './repasitory.styles';
import { UserGithubRepositoryInfo } from '~/redux/api/types';

interface RepositoryProps {
  repo: UserGithubRepositoryInfo;
  indexNum: number;
}

const Repasitory: React.FC<RepositoryProps> = ({
  repo,
  indexNum,
}: RepositoryProps): JSX.Element => {
  const {
    id,
    repoName,
    startDate,
    endDate,
    totalCommitCnt,
    myCommitCnt,
    totalContributors,
    repoLanguages,
    featured,
    langFramework,
  } = repo;
  const { scrollY } = useScroll();

  // const barData: BarDatum[] = [
  //   {
  //     'total commits': (totalCommitCnt / totalCommitCnt) * 100,
  //     'user commits': Math.round((myCommitCnt / totalCommitCnt) * 100),
  //     contribution: 'User',
  //   },
  // ];

  return (
    <RepasitoryBox
      index={indexNum}
      nowRepo={
        scrollY > 1657 ? (Math.ceil((scrollY - 1657) / 1000) === indexNum ? true : false) : false
      }
    ></RepasitoryBox>
  );
};

export default Repasitory;
