import React, { useState } from "react";
import "./LineChart.scss";
import { useLocation, useNavigate } from "react-router-dom";
import downloadIcon from "../../../Images/download.svg";
import shareIcon from "../../../Images/share.svg";
import {
  faPlus,
  faArrowLeft,
  faAngleUp,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import Header from "../../Layouts/Header/Header";
import Chart from "./Chart";
import Highcharts from "highcharts";
import { LineChartBarData } from "./data";
import HighchartsReact from "highcharts-react-official";
import xCircle from "../../../Images/x-circle.svg";
import threeDots from "../../../Images/threeDots.svg";
import plus from "../../../Images/plus.svg";
import plusTwo from "../../../Images/plusTwo.svg";

const LineChartData = () => {
  const [selected, setSelected] = useState("Past 1 months");
  const [selectCountry, setselectCountry] = useState("Worldwide");
  const dateSelect = [
    "Past Day ",
    "Past 7 Days",
    "Past 30 Days",
    "Past 90 Days",
    "Past Year",
  ];
  const countrySelect = [
    "India ",
    "United States",
    "Canada",
    "United Kingdom",
    "Worldwide",
  ];
  const [openModal, setOpenModal] = useState(false);
  const router = useLocation();
  const navigate = useNavigate();
  const [addCountry, setaddCountry] = useState(false);
  const [contryNameState, setContryNameState] = useState("");
  const [isValue, setIsValue] = useState(false);
  const [compareCountryActive, setCompareCountryActive] = useState("");
  const [chooseTime, setChooseTime] = useState(false);
  const [dateValue, setDateValue] = useState("");

  const navigateHome = () => {
    navigate("/");
  };

  const onCountryNameAdd = (event) => {
    setContryNameState(event.target.value);
  };

  const onCountryEnterPress = (e) => {
    if (e.key === "Enter") {
      setIsValue(true);
    }
  };

  const closeAddCountry = () => {
    setContryNameState("");
    setIsValue(false);
  };
  return (
    <>
      {router.pathname === "/LineChart" ? <Header /> : ""}
      {router.pathname === "/LineChart" ? (
        <button onClick={navigateHome} type="button" className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      ) : (
        ""
      )}

      <div className="lineChart-container">
        <div className="whole-container">
          <div className="heading-content">
            <div className="heading">Wellbeing Sentiment Score Over Time</div>
            <div className="right-icons">
              <button type="button" alt="downloadIcon" className="d-icon">
                <img alt="download-icon" src={downloadIcon}></img>
              </button>
              <button
                onClick={() => setOpenModal(true)}
                type="button"
                alt="shareIcon"
                className="s-icon"
              >
                <img alt="share-icon" src={shareIcon}></img>
              </button>
            </div>
          </div>
          <div className="buttons">
            <div className="left-button">
              <div className="select-country-btn">
                <Button
                  disabled={isValue}
                  options={countrySelect}
                  selected={selectCountry}
                  setSelected={setselectCountry}
                />
              </div>
              <div className="select-date-btn">
                <Button
                  disabled={dateValue}
                  options={dateSelect}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </div>
            <div className="right-button">
              <button
                onClick={() => setCompareCountryActive("compareCountry")}
                className={`${
                  compareCountryActive === "compareCountry"
                    ? "right-ouline-button"
                    : "right-ouline-buttonTwo"
                }`}
              >
                {compareCountryActive === "compareCountry" ? (
                  <img alt="plusIcon" src={plus} />
                ) : (
                  <img alt="plus" src={plusTwo} />
                )}
                Compare country
              </button>
              <button
                onClick={() => setCompareCountryActive("compareTime")}
                className={`${
                  compareCountryActive === "compareTime"
                    ? "right-ouline-button"
                    : "right-ouline-buttonTwo"
                }`}
              >
                {compareCountryActive === "compareTime" ? (
                  <img alt="plusIcon" src={plus} />
                ) : (
                  <img alt="plus" src={plusTwo} />
                )}
                Compare time
              </button>
            </div>
          </div>
          {!compareCountryActive ? <div className="border"></div> : null}

          {compareCountryActive === "compareCountry" && (
            <div className="Add-country">
              <div className="country">
                <img alt="dots" src={threeDots} />
                <p className="title">Worldwide</p>
              </div>
              {!addCountry ? (
                <button
                  onClick={() => setaddCountry(!addCountry)}
                  className="country-add"
                >
                  <>
                    <span className="faplus">
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <p className="title">Add country</p>
                  </>
                </button>
              ) : (
                !isValue && (
                  <div className="country-added">
                    <input
                      type="text"
                      onKeyDown={onCountryEnterPress}
                      onChange={onCountryNameAdd}
                      value={contryNameState}
                      className="contry-name"
                      placeholder="Type country name"
                    />
                  </div>
                )
              )}
              {isValue && (
                <div className="country-added">
                  <span className="circle-line-added-country"></span>
                  <p className="title-line-added-country">
                    {contryNameState}
                    <button
                      className="close-addCountry-btn"
                      onClick={closeAddCountry}
                    >
                      <img alt="xCircle" src={xCircle} />
                    </button>
                  </p>
                </div>
              )}
            </div>
          )}

          {compareCountryActive === "compareTime" && (
            <div className="Add-country">
              <div className="country">
                <img alt="threeDots" src={threeDots} />
                <p className="title">June, 2022</p>
              </div>

              {!dateValue && (
                <div className="country-time">
                  <button
                    onClick={() => setChooseTime(!chooseTime)}
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
                            onClick={() => setDateValue("July, 2022")}
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
                    <button
                      className="close-addCountry-btn"
                      onClick={() => setDateValue("")}
                    >
                      <img alt="xCircle" src={xCircle} />
                    </button>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="chart">
          {isValue || dateValue ? (
            <div className="bar-chart-line">
              <HighchartsReact
                highcharts={Highcharts}
                options={LineChartBarData}
              />
            </div>
          ) : (
            ""
          )}

          <div
            className={`${
              isValue || dateValue
                ? "line-chart-bar"
                : "line-chart-bar-condition"
            }`}
          >
            <Chart
              show={isValue || dateValue}
              showTime={compareCountryActive === "compareTime"}
            />
          </div>
        </div>
      </div>
      <div>
        {openModal && (
          <Modal linechartModal={openModal} closeModal={setOpenModal} />
        )}
      </div>
    </>
  );
};

export default LineChartData;
