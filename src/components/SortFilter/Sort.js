import React, { useState } from "react";
import "./Sort.scss";
import highSortDown from "../../Images/bi-sort-down.svg";
import lowSortDown from "../../Images/bi-sort-down-alt.svg";

const Sort = ({ Icon }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onClick={(e) => {
        setIsActive(!isActive);
      }}
      className="filter"
    >
      <img
        alt="sort-icon"
        className={`${!isActive ? "sort-icon" : "sort-icon-open"}`}
        src={Icon}
      ></img>
      {isActive && (
        <div className="filter-dropdown-content">
          <div className="filter-dropdown-item">
            High to low
            <img
              alt="highSortDown"
              className="sort-down"
              src={highSortDown}
            ></img>
          </div>
          <div className="filter-dropdown-item">
            Low to high
            <img
              alt="lowSortDown"
              className="lowSortDown"
              src={lowSortDown}
            ></img>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
