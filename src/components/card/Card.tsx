import {
  CardBtn,
  CardBtnWrapper,
  CardContent,
  CardDetails,
  CardHeader,
  CardItem,
  CardItemImg,
  CardItemText,
  CardTag,
} from './card.styles';
import { GetBoardDataDetails } from '~/redux/api/types';
import { css } from '@emotion/react';

const iconList = [
  {
    name: 'Django',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566919539/noticon/j2h9ud10ssbihscfqlwy.png',
  },
  {
    name: 'Flask',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566919737/noticon/gjxns0py6vnakzyu3msu.png',
  },
  {
    name: 'PyTorch',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1584079636/noticon/obsvjytzcnx5f1zmo9fz.png',
  },
  {
    name: 'Ruby on Rails',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566919626/noticon/umx3na3tbarre4a1gc4a.png',
  },
  {
    name: 'Spring',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566778017/noticon/ytjm1rralodyhvuggrpu.png',
  },
  {
    name: 'Netty',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1616037279/noticon/s0zrhrin17eqzvtu2mqc.png',
  },
  {
    name: 'Laravel',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1596763737/noticon/sk2xelgefvoanor3vjjn.png',
  },
  {
    name: 'ReactJS',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566557331/noticon/d5hqar2idkoefh6fjtpu.png',
  },
  {
    name: 'AngularJS',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566557294/noticon/uadhcwuyrgxksewdvuyf.png',
  },
  {
    name: 'MeteorJS',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566914301/noticon/vujwna6r9uzn832lascn.png',
  },
  {
    name: 'React Native',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1613069004/noticon/ugcstxkq5uzhbhknrr80.png',
  },
  {
    name: 'Gatsby',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566911795/noticon/hkfrehfe10qizdtgiioj.svg',
  },
  {
    name: 'NestJS',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1591496102/noticon/d4ptvqbrdi7tcbwmrajx.png',
  },
  {
    name: 'TensorFlow',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566915748/noticon/zbduq3macc9nkulysuq6.png',
  },
  {
    name: 'SwiftUI',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1592446596/noticon/jrceaey2xuantdbgwkci.png',
  },
  {
    name: 'Express',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1597622806/noticon/avedhz3pvaij65k3ztar.png',
  },
  {
    name: 'NET Core',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1673285507/noticon/plbq0h5fydvtlkgopykl.png',
  },
  {
    name: 'Flutter',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566919318/noticon/pjnpsszivn2jjfgspqj7.png',
  },
  {
    name: 'Ionic',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1584716629/noticon/aynoxveg4ayfonkbiyqw.png',
  },
  {
    name: 'jQuery Mobile',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567128552/noticon/mksvojnxnqtvdwrhttce.png',
  },
  {
    name: 'VueJS',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1568683636/noticon/hkuhbyocl2mx2keas7ng.png',
  },
  {
    name: 'NuxtJS',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1589358623/noticon/hfcemrutbjex7zuqt6q1.png',
  },
  {
    name: 'Blazor',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1576658291/noticon/tqbhjvflyhw5p6jajalw.png',
  },
  {
    name: 'Java',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913897/noticon/xbvewg1m3azbpnrzck1k.png',
  },
  {
    name: 'C',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1592962806/noticon/yllouhpfzytowgn4rksx.png',
  },
  {
    name: 'Ruby',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913727/noticon/urnfymudgsvon3frdzmn.png',
  },
  {
    name: 'C++',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1569171479/noticon/jmeuekc1zlge9wmoiw8h.png',
  },
  {
    name: 'Python',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566791609/noticon/nen1y11gazeqhejw7nm1.png',
  },
  {
    name: 'Go',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913552/noticon/xjarxsfmmcouhih40val.png',
  },
  {
    name: 'C#',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566916079/noticon/yqec1z6qsjdf0fsvlh6s.png',
  },
  {
    name: 'JavaScript',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1570946287/noticon/qgdiv5ctkcneujidjuv1.png',
  },
  {
    name: 'TypeScript',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913457/noticon/eh4d0dnic4n1neth3fui.png',
  },
  {
    name: 'PHP',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566916128/noticon/ojpu8u7xaqrt6nexzzix.png',
  },
  {
    name: 'Kotlin',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567399456/noticon/ynev3ykd0musp4yh5xs7.png',
  },
  {
    name: 'Rust',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1567009186/noticon/isuqkfju7mgcsfjxi8gf.png',
  },
  {
    name: 'R',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1690256565/noticon/eqn1xw90fsmr1ijdaj1e.png',
  },
  {
    name: 'Swift',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1582581609/noticon/cczbpahp5od6voerbvwr.svg',
  },
  {
    name: 'Perl',
    url: 'https://1.bp.blogspot.com/-BjD6sSdZAhw/XzEkfdDqCPI/AAAAAAAAB2U/VEH9guwp8Ws5jdatT-LbbixpIQfIbGPLQCLcBGAsYHQ/s0/perl_script.png',
  },
  {
    name: 'HTML',
    url: 'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566995514/noticon/jufppyr8htislboas4ve.png',
  },
];

interface CardPropsType {
  data: GetBoardDataDetails;
  isSelected?: boolean;
  onClick: any;
}

const Card: React.FC<CardPropsType> = ({ data, isSelected, onClick }: CardPropsType) => {
  const { language, avataUrl, userName, field, styles, commitCount, commitDays, repoCount } = data;

  /**
   * 아이템 별 필드 수정
   * @param field
   * @returns
   */
  const parseField = (field: string): string => {
    if (field === 'webFrontend') {
      return '프론트엔드 개발자';
    } else if (field === 'webBackend' || field === 'systemProgramming') {
      return '백엔드 개발자';
    } else if (field === 'ai') {
      return 'AI 개발자';
    } else if (field === 'database') {
      return '데이터베이스 전문가';
    } else {
      return '게임 개발자';
    }
  };

  return (
    <CardItem onClick={onClick} selected={isSelected}>
      <CardHeader>
        {language.map((lang) => (
          <img
            key={lang}
            css={css`
              height: 35px;
            `}
            src={iconList.find((icon) => icon.name === lang)?.url}
            alt={lang}
          />
        ))}
      </CardHeader>
      <CardContent>
        <CardItemImg imgUrl={avataUrl}></CardItemImg>
        <h2
          css={css`
            width: 100%;
            font-size: 1.75rem;
            font-weight: 700;
            padding: 0.5rem 0;
            text-align: right;
            line-height: 1.3;
          `}
        >
          {userName}
        </h2>
        <p
          css={css`
            width: 100%;
            font-size: 1rem;
            text-align: right;
            margin-bottom: 2rem;
          `}
        >
          {parseField(field)}
        </p>
        <CardItemText>
          {styles?.map((style) => (
            <CardTag key={style}>#{style}</CardTag>
          ))}
        </CardItemText>
        <CardDetails>
          <div>
            <p
              css={css`
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
              `}
            >
              레포지토리
            </p>
            <p
              css={css`
                font-size: 1.125rem;
                font-weight: 700;
              `}
            >
              {repoCount}
            </p>
          </div>
          <div>
            <p
              css={css`
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
              `}
            >
              커밋
            </p>
            <p
              css={css`
                font-size: 1.125rem;
                font-weight: 700;
              `}
            >
              {commitCount}
            </p>
          </div>
          <div>
            <p
              css={css`
                margin-bottom: 0.5rem;
                font-size: 0.875rem;
              `}
            >
              기간
            </p>
            <p
              css={css`
                font-size: 1.125rem;
                font-weight: 700;
              `}
            >
              {commitDays} 일
            </p>
          </div>
        </CardDetails>
        <CardBtnWrapper>
          <CardBtn
            css={css`
              border-radius: 4px;
            `}
            bgColor='#6366f1'
            // onClick={() => {
            //   navigateResumeHandler(item);
            // }}
          >
            분석보기
          </CardBtn>
        </CardBtnWrapper>
      </CardContent>
    </CardItem>
  );
};

export default Card;
