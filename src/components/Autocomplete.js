import React, { useContext } from "react";
import { Context } from "../App";
import { ReactComponent as SearchIcon } from "../svg/search.svg";
import { ReactComponent as TimeIcon } from "../svg/time.svg";
import {ItemsAutocomplete} from "./ItemsAutocomplete"

export default function Autocomplete() {
  const {
    search,
    filteredOptions,
    setSearch,
    sessionFilteredOptions,
    addOptions
  } = useContext(Context);

  const listSession =
  sessionFilteredOptions && sessionFilteredOptions.length > 10
    ? sessionFilteredOptions.slice(0, 10)
    : sessionFilteredOptions;
const listLocal =
  filteredOptions && sessionFilteredOptions
    ? sessionFilteredOptions.length >= 10
      ? []
      : filteredOptions.slice(0, 10 - sessionFilteredOptions.length)
    : filteredOptions;

  

    const time = () => <TimeIcon />
    const searchIcon = () => <SearchIcon/>

  return (
    <ul
          className={search.trim().length && (filteredOptions.length || sessionFilteredOptions.length > 0) ?"autocomplete-results autocomplete-results-visible" : "autocomplete-results"}
        >
          {search.length > 0 && <ItemsAutocomplete list={listSession} setSearch={setSearch} addOptions={addOptions} icon={time}/>}
          {search.length > 0 && <ItemsAutocomplete list={listLocal} setSearch={setSearch} addOptions={addOptions} icon={searchIcon}/>}
        </ul>
  );
}
