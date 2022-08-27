import React from "react";
import xCircle from "../../../../Images/x-circle.svg";
import threeDots from "../../../../Images/threeDots.svg";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CompareTime = ({
  title,
  dateValue,
  chooseTimeClick,
  chooseTime,
  chooseTimeDropdownClick,
  setDateClick,
}) => {
  return (
    <>
      <div className="Add-country">
        <div className="country">
          <img alt="threeDots" src={threeDots} />
          <p className="title">{title}</p>
        </div>

        {!dateValue && (
          <div className="country-time">
            <button
              onClick={chooseTimeClick}
              className={`${
                !chooseTime ? "compare-time" : "compare-time-with-border"
              }`}
            >
              <>
                <span className="faplus">
                  {!chooseTime ? (
                    <FontAwesomeIcon icon={faAngleDown} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleUp} />
                  )}
                </span>
                <p className="title">Choose Time</p>
                {chooseTime && (
                  <div className="dropdown-content">
                    <div
                      onClick={chooseTimeDropdownClick}
                      className="drop-item"
                    >
                      July, 2022
                    </div>
                  </div>
                )}
              </>
            </button>
          </div>
        )}

        {dateValue && (
          <div className="country-added">
            <span className="circle-line-added-country-time"></span>
            <p className="title-line-added-country">
              {dateValue}
              <button className="close-addCountry-btn" onClick={setDateClick}>
                <img alt="xCircle" src={xCircle} />
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CompareTime;
