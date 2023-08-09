import Card from '~/components/card/Card';
import {
  UserConfirmInSideWrapper,
  UserContentWrapper,
  UserFilterTag,
  UserInfoBox,
  UserInfoContent,
  UserInfoImg,
  UserInfoName,
  UserMainWrapper,
  UserReceiveItem,
  UserReceiveItemText,
  UserReceiveItemWrapper,
  UserReceiveWrapper,
  UserResumeWrapper,
  UserSideView,
  UserWrapper,
} from './user.styles';
import { css } from '@emotion/react';
import { List } from 'emotion-icons/bootstrap';
import { useEffect, useState } from 'react';
import {
  GetBoardDataDetails,
  GetMyPageUserItems,
  MyPageUserItemDetail,
  UserGithubInfo,
} from '~/redux/api/types';
import {
  useGetMyPageUserItemsQuery,
  useGetMyPageUserSpecificQuery,
  usePostMyPageUserSpecificMutation,
} from '~/redux/api';
import Loader from '~/components/loader/Loader';

const User = () => {
  const [isShowConfirmBox, setIsShowConfirmBox] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserGithubInfo | null>(null);
  const [nowTab, setNowTab] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<MyPageUserItemDetail | null>(null);
  const [selectedCards, setSelectedCards] = useState<GetBoardDataDetails[]>([]);
  const myPageUserItems = useGetMyPageUserItemsQuery({
    userName: userInfo?.login ?? '',
  });

  const myPageUserCards = useGetMyPageUserSpecificQuery(
    {
      id: selectedItems?.id ?? '',
    },
    {
      skip: !selectedItems,
    },
  );

  const userMyPageItemData = (myPageUserItems.data?.data as GetMyPageUserItems) ?? {};

  const [postUserCardQuery] = usePostMyPageUserSpecificMutation();

  /**
   *
   */
  const showConfirmHandler = () => {
    setIsShowConfirmBox((state) => !state);
  };

  /**
   *
   */
  const clickConfirmHandler = () => {
    const selectedCardIds = selectedCards.map((item) => item.login);

    if (selectedCardIds.length > 0 && selectedItems?.id) {
      postUserCardQuery({
        id: selectedItems?.id,
        checkUserNames: selectedCardIds,
      }).then((res: any) => {
        if (res.result) {
          myPageUserCards.refetch();
        }
      });
    } else {
      console.log('선택해주세요.');
    }
  };

  /**
   *
   */
  const changeTabHandler = (flag: boolean) => {
    setNowTab(flag);
  };

  /**
   *
   */
  const clickListHandler = (item: MyPageUserItemDetail) => {
    setSelectedItems(item);
  };

  /**
   *
   * @param item
   */
  const selectCardHandler = (item: GetBoardDataDetails) => {
    const isExist = selectedCards.some((resume) => resume.userName === item.userName);

    if (isExist) {
      const newItems = selectedCards.filter((resume) => resume.userName !== item.userName);

      setSelectedCards(newItems);
    } else {
      setSelectedCards((prevState) => {
        return [...prevState, item];
      });
    }
  };

  /**
   *
   */
  const findSelectedCard = (item: GetBoardDataDetails) => {
    const isExist = selectedCards.some((resume) => resume.userName === item.userName);

    return isExist;
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo') ?? null;

    if (userInfo) {
      const userData = JSON.parse(userInfo) as UserGithubInfo;
      setUserInfo(userData);
    }
  }, []);

  if (myPageUserItems.isLoading) {
    return <Loader />;
  }

  return (
    <UserWrapper>
      <UserContentWrapper>
        <UserSideView>
          <UserInfoBox>
            <UserInfoImg bgUrl={userInfo?.avatar_url ?? ''} />
            <UserInfoName>{userInfo?.name}</UserInfoName>
            <UserInfoContent>
              <button
                css={css`
                  border-right: 1px solid #ececec;
                  position: relative;
                  background-color: ${!nowTab ? '#ececec' : ''};

                  &:: after {
                    content: '1';
                    display: block;
                    position: absolute;
                    width: 17px;
                    height: 17px;
                    text-align: center;
                    line-height: 17px;
                    border-radius: 999px;
                    background-color: red;
                    font-size: 0.725rem;
                    right: 20%;
                    top: 20%;
                    color: white;
                  }
                `}
                onClick={() => {
                  changeTabHandler(false);
                }}
              >
                받은 제안
              </button>
              <button
                css={css`
                  position: relative;
                  background-color: ${nowTab ? '#ececec' : ''};

                  &:: after {
                    content: '8';
                    display: block;
                    position: absolute;
                    width: 17px;
                    height: 17px;
                    text-align: center;
                    line-height: 17px;
                    border-radius: 999px;
                    background-color: red;
                    font-size: 0.725rem;
                    right: 20%;
                    top: 20%;
                    color: white;
                  }
                `}
                onClick={() => {
                  changeTabHandler(true);
                }}
              >
                보낸 제안
              </button>
            </UserInfoContent>
          </UserInfoBox>
          <UserReceiveWrapper>
            <UserReceiveItemWrapper>
              {!nowTab
                ? userMyPageItemData.receive?.map((item) => (
                    <UserReceiveItem isSelected={selectedItems?.id === item.id} key={item.id}>
                      <UserReceiveItemText>
                        <p
                          css={css`
                            font-size: 1.2rem;
                            line-height: 134%;
                          `}
                        >
                          <span
                            css={css`
                              font-size: 1.5rem;
                              color: #189bfa;
                            `}
                          >
                            {item.filter.length}
                          </span>
                          개의 키워드로 필터링된{' '}
                          <span
                            css={css`
                              font-size: 1.5rem;
                              color: #189bfa;
                            `}
                          >
                            {item.people}
                          </span>
                          명의 개발자{' '}
                        </p>
                        <div
                          css={css`
                            width: 100%;
                            align-content: flex-end;
                            display: flex;
                            justify-content: space-between;
                            font-size: 0.925rem;
                          `}
                        >
                          <p>{item.sendDate}</p>
                          <p>보낸 사람: {item.userName}</p>
                        </div>
                      </UserReceiveItemText>
                      <div>
                        <button
                          css={css`
                            border-radius: 999px;
                            border: 1px solid #eee;
                            padding: 0.5rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                          `}
                          onClick={() => {
                            clickListHandler(item);
                          }}
                        >
                          <List size={25} />
                        </button>
                      </div>
                    </UserReceiveItem>
                  ))
                : userMyPageItemData.send?.map((item) => (
                    <UserReceiveItem isSelected={selectedItems?.id === item.id} key={item.id}>
                      <UserReceiveItemText>
                        <p
                          css={css`
                            font-size: 1.2rem;
                            line-height: 134%;
                          `}
                        >
                          <span
                            css={css`
                              font-size: 1.5rem;
                              color: #189bfa;
                            `}
                          >
                            {item.filter.length}
                          </span>
                          개의 키워드로 필터링된{' '}
                          <span
                            css={css`
                              font-size: 1.5rem;
                              color: #189bfa;
                            `}
                          >
                            {item.people}
                          </span>
                          명의 개발자{' '}
                        </p>
                        <div
                          css={css`
                            width: 100%;
                            align-content: flex-end;
                            display: flex;
                            justify-content: space-between;
                            font-size: 0.925rem;
                          `}
                        >
                          <p>{item.sendDate}</p>
                          <p>받은 사람: {item.userName}</p>
                        </div>
                      </UserReceiveItemText>
                      <div>
                        <button
                          css={css`
                            border-radius: 999px;
                            border: 1px solid #eee;
                            padding: 0.5rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                          `}
                          onClick={() => {
                            clickListHandler(item);
                          }}
                        >
                          <List size={25} />
                        </button>
                      </div>
                    </UserReceiveItem>
                  ))}
            </UserReceiveItemWrapper>
          </UserReceiveWrapper>
        </UserSideView>
        <UserMainWrapper>
          <div
            css={css`
              width: 100%;
              height: auto;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: relative;
              padding: 2rem 0 0 0;
            `}
          >
            <div
              css={css`
                width: 80%;
                display: flex;
                flex-flow: column nowrap;
                gap: 0.7rem 0;
              `}
            >
              <p
                css={css`
                  font-size: 1.5rem;
                `}
              >
                Filtered By :
              </p>
              <div
                css={css`
                  width: 100%;
                  display: flex;
                  flex-flow: row wrap;
                  gap: 0.5rem 0.2rem;
                `}
              >
                {selectedItems?.filter.map((item) => (
                  <UserFilterTag key={item}>#{item}</UserFilterTag>
                ))}
              </div>
            </div>
            <div
              css={css`
                width: 20%;
                display: flex;
                justify-content: flex-end;
              `}
            >
              <button
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 0 0.5rem;
                  padding: 0.6rem 1.5rem;
                  border: 1px solid #ececec;
                  border-radius: 5px;
                  z-index: 2;
                `}
                onClick={showConfirmHandler}
                disabled={!selectedItems}
              >
                확정하기
              </button>
              {isShowConfirmBox && (
                <div
                  css={css`
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    gap: 0.5rem 0;
                    height: auto;
                    width: 270px;
                    position: absolute;
                    top: 85%;
                    right: 0;
                    border-radius: 0.5rem;
                    background-color: white;
                    border: 1px solid #ececec;
                    padding: 1rem;
                    z-index: 2;
                  `}
                >
                  <p
                    css={css`
                      line-height: 160%;
                    `}
                  >
                    <span
                      css={css`
                        font-size: 1.2rem;
                        font-weight: 700;
                        color: #189bfa;
                        margin-right: 0.5rem;
                      `}
                    >
                      {selectedCards.length} 개의
                    </span>
                    분석 데이터를 확정합니다.
                  </p>
                  <UserConfirmInSideWrapper>
                    <button onClick={clickConfirmHandler}>확정</button>
                    <button onClick={showConfirmHandler}>취소</button>
                  </UserConfirmInSideWrapper>
                </div>
              )}
            </div>
          </div>
          <UserResumeWrapper>
            {myPageUserCards.data ? (
              myPageUserCards.data?.data.map((item) => (
                <Card
                  onClick={() => {
                    selectCardHandler(item);
                  }}
                  key={item.login}
                  data={item}
                  isSelected={findSelectedCard(item)}
                />
              ))
            ) : (
              <p>제안을 선택해주세요.</p>
            )}
          </UserResumeWrapper>
        </UserMainWrapper>
      </UserContentWrapper>
    </UserWrapper>
  );
};

export default User;
