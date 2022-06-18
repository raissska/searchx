import React from 'react'

export const ItemsAutocomplete = ({list,setSearch,icon,addOptions}) => {
 
  return(
    <React.Fragment>
       {list.map((option, index) => (
              <li
                className="autocomplete-results-item"
                key={option + index}
                onClick={() => {
                  setSearch(option)
                  addOptions(option)
                }}
              >
                <div className={"autocomplete-results-item-div"}>
                  <span className={"autocomplete-results-item-icon"}>
                    {icon()}
                  </span>
                  <span className={"autocomplete-results-item-label"}>
                    {option}
                  </span>
                </div>
              </li>
            ))}
    </React.Fragment>
  )
}