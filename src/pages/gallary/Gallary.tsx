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

interface Item {
  id: string;
  contents: string;
}

interface StackItem {
  id: number;
  name: string;
  sorted: string;
}

const Gallary = () => {
  const [item, _setItem] = useState<Item[]>([
    { id: '1', contents: 'Item 1' },
    { id: '2', contents: 'Item 2' },
    { id: '3', contents: 'Item 3' },
    { id: '4', contents: 'Item 4' },
    { id: '5', contents: 'Item 5' },
    { id: '6', contents: 'Item 6' },
    { id: '7', contents: 'Item 7' },
    { id: '8', contents: 'Item 8' },
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
                  Park Yun Chan
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
                  Hear how Stephanie, TA Lead, saves 20+ hours per by relying on Metaview’s
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
                  <p>stack</p>
                  <p>stack</p>
                  <p>stack</p>
                </div>
              </GallaryTextLeft>
              <GallaryBtn>
                <div
                  css={css`
                    width: 4rem;
                    height: 4rem;
                    background-color: #f7f1e9;
                    border-radius: 999px;
                    margin-bottom: 1rem;
                    cursor: pointer;
                  `}
                ></div>
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
                  <div
                    css={css`
                      width: 4rem;
                      height: 4rem;
                      background-color: #f7f1e9;
                      border-radius: 999px;
                      margin-bottom: 1rem;
                      cursor: pointer;
                    `}
                  ></div>
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
