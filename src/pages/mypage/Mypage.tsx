import { useNavigate, useLocation } from 'react-router-dom';
import './mypage.css';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface resumeList {
  // pdf로 변환된 이력서 list
  resumes: {
    userName: string;
    fileName: string;
  };
}

const data = [
  {
    userName: '박윤찬',
    language: ['Java', 'Python', 'CSS'],
    // imageUrl: 'https://avatars.githubusercontent.com/u/75676309?v=4',
    field: '백엔드 개발자',
    keyword: ['알고리즘 귀재', '모듈의 장악자', '설명충'],
    repoCnt: 13,
    commitCnt: 230,
    period: 6,
  },
  {
    userName: '고혜정',
    language: ['Java', 'Kotlin', 'Python'],
    field: '프론트엔드 개발자',
    keyword: ['알고리즘 귀재', '모듈의 장악자', '설명충'],
    repoCnt: 9,
    commitCnt: 210,
    period: 8,
  },
  {
    userName: '박윤찬',
    language: ['C++', 'TypeScript', 'React'],
    field: '백엔드 개발자',
    keyword: ['알고리즘 귀재', '모듈의 장악자', '설명충'],
    repoCnt: 13,
    commitCnt: 230,
    period: 6,
  },
  {
    userName: '고혜정',
    language: ['Java', 'Python', 'CSS'],
    // imageUrl: 'https://avatars.githubusercontent.com/u/75676309?v=4',
    field: '백엔드 개발자',
    keyword: ['알고리즘 귀재', '모듈의 장악자', '설명충'],
    repoCnt: 9,
    commitCnt: 210,
    period: 8,
  },
  {
    userName: '고혜정',
    language: ['Java', 'Kotlin', 'Python'],
    field: '프론트엔드 개발자',
    keyword: ['알고리즘 귀재', '모듈의 장악자', '설명충'],
    repoCnt: 9,
    commitCnt: 210,
    period: 8,
  },
  {
    userName: '박윤찬',
    language: ['C++', 'TypeScript', 'React'],
    field: '백엔드 개발자',
    keyword: ['알고리즘 귀재', '모듈의 장악자', '설명충'],
    repoCnt: 13,
    commitCnt: 230,
    period: 6,
  },
  {
    userName: '박윤찬',
    language: ['Java', 'Python', 'CSS'],
    // imageUrl: 'https://avatars.githubusercontent.com/u/75676309?v=4',
    field: '백엔드 개발자',
    keyword: ['알고리즘 귀재', '모듈의 장악자', '설명충'],
    repoCnt: 13,
    commitCnt: 230,
    period: 6,
  },
];

function Mypage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 클릭한 resume 테두리 색상 변경
  const [selectedResumeIndex, setSelectedResumeIndex] = useState([]);

  // 클릭한 resume 데이터 관리
  const [selectedResumeData, setSelectedResumeData] = useState([]);

  // 클릭한 data들의 데이터를 submit버튼을 클릭하면 여기로 업데이트
  const [displayedData, setDisplayedData] = useState([]);

  // 보낸 이력서 / 받은 이력서 선택에 따라 setData를 이용하여 data 변경해서 리스트에 띄우기
  //   const [data, setData] = useState();

  /**
   * 보낸것 / 받은것 select option선택에 따라 이력서 구분해주는 함수
   */
  function resumeControlHandler(event) {
    const value = event.target.value;
    alert('value = ' + value);

    if (value == 'sendResume') {
      // 보낸 이력서를 골랐을 경우 보여줄 이력서 리스트/
    } else {
      // 받은 이력서일 경우 보여줄 이력서
    }
  }

  /**
   *
   * @param index resume list들 중 선택한 resume 색상 변경
   */
  function handleResumeClick(index, itemData) {
    const isSelected = selectedResumeIndex.includes(index);

    if (isSelected) {
      setSelectedResumeIndex(selectedResumeIndex.filter((i) => i !== index));
      setSelectedResumeData(selectedResumeData.filter((data) => data !== itemData));
    } else {
      setSelectedResumeIndex([...selectedResumeIndex, index]);
      setSelectedResumeData([...selectedResumeData, itemData]);
    }
  }

  function handleSubmit() {
    setDisplayedData(selectedResumeData);
  }

  return (
    <>
      <select className='selectBox' onChange={resumeControlHandler}>
        <option value='sendResume'>보낸 이력서</option>
        <option value='receiveResume'>받은 이력서</option>
      </select>
      <div className='Wrap'>
        <div className='topContentWrap'>
          <div className='TItleWrap'>
            <div className='Title'>진행중</div>
          </div>
          <div className='resumeWrap'>
            {data.map((item, i) => (
              <div
                key={i}
                className={selectedResumeIndex.includes(i) ? 'resume selected' : 'resume'}
                onClick={() => handleResumeClick(i, item)}
              >
                <div className='resumeTitleWrap'>
                  <div className='stack'>스택</div>
                </div>

                <div className='topTextWrap'>
                  <div className='userImage'>{item.imageUrl}</div>
                  <div className='nameFieldWrap'>
                    <div className='userName'>{item.userName}</div>
                    <div className='field'>{item.field}</div>
                  </div>
                </div>
                <div className='bottomTextWrap'>
                  <div className='bottomMiddleWrap'>
                    {/* <div className='language'>{item.language}</div> */}
                    <div className='keywords'>
                      {item.keyword.map((kw, index) => (
                        <div key={index} className='single-keyword'>
                          #{kw}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='miniBorder'></div>
                  <div className='bottomBotWrap'>
                    <div className='cntCompo'>
                      <div className='repoWrap'>
                        <div className='repoCnt'>레포지토리</div>
                        <div className='repoCntNum'>{item.repoCnt}</div>
                      </div>
                      <div className='commitWrap'>
                        <div className='commitCnt'>커밋</div>
                        <div className='commitCntNum'>{item.commitCnt}</div>
                      </div>
                      <div className='periodWrap'>
                        <div className='period'>기간</div>
                        <div className='periodNum'>{item.period}</div>
                      </div>
                    </div>
                    <div className='buttonWrap'>
                      <button className='analysisBtn'>분석보기</button>
                      <button className='printPdfBtn'>PDF 출력</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button type='submit' className='submit' onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className='borderLine'></div>
        <div className='bottomContentWrap'>
          <div className='TitleWrap'>
            <div className='Title'>완료</div>
          </div>
          <div className='resumeWrap2'>
            {displayedData.map((item, i) => (
              <div key={i} className='resume'>
                <div className='resumeTitleWrap'>
                  <div className='stack'>스택</div>
                </div>

                <div className='topTextWrap'>
                  <div className='userImage'>{item.imageUrl}</div>
                  <div className='nameFieldWrap'>
                    <div className='userName'>{item.userName}</div>
                    <div className='field'>{item.field}</div>
                  </div>
                </div>
                <div className='bottomTextWrap'>
                  <div className='bottomMiddleWrap'>
                    {/* <div className='language'>{item.language}</div> */}
                    <div className='keywords'>
                      {item.keyword.map((kw, index) => (
                        <div key={index} className='single-keyword'>
                          #{kw}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='miniBorder'></div>
                  <div className='bottomBotWrap'>
                    <div className='cntCompo'>
                      <div className='repoWrap'>
                        <div className='repoCnt'>레포지토리</div>
                        <div className='repoCntNum'>{item.repoCnt}</div>
                      </div>
                      <div className='commitWrap'>
                        <div className='commitCnt'>커밋</div>
                        <div className='commitCntNum'>{item.commitCnt}</div>
                      </div>
                      <div className='periodWrap'>
                        <div className='period'>기간</div>
                        <div className='periodNum'>{item.period}</div>
                      </div>
                    </div>
                    <div className='buttonWrap'>
                      <button className='analysisBtn'>분석보기</button>
                      <button className='printPdfBtn'>PDF 출력</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='contentWrap'></div>
        <div className='watchedList'></div>
        <div className='center'></div>
        <div className='messageList'></div>
      </div>
    </>
  );
}

export default Mypage;
