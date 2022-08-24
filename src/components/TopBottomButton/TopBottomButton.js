import React from "react";
// import sortDown from "../../Images/bi_sort-down.svg";
import "./TopBottomButton.scss";

const TopBottomButton = () => {
  return (
    <div className="btn-wrapper">
      <button className="btn-container">
        {/* <img src={sortDown} /> */}
        <p className="btn-heading">Top 10</p>
      </button>
    </div>
  );
};

export default TopBottomButton;
