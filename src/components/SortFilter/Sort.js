import React, { useState } from "react";
import "./Sort.scss";
import highSortDown from "../../Images/bi-sort-down.svg";
import lowSortDown from "../../Images/bi-sort-down-alt.svg";
import filterBarLogo from "../../Images/filter.svg";

const Sort = () => {
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
          Filter
          {isActive && (
            <div className="content-container">
              <div className="filter-item">
                Influencer <div className="sort-circle" />
              </div>
              <div className="filter-item">
                Hashtag <div className="sort-circle" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sort;
