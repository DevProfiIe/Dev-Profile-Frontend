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

function Mypage() {
  const navigate = useNavigate();
  const location = useLocation();

  // resume list는 pdf 출력 화면에서 드래그해서 담을 때 state에 담아서 가져올 것
  const resumeList: resumeList = location.state;

  const [current, setCurrent] = useState(resumeList);

  return (
    <>
      <select className='selectBox'>
        <option>보낸 이력서</option>
        <option>받은 이력서</option>
      </select>
      <div className='Wrap'>
        <div className='topContentWrap'>
          <div className='TItleWrap'>
            <div className='Title'>진행중</div>
          </div>
          <div className='resumeWrap'>
            <div className='resume'>resume</div>
            <div className='resume'>resume</div>
            <div className='resume'>resume</div>
            <div className='resume'>resume</div>
            <div className='resume'>resume</div>
          </div>
          <button type='submit' className='submit'>
            Submit
          </button>
        </div>
        <div className='borderLine'></div>
        <div className='bottomContentWrap'>
          <div className='TitleWrap'>
            <div className='Title'>완료</div>
          </div>
          <div className='resumeWrap2'>
            <div className='resume'>resume</div>
            <div className='resume'>resume</div>
            <div className='resume'>resume</div>
            <div className='resume'>resume</div>
            <div className='resume'>resume</div>
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
