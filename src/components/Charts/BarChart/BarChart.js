import React, { useState } from "react";
import "./BarChart.scss";
import Highcharts from "highcharts";
import Sort from "../../SortFilter/Sort";
import HighchartsReact from "highcharts-react-official";
import {
  faAngleDown,
  faArrowDownShortWide,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "./data";
import shareIcon from "../../../Images/share-2.svg";
import TopBottomButton from "../../TopBottomButton/TopBottomButton";

const BarChartComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const barData = ["Influencer", "Hashtag"];
  const [bardata, setBardata] = useState("Filter");

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="bar-heading-wrapper">
            <div className="heading-left">
              <h1 className="heading">
                Countries Rankings by Wellbeing Sentiment Score
              </h1>
            </div>
            <div className="btn-share">
              {/* <button
                onClick={() => setIsActive(!isActive)}
                className="heading-button"
              >
                <FontAwesomeIcon icon={faAngleDown} />
                {isActive && (
                  <div className="dropdown-bar-filter">
                    <div className="dropdown-item">
                      High to Low <FontAwesomeIcon icon={faArrowUpWideShort} />
                    </div>
                    <div className="dropdown-item">
                      Low to High
                      <FontAwesomeIcon icon={faArrowDownShortWide} />
                    </div>
                  </div>
                )}
              </button> */}
              <button className="share-btn">
                <img alt="share-icon-bar" src={shareIcon} />
              </button>
            </div>
          </div>
          <div className="filter-container">
            <TopBottomButton />
            <Sort setData={setBardata} data={bardata} optiondata={barData} />
          </div>
        </div>
        <div className="bar-chart-wrapper">
          <div className="chart-bar">
            <HighchartsReact highcharts={Highcharts} options={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChartComponent;
