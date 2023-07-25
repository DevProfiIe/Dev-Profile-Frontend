import logo from './logo.svg';
import './App.css';
import Repo from './components/Repo'
import SearchCommit from './components/SearchCommit';
import SearchCommitModal from './components/SearchCommit'
import { Routes, Route, Link } from 'react-router-dom';
import { createContext, useState } from 'react';
import data from './db'
import FetchRepo from './components/Repo'
import { motion, useScroll } from "framer-motion"


// export let Context1 = createContext()

function App() {

  // let [repoName, setRepoName] = useState(['']);
  // let [stack, setStack] = useState(['']);
  // let [period, setPeriod] = useState(['']);
  // let [summary, setSummary] = useState(['']);
  // let [mainFunc, setMainFunc] = useState(['']);
  // let [search, setSearch] = useState([]);


  const [commit, setCommit] = useState(['aaa', 'bbb', 'ccc']);
  const [code, setCode] = useState(['code1', 'code2', 'code3']);

  return (
    <div className="App">
        <motion.div
        transition={{
          ease: "linear",
          duration: 2,
          x: { duration: 1 } 
          }} 
        className="Title">DevProfile
        </motion.div>
        <div className="ContentWrap">
          <SearchCommit />
          <Repo />

        </div>
        </div>
  );
}


export default App;