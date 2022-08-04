import React, { useState } from "react";
import "./LineChart.scss";
import { useLocation, useNavigate } from "react-router-dom";
import downloadIcon from "../../../Images/download.svg";
import shareIcon from "../../../Images/share.svg";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import Header from "../../Header/Header";
import Chart from "./Chart";
import Highcharts from "highcharts";
import { LineChartBarData } from "../BarChart/data";
import HighchartsReact from "highcharts-react-official";
import xCircle from "../../../Images/x-circle.svg";
import threeDots from "../../../Images/threeDots.svg";

const LineChartData = () => {
  const [selected, setSelected] = useState("Past 1 months");
  const [selectCountry, setselectCountry] = useState("Worldwide");
  const dateSelect = ["react ", "vue", "Angular"];
  const countrySelect = ["react ", "vue", "Angular"];
  const [openModal, setOpenModal] = useState(false);
  const router = useLocation();
  const navigate = useNavigate();
  const [addCountry, setaddCountry] = useState(false);
  const [contryNameState, setContryNameState] = useState("");
  const [isValue, setIsValue] = useState(false);

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
                  options={countrySelect}
                  selected={selectCountry}
                  setSelected={setselectCountry}
                />
              </div>
              <div className="select-date-btn">
                <Button
                  options={dateSelect}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </div>
            <div className="right-button">
              <button className="right-ouline-button">
                <FontAwesomeIcon icon={faPlus} />
                Compare country
              </button>
              <button className="right-ouline-buttonTwo">
                <FontAwesomeIcon icon={faPlus} />
                Compare time
              </button>
            </div>
          </div>

          <div className="Add-country">
            <div className="country">
              <img alt="image" src={threeDots} />
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
        </div>
        <div className="chart">
          {isValue ? (
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
              isValue ? "line-chart-bar" : "line-chart-bar-condition"
            }`}
          >
            <Chart show={isValue} />
          </div>
        </div>
      </div>
      <div>{openModal && <Modal closeModal={setOpenModal} />}</div>
    </>
  );
};

export default LineChartData;
