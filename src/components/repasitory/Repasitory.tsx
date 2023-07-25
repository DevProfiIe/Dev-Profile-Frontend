import { ResponsiveBar } from '@nivo/bar';
import {
  ChartWrapper,
  RepasitoryBox,
  RepasitoryContent,
  RepasitoryDetails,
  RepasitoryWrapper,
  SkillsBox,
} from './repasitory.styles';
import { UserGithubRepositoryInfo } from '~/redux/api/types';

const barData = [
  {
    country: 'hong',
    'hot dog': 145,
    'hot dogColor': 'hsl(211, 70%, 50%)',
  },
];

const Repasitory: React.FC<UserGithubRepositoryInfo> = (
  props: UserGithubRepositoryInfo,
): JSX.Element => {
  const { id, repoName, repoLanguages, startDate, endDate, featured } = props;

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
            <ChartWrapper width='100%' height='5rem'>
              <ResponsiveBar
                data={barData}
                keys={['hot dog']}
                indexBy='country'
                margin={{ top: 0, right: 130, bottom: 50, left: 60 }}
                padding={0.6}
                layout='horizontal'
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                  },
                ]}
                fill={[
                  {
                    match: {
                      id: 'fries',
                    },
                    id: 'dots',
                  },
                  {
                    match: {
                      id: 'sandwich',
                    },
                    id: 'lines',
                  },
                ]}
                borderColor={{
                  from: 'color',
                  modifiers: [['darker', 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'country',
                  legendPosition: 'middle',
                  legendOffset: 32,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: '기여도',
                  legendPosition: 'middle',
                  legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
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
                role='application'
                ariaLabel='Nivo bar chart demo'
                barAriaLabel={(e) =>
                  e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
                }
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
