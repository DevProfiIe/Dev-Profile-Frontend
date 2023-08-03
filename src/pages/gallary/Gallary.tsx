import { useState } from 'react';
import {
  GallaryBtn,
  GallaryContactBox,
  GallaryContentsWrapper,
  GallaryDropBox,
  GallaryFilterBox,
  GallaryFilterWrapper,
  GallaryImage,
  GallaryItem,
  GallaryItemInBox,
  GallaryTextBox,
  GallaryTextLeft,
  GallaryWrapper,
  HeightBox,
  StackTag,
} from './gallary.styles';
import { css } from '@emotion/react';
// import { useGetBodrdQuery } from '~/redux/api';
import { IosArrowRight } from 'emotion-icons/fluentui-system-filled';
import { Link } from 'react-router-dom';

interface Item {
  id: string;
  contents: string;
  name: string;
  stack: string[];
}

interface StackItem {
  id: number;
  name: string;
  sorted: string;
}

const Gallary = () => {
  const [item, _setItem] = useState<Item[]>([
    {
      id: '1',
      contents: '데이터의 속삭임: 코드로 이야기하는 개발자 Park Yun Chan.',
      name: 'dbscks97',
      stack: ['Spring', 'C#', 'JavaScript'],
    },
    {
      id: '2',
      contents: '알고리즘 마법사: 코딩의 미래를 이끄는 개발자 YoonpyoHong.',
      name: 'YoonpyoHong',
      stack: ['React', 'TypeScript', 'Angular'],
    },
    {
      id: '3',
      contents: '오류의 명인: 불완전함을 완성시키는 개발자 cocounni',
      name: 'cocounni',
      stack: ['C', 'Java', 'React'],
    },
  ]);
  const [newItem, setNewItem] = useState<Item[]>([]);
  const [isShowContactbox, setIsShowContactBox] = useState<boolean>(false);
  const [isShowStackBox, setIsShowStackBox] = useState<boolean>(false);
  const [selectedStack, setSelectedStack] = useState<StackItem[]>([]);
  const stacks = [
    {
      id: 1,
      name: 'JavaScript',
      sorted: 'frontend',
    },
    {
      id: 2,
      name: 'JAVA',
      sorted: 'backend',
    },
    {
      id: 3,
      name: 'Pytyon',
      sorted: 'backend',
    },
    {
      id: 4,
      name: 'React',
      sorted: 'frontend',
    },
    {
      id: 5,
      name: 'Angular',
      sorted: 'frontend',
    },
    {
      id: 6,
      name: 'Vue',
      sorted: 'frontend',
    },
    {
      id: 7,
      name: 'TypeScript',
      sorted: 'frontend',
    },
  ];

  // const { data, isSuccess } = useGetBodrdQuery({
  //   lang: [],
  //   frame: [],
  //   langDuration: -1,
  //   frameDuration: -1,
  //   keywordFilter: [],
  //   field: '',
  //   fieldScore: -1,
  // });

  // const resumeList = data?.data ?? [];

  const stackClickHandler = (selectedTag: StackItem) => {
    const isExist = findTag(selectedTag);

    if (isExist) {
      const newTags = selectedStack.filter((item) => item.id !== selectedTag.id);

      setSelectedStack([...newTags]);
      return;
    }

    setSelectedStack([...selectedStack, { ...selectedTag }]);
  };

  const findTag = (insertTag: StackItem): boolean => {
    const tag = selectedStack?.find((item) => item.id === insertTag.id);

    return tag ? true : false;
  };

  const showStackHandler = () => {
    setIsShowStackBox((state) => !state);
  };

  const dranOnHandler = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setIsShowContactBox(true);
    e.dataTransfer.setData('text/plain', id);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dragDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const id: string = e.dataTransfer.getData('text/plain').toString();

    setNewItem([
      ...newItem,
      {
        id: id,
        contents: `Item ${id}`,
        name: 'new',
        stack: ['React'],
      },
    ]);
  };

  return (
    <GallaryWrapper>
      <HeightBox height='1.5rem' />
      <GallaryFilterWrapper>
        <div
          css={css`
            display: flex;
            align-items: center;
            font-size: 1.5rem;
          `}
        >
          <div
            css={css`
              border-right: 3px solid #eee;
              padding-right: 2rem;
            `}
          >
            분류
          </div>
          <div
            css={css`
              padding-left: 2rem;
            `}
          >
            <select>
              <option>전체</option>
              <option>프론트엔드</option>
              <option>백엔드</option>
              <option>안드로이드</option>
              <option>IOS</option>
            </select>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            gap: 0 1rem;
          `}
        >
          <GallaryFilterBox>기간</GallaryFilterBox>
          {/* <div>after items</div> */}
          <GallaryFilterBox onClick={showStackHandler}>
            <div
              css={css`
                display: flex;
                gap: 0 0.2rem;
              `}
            >
              <p>스택 :</p>
              <p
                css={css`
                  display: flex;
                  gap: 0 0.5rem;
                  color: #189bfa;
                `}
              >
                {selectedStack?.map((item, i) => (
                  <span key={i}>{item.name}</span>
                ))}
              </p>
            </div>
            {isShowStackBox && (
              <div
                css={css`
                  display: flex;
                  flex-flow: row wrap;
                  align-content: flex-start;
                  gap: 1rem 0.5rem;
                  padding: 1rem 0.5rem;
                  position: absolute;
                  width: 30rem;
                  min-height: 10rem;
                  background-color: white;
                  border-radius: 24px;
                  border: 1px solid rgba(1, 5, 27, 0.07);
                  left: 0;
                  top: 120%;
                `}
              >
                {stacks.map((item) => (
                  <StackTag
                    border={findTag(item)}
                    key={item.id}
                    onClick={() => {
                      stackClickHandler(item);
                    }}
                  >
                    {item.name}
                  </StackTag>
                ))}
              </div>
            )}
          </GallaryFilterBox>
          {/* <div>after items</div> */}
        </div>
      </GallaryFilterWrapper>
      <HeightBox height='3rem' />
      <GallaryContentsWrapper>
        {item.map((elem) => (
          <GallaryItem
            key={elem.id}
            draggable
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
              dranOnHandler(e, elem.id);
            }}
            onDragEnd={() => {
              setIsShowContactBox(false);
            }}
          >
            <GallaryImage />
            <GallaryTextBox>
              <GallaryTextLeft>
                <p
                  css={css`
                    font-size: 1.75rem;
                  `}
                >
                  {elem.name}
                </p>
                <p
                  css={css`
                    font-size: 1.2rem;
                    color: #01051b8f;
                    width: 100%;
                    height: 5rem;
                    padding: 0.5rem 0;
                    line-height: 110%;
                  `}
                >
                  {elem.contents}
                </p>
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height: 5rem;
                  `}
                >
                  {elem.stack.map((item2, i) => (
                    <p key={i}>{item2}</p>
                  ))}
                </div>
              </GallaryTextLeft>
              <GallaryBtn>
                <Link
                  css={css`
                    width: 4rem;
                    height: 4rem;
                    background-color: #f7f1e9;
                    border-radius: 999px;
                    margin-bottom: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                  to={'/resume/dbscks97'}
                  state={{
                    keyword: 'dbscks97',
                  }}
                >
                  <IosArrowRight size={20} />
                </Link>
              </GallaryBtn>
            </GallaryTextBox>
          </GallaryItem>
        ))}
      </GallaryContentsWrapper>
      <GallaryContactBox
        isShow={isShowContactbox}
        onDrop={(e) => {
          dragDropHandler(e);
        }}
        onDragOver={(e) => dragOverHandler(e)}
      >
        <GallaryDropBox>
          {newItem?.map((elem, i) => (
            <GallaryItemInBox key={elem.id} index={i + 1}>
              <GallaryImage />
              <GallaryTextBox>
                <GallaryTextLeft></GallaryTextLeft>
                <GallaryBtn>
                  <IosArrowRight height={25} />
                </GallaryBtn>
              </GallaryTextBox>
            </GallaryItemInBox>
          ))}
        </GallaryDropBox>
      </GallaryContactBox>
    </GallaryWrapper>
  );
};

export default Gallary;
