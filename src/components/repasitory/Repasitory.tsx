import { BarDatum, ResponsiveBar } from '@nivo/bar';
import {
  ChartWrapper,
  RepasitoryBox,
  RepasitoryContent,
  RepasitoryDetails,
  RepasitoryWrapper,
  SkillsBox,
} from './repasitory.styles';
import { UserGithubRepositoryInfo } from '~/redux/api/types';
import { useEffect } from 'react';

const Repasitory: React.FC<UserGithubRepositoryInfo> = (
  props: UserGithubRepositoryInfo,
): JSX.Element => {
  const { id, repoName, repoLanguages, startDate, endDate, featured, totalCommitCnt, myCommitCnt } =
    props;

  const barData: BarDatum[] = [];

  /**
   *
   */
  const calculateRepositoryContribution = () => {
    const newBarData = {
      'total commits': (totalCommitCnt / totalCommitCnt) * 100,
      'user commits': Math.round((myCommitCnt / totalCommitCnt) * 100),
      contribution: 'User',
    };

    barData.push(newBarData);
  };

  useEffect(() => {
    calculateRepositoryContribution();
  }, []);

  return (
    <RepasitoryBox>
      <h2
        style={{
          fontSize: '2rem',
        }}
      >
        {repoName}
      </h2>
      <RepasitoryWrapper>
        <RepasitoryContent>
          <RepasitoryDetails>
            <p style={{ fontSize: '1.3rem' }}>1️⃣ 기술 스택</p>
            <SkillsBox>
              {repoLanguages?.map((item, i) => (
                <p key={`${id}_${i}`}>{item}</p>
              ))}
            </SkillsBox>
          </RepasitoryDetails>
          <RepasitoryDetails>
            <p style={{ fontSize: '1.3rem' }}>2️⃣ 기간</p>
            <p>
              {startDate} ~ {endDate}
            </p>
          </RepasitoryDetails>
          <RepasitoryDetails>
            <p style={{ fontSize: '1.3rem' }}>3️⃣ 기여도</p>
            <ChartWrapper width='100%' height='10rem'>
              <ResponsiveBar
                data={barData}
                keys={['user commits', 'total commits']}
                indexBy='contribution'
                margin={{ top: 10, right: 130, bottom: 50, left: 50 }}
                padding={0.6}
                layout='horizontal'
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                groupMode='grouped'
                borderColor={{
                  from: 'color',
                  modifiers: [['darker', 1.6]],
                }}
                labelSkipWidth={5}
                labelSkipHeight={5}
                labelTextColor={{
                  from: 'color',
                  modifiers: [['darker', 1.6]],
                }}
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </ChartWrapper>
          </RepasitoryDetails>
        </RepasitoryContent>
        <RepasitoryContent>
          <p style={{ fontSize: '1.3rem' }}>4️⃣ 구현 한 기능</p>
          <div
            style={{
              display: 'flex',
              flexFlow: 'column nowrap',
              gap: '1.3rem 0',
              fontSize: '1.1rem',
              lineHeight: '1.5rem',
            }}
          >
            {featured?.map((item, i) => (
              <p key={`${id}_${i}`}>🔎 {item}</p>
            ))}
          </div>
        </RepasitoryContent>
      </RepasitoryWrapper>
    </RepasitoryBox>
  );
};

export default Repasitory;
