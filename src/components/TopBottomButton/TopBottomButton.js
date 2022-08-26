import React, { useState } from "react";
import "./TopBottomButton.scss";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopBottomButton = ({ topBottom, topBottomData, setTopBottom }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="btn-wrapper">
      <button onClick={() => setIsActive(!isActive)} className="btn-container">
        <p className="btn-heading">{topBottom}</p>
        <FontAwesomeIcon icon={faArrowDownShortWide} />

        {isActive && (
          <div className="content-container">
            {topBottomData.map((option) => (
              <>
                <div
                  onClick={() => {
                    setTopBottom(option);
                  }}
                  className="filter-item"
                >
                  {option}

                  <div className="sort-circle">
                    {topBottom === option && (
                      <div className="sort-circle-colored"></div>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

export default TopBottomButton;
