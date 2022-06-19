import React, { useEffect, useState } from "react";
import Content from "./components/Content";
import Search from "./components/Search";
import "./css/main.css";
import axios from "axios";
export const Context = React.createContext(null);

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(null);
  const [sessionFilteredOptions, setSessionFilteredOptions] = useState(null);
  const [options, setOptions] = useState([]);
  const [sessionOptions, setSessionOptions] = useState([]);
  const [timeSearch,setTimeSearch] = useState(null)

  useEffect(() => {
    
    let autocompleteOptions = localStorage.getItem("autocompleteOptions")
      ? JSON.parse(localStorage.getItem("autocompleteOptions"))
      : [];
    let sessionAutocompleteOptions = sessionStorage.getItem(
      "autocompleteOptions"
    )
      ? JSON.parse(sessionStorage.getItem("autocompleteOptions"))
      : [];

    setSessionOptions(sessionAutocompleteOptions);
    let uniqueList = new Set(sessionAutocompleteOptions);
    setOptions(autocompleteOptions.filter((e) => !uniqueList.has(e)));
  }, []);

  const addOptions = (value) => {
    
    let optionsList = [...new Set([...options, ...sessionOptions, value])];
    let optionsSessionList = [...new Set([...sessionOptions, value])];
    setSessionOptions(optionsSessionList);
    localStorage.setItem("autocompleteOptions", JSON.stringify(optionsList));
    sessionStorage.setItem(
      "autocompleteOptions",
      JSON.stringify(optionsSessionList)
    );

    const url = "https://www.googleapis.com/customsearch/v1?";
    const apiKey = "key=AIzaSyDiAg6Yx4YPLvlLDwPXH0pD2blULPBk03A";
    const cx = "&cx=008993671637674012003:y7jt0xhysdv";
    let time = performance.now()
    axios.get(`${url}${apiKey}${cx}&q=${search}`)
    .then((res) => {
      time = performance.now()-time;
      setTimeSearch(time)
     if(res.data){
      setData(res.data.items)
     }
    })
    .catch(err => console.log(err))

    setFilteredOptions([]);
    setSessionFilteredOptions([])
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    const sessionFilteredOptions = sessionOptions.filter(
      (option) => option.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    setFilteredOptions(filteredOptions);
    setSessionFilteredOptions(sessionFilteredOptions);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      addOptions(e.target.value);
      
    }
  };

  return (
    <Context.Provider
      value={{
        search,
        setSearch,
        handleSearch,
        handleKeyDown,
        filteredOptions,
        setFilteredOptions,
        addOptions,
        sessionFilteredOptions,
        data,
      }}
    >
      <div className="App">
        <div className="container">
          <Search />
          {timeSearch && <div className="results-time">Results: {data.length} ({(timeSearch/1000000).toFixed(3)} sec.)</div>}
          <Content />
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;