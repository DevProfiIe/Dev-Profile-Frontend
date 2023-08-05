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
    userName: 'Park Yun Chan',
    language: ['Java', 'Python', 'CSS'],
    imageUrl: 'https://avatars.githubusercontent.com/u/75676309?v=4',
  },
  {
    userName: 'Go Hye Jung',
    language: ['Java', 'Kotlin', 'Python'],
  },
  {
    userName: 'Hong Yoon Pyo',
    language: ['C++', 'TypeScript', 'React'],
  },
  {
    userName: 'Park Yun Chan',
    language: ['Java', 'Python', 'CSS'],
    imageUrl: 'https://avatars.githubusercontent.com/u/75676309?v=4',
  },
  {
    userName: 'Go Hye Jung',
    language: ['Java', 'Kotlin', 'Python'],
  },
  {
    userName: 'Hong Yoon Pyo',
    language: ['C++', 'TypeScript', 'React'],
  },
  {
    userName: 'Park Yun Chan',
    language: ['Java', 'Python', 'CSS'],
    imageUrl: 'https://avatars.githubusercontent.com/u/75676309?v=4',
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
                <div className='userImage'>{item.imageUrl}</div>
                {item.userName} resume
                <div className='language'>{item.language}</div>
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
                <div className='userImage'>{item.imageUrl}</div>
                {item.userName} resume
                <div className='language'>{item.language}</div>
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
