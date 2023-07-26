/* Libraries & Hooks */
import { ResponsiveRadar } from '@nivo/radar';
import { ResponsiveCalendar } from '@nivo/calendar';

/* Components */
import Search from '~/components/search/Search';

/* Styles */
import { css } from '@emotion/react';
import {
  ResumeContent,
  ResumeHeader,
  ResumeSection,
  ResumeWrapper,
  HeightBox,
  ResumeChart,
  ResumeTags,
  TagKeyword,
  ResumeSearchWrapper,
  ResumeSearchBox,
} from './resume.styles';
import Repasitory from '~/components/repasitory/Repasitory';
import { useGetUserGithubInfoQuery } from '~/redux/api';
import Loader from '~/components/loader/Loader';
import Message from '~/components/message/Message';
import { useLocation } from 'react-router-dom';

const radarData = [
  {
    taste: 'Code',
    hong: 41,
  },
  {
    taste: 'Testing',
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
    taste: 'any',
    hong: 92,
  },
  {
    taste: 'Code Complexity',
    hong: 92,
  },
];

const Resume: React.FC = (): JSX.Element => {
  const location = useLocation();
  const keyword = location.state.keyword;
  const { isError, isLoading, data, error } = useGetUserGithubInfoQuery({
    userName: keyword,
  });

  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <Message msg={JSON.stringify(error)} />;
  }

  return (
    <ResumeWrapper>
      <ResumeContent>
        <ResumeHeader>{data?.data?.userInfo?.name}</ResumeHeader>
        <HeightBox height='5rem' />
        <ResumeSection height='auto' direction='row' width='90%'>
          <ResumeChart>
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
              colors={{ scheme: 'nivo' }}
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
          </ResumeChart>
          <ResumeTags>
            {data?.data?.userInfo?.keywordSet.map((item, i) => (
              <TagKeyword key={i}>#{item}</TagKeyword>
            ))}
          </ResumeTags>
        </ResumeSection>
        <HeightBox height='5rem' />
        <ResumeSection height='auto' direction='column' width='100%'>
          <ResumeSearchWrapper>
            <ResumeSearchBox>
              <p
                css={css`
                  font-size: 1.5rem;
                `}
              >
                키워드 기반 커밋 검색
              </p>
              <Search outputBox={true} />
            </ResumeSearchBox>
          </ResumeSearchWrapper>
        </ResumeSection>
        <HeightBox height='5rem' />
        <ResumeSection height='auto' direction='column' width='100%'>
          <div style={{ width: '90%', height: '25rem' }}>
            <ResponsiveCalendar
              data={data.data.userInfo.commitCalender}
              from={data.data.userInfo.commitStart}
              to='2023-01-01'
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
        </ResumeSection>
        <HeightBox height='2rem' />
        <ResumeSection height='auto' direction='column' width='100%'>
          {data?.data?.repositoryInfo?.map((item, i) => (
            <Repasitory key={item.id + '_' + i} {...item} />
          ))}
        </ResumeSection>
      </ResumeContent>
    </ResumeWrapper>
  );
};

export default Resume;
