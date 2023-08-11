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
import { iconList } from '~/utils/icon';
import { useNavigate } from 'react-router-dom';

interface CardPropsType {
  data: GetBoardDataDetails;
  isSelected?: boolean;
  onClick: any;
}

const Card: React.FC<CardPropsType> = ({ data, isSelected, onClick }: CardPropsType) => {
  const { language, avataUrl, userName, field, styles, commitCount, commitDays, repoCount } = data;
  const navigate = useNavigate();

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
            font-size: 1.5rem;
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
        <CardBtnWrapper
          onClick={() => {
            navigate('/resume/dbscks97');
          }}
        >
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
