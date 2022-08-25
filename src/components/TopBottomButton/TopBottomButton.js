import React from "react";
// import sortDown from "../../Images/bi_sort-down.svg";
import "./TopBottomButton.scss";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopBottomButton = () => {
  return (
    <div className="btn-wrapper">
      <button className="btn-container">
        <p className="btn-heading">Top 10</p>
        <FontAwesomeIcon icon={faArrowDownShortWide} />
      </button>
    </div>
  );
};

export default TopBottomButton;
