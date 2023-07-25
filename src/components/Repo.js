import { useContext, useEffect, useState } from "react";
import '../styles/repo.css'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import data from '../db.js'
import { Title } from 'chart.js';
import App from '../App'
// import { Context1 } from "../App";
import { motion } from "framer-motion"
import React from 'react';
import PieChart from "./PieChart";




function Repo (props) {
  
  // let repoInfo = useContext(Context1)
  const [data, setData] = useState([]);
  

  const FetchRepo = async() => {
    try {
      const response = await axios.get('http://43.201.251.133:8080/response_test?userName=dbscks97'); // 여기에 실제 주소

      // API에서 반환한 데이터를 상태 변수에 설정
      setData(response.data.data.repositoryInfo);
      console.log(data)


    } catch(error) {
      console.log(error);
    }
  };

  // 컴포넌트가 마운트되면 API를 호출합니다.
  useEffect(()=> {
    FetchRepo();
  }, []);   // 빈 배열을 전달하여 마운트 시에만 FetchRepo 함수가 실행되도록 한다.


  const piedata = [
    { id: '내 기여도', label: 'One', value: 35, color: 'hsl(285, 70%, 50%)' },
    { id: 'Two', label: 'Two', value: 20, color: 'hsl(171, 70%, 50%)' },
    { id: 'Three', label: 'Three', value: 30, color: 'hsl(146, 70%, 50%)' },

  ];

  return (
    <div className="wrap">
      {/* { API에서 반환된 데이터 출력} */}
      {data.map((a, i) => (
        <div key={i}>{a.value}
        <motion.div className="Repo"
          animate={{ x: 20 }}
          transition={{
            ease: "linear",
            duration: 2,
            x: { duration: 1 }
          }}
          whileHover={{ scale: 1.1 }}
        >
        <div className="RepoLeftBox">
      <div className="RepoName">{ data[i].repoName }</div>
      <div className="TeamMember">프로젝트 인원: { data[i].totalContributors }</div>
      <div className="RepoStack">기술 스택: { data[i].repoLanguages.join(', ') }</div>
      <div className="RepoPeriod">기간: { data[i].startDate }~ { data[i].endDate }</div>
      <div className="RepoSummary">주제: {  }</ div>
    </div>
    <div className="RepoRightBox">
      <div className="RepoFunctionWrap">
        <div className="FunctionTitle">구현한 기능</div>
        <div className="FunctionList">{ data[i].featured }</div>
        <div style={{ height:'200px' }}>
          <PieChart data={ piedata }/>
        </div>
      </div>
    </div>
        </motion.div>
        </div>
      ))}
  </div>

  
  )
}



export default Repo;