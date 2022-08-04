import React from "react";
import "./GlobalWellbeing.scss";

const GlobalWellbeing = () => {
  return (
    <div className="main-container">
      <div className="left-content">
        <h1 className="heading">Global Wellbeing Sentiment Index</h1>
      </div>
      <div className="right-content">
        <div className="right-border"></div>
        <div className="column-one">
          <p className="digit-one">0.04</p>
          <p className="value-one">Current Day Value </p>
          <p className="date">As of 20 July, 2022</p>
        </div>
        <div className="column-two">
          <p className="column-two-digit-one">-0.02</p>
          <p className="value-one-tilte">Absolute Change</p>
        </div>
        <div className="column-two">
          <p className="column-two-digit-one">-33.3%</p>
          <p className="value-one-tilte">Percentage Change</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalWellbeing;
