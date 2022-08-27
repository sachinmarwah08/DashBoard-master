import React, { useState } from "react";
import "./LineChart.scss";
import { useLocation, useNavigate } from "react-router-dom";
import downloadIcon from "../../../Images/download-2.svg";
import shareIcon from "../../../Images/share-3.svg";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountryAndDateButton from "./Buttons/CountryAndDateButton/Button";
import Modal from "../../Modal/Modal";
import Header from "../../Layouts/Header/Header";
import Chart from "./Chart";
import Highcharts from "highcharts";
import { LineChartBarData } from "./data";
import HighchartsReact from "highcharts-react-official";
import CountryAndTimeButton from "./Buttons/CountryAndTimeButton/Button";
import CompareCountry from "./CompareCountry/CompareCountry";
import CompareTime from "./CompareTime/CompareTime";

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

          {/* DATE AND COUNTRY BUTTONS */}

          <div className="buttons">
            <div className="left-button">
              <div className="select-country-btn">
                <CountryAndDateButton
                  disabled={isValue}
                  options={countrySelect}
                  selected={selectCountry}
                  setSelected={setselectCountry}
                />
              </div>
              <div className="select-date-btn">
                <CountryAndDateButton
                  disabled={dateValue}
                  options={dateSelect}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </div>

            {/* COMPARE COUNTRY AND COMPARE TIME BUTTONS */}

            <div className="right-button">
              <CountryAndTimeButton
                onClick={() => setCompareCountryActive("compareCountry")}
                compareCountryActive={compareCountryActive}
                value="compareCountry"
                name="Compare Country"
              />

              <CountryAndTimeButton
                onClick={() => setCompareCountryActive("compareTime")}
                compareCountryActive={compareCountryActive}
                value="compareTime"
                name="Compare Time"
              />
            </div>
          </div>

          {!compareCountryActive ? <div className="border"></div> : null}

          {/* COMPARE COUNTRY */}

          {compareCountryActive === "compareCountry" && (
            <CompareCountry
              title={"Worldwide"}
              addCountry={addCountry}
              AddCountryonClick={() => setaddCountry(!addCountry)}
              closeAddCountry={closeAddCountry}
              addCountryClickName="Add country"
              isValue={isValue}
              onKeyDown={onCountryEnterPress}
              onChange={onCountryNameAdd}
              value={contryNameState}
            />
          )}

          {/* COMPARE TIME */}

          {compareCountryActive === "compareTime" && (
            <CompareTime
              title={"June, 2022"}
              dateValue={dateValue}
              chooseTimeClick={() => setChooseTime(!chooseTime)}
              chooseTime={chooseTime}
              chooseTimeDropdownClick={() => setDateValue("July, 2022")}
              setDateClick={() => setDateValue("")}
            />
          )}
        </div>

        {/* BAR CHART */}

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

          {/* LINE CHART */}

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

      {/* MODAL */}

      <div>
        {openModal && (
          <Modal linechartModal={openModal} closeModal={setOpenModal} />
        )}
      </div>
    </>
  );
};

export default LineChartData;
