import '../styles/searchcommit.css'
import { useState, useEffect } from 'react';
// import SearchCommit from './SearchCommit';
import axios from 'axios'
import useDebounce from './useDebounce';
import { motion } from "framer-motion"
import data from './../db';


// 자동완성으로 보여질 결과들의 List
function CountryList ({ countries }) {
  if (!countries) return;
  return countries.map((country) => {
    return (
      <div className="commit"
      key={`${country.area}`}>
        <span>{country.name.official}</span>{" "}

      </div>
    )
  })
}


function SearchCommit (props) {


  const [commit, setCommit] = useState(['aaa', 'bbb', 'ccc']);


  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);

  const debounceValue = useDebounce(search);

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  useEffect (() => {
    const getCountries = async () => {
      return await fetch(`https://restcountries.com/v3.1/name/${debounceValue}`)
      .then((res) => {
        if (!res.ok) {
          return new Promise.reject("no country found");
        }
        return res.json();
      })
      .then((list) => {
        setCountries(list);
      })
      .catch((err) => console.error(err));
    };
    if (debounceValue) getCountries();
  }, [debounceValue]);


  useEffect(() => {
    document.body.style.overflow = showPopup ? "hidden" : "auto";}, [showPopup]);
  


    return(
        <>
        <div className="SearchWrap afterSearchWrap">
            <div className="SearchTitle">키워드 기반 커밋 검색</div>
            <input className="SearchInput" placeholder='검색 키워드를 입력하세요'
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            ></input>
        </div>
            <div className="SearchResultsWrap">
            <div className="SearchResults"
            onClick={togglePopup}>
            {search ? <CountryList countries={countries} /> : ""}
            </div>
        </div>

      {showPopup && (
        <div
          className="PopupLayer"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div
            className="PopupContent"
            style={{
              backgroundColor: "white",
              width: "800px",
              height: "550px",
              padding: "20px",
              margin: "100px auto",
              position: "relative",
              overflowY: "scroll",     //세로 스크롤 설정
            }}
          >
            <div className="CodeTitle">Code</div>

            <p>
              datad<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datadd<br/>
              d<br/>
              d<br/>
              dataddd<br/>
              data<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datadd<br/>
              d<br/>
              d<br/>
              dataddd<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datadd<br/>
              d<br/>
              d<br/>
              dataddd<br/>
              data<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datad<br/>
              datadd<br/>
              d<br/>
              d<br/>
              dataddd<br/>
            </p>
            <button
              onClick={togglePopup}
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                backgroundColor: "white",
                width: "30px",
                height: "30px",
                borderRadius: "10%",
                border: "none"
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

  
  // function SearchCodeModal (props) {
  //   return (
  //       <div className="CommitCode">

  //       </div>
  //   )
  // }
  


export default SearchCommit;