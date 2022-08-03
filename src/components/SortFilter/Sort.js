import React, { useState } from "react";
import "./Sort.scss";
import filterBarLogo from "../../Images/filter.svg";

const Sort = ({ optiondata, data, setData }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="search-bar-filter">
      <div className="bar-search">
        <input
          className="bar-search-data"
          name="search"
          placeholder="search..."
          type="text"
        />
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
