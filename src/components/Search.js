import React, { useContext } from "react";
import { Context } from "../App";
import Autocomplete from "./Autocomplete";
import { ReactComponent as SearchIcon } from "../svg/search.svg";
import { ReactComponent as Clear } from "../svg/close.svg";

export default function Search() {
  const {
    search,
    handleSearch,
    handleKeyDown,
    filteredOptions,
    setSearch,
    addOptions,
    sessionFilteredOptions,
  } = useContext(Context);

 

  return (
    <div>
      <div style={{position:'relative',width:690}}>
        <div
          className={
            search.trim().length &&
            (filteredOptions.length > 0 || sessionFilteredOptions.length > 0)
              ? "search search-visibil-autocomplete"
              : "search"
          }
        >
          <input
            className="input-search"
            type="text"
            value={search}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          <div className="input-search-button ">
            <button
            onClick={() => {
              setSearch("");
            }}
          >
            <Clear />
          </button>
          </div>
          <div className="input-search-button input-search-button-border-left"><button onClick={() => addOptions(search)}>
            <SearchIcon />
          </button>
        </div>
        </div>
        <Autocomplete/>
      </div>
      {/* <Autocomplete/> */}
    </div>
  );
}
