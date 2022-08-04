import React, { useState } from "react";
import "./Sort.scss";
import filterBarLogo from "../../Images/filter.svg";
import searchBarLogo from "../../Images/Search.png";

const Sort = ({ optiondata, data, setData, value, onchange }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="search-bar-filter">
      <div className="bar-search">
        <input
          className="bar-search-data"
          name="search"
          value={value}
          onChange={onchange}
          placeholder="search..."
          type="text"
        />
        <img className="search-icon-image-sort" src={searchBarLogo} />
      </div>
      <div className="filter-bar-data">
        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="sort-filter-wrapper"
        >
          <img src={filterBarLogo} className="filter-logo-img"></img>
          {data}
          {isActive && (
            <div className="content-container">
              {optiondata.map((option) => (
                <>
                  <div
                    onClick={() => {
                      setData(option);
                    }}
                    className="filter-item"
                  >
                    {option} <div className="sort-circle" />
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sort;
