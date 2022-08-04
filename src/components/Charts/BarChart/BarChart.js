import React, { useState } from "react";
import "./BarChart.scss";
import Highcharts from "highcharts";
import filterBarLogo from "../../../Images/filter.svg";
import SortDown from "../../../Images/bi-sort-down.svg";
import SortDownFilter from "../../../Images/bi-sort-down-alt.svg";
// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Rectangle,
// } from "recharts";

import Sort from "../../SortFilter/Sort";
import HighchartsReact from "highcharts-react-official";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "./data";
// import BarGraph from "./BarGraph";
import shareIcon from "../../../Images/share.svg";
import Modal from "../../Modal/Modal";
const BarChartComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const barData = ["Influencer", "Hashtag"];
  const [bardata, setBardata] = useState("Filter");
  const [barOpenModal, setBarOpenModal] = useState(false);

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <h1 className="heading">
            Countries Rankings by Wellbeing Sentiment Score
            <button
              onClick={() => setIsActive(!isActive)}
              className="heading-button"
            >
              <FontAwesomeIcon icon={faAngleDown} />

              {isActive && (
                <div className="dropdown-bar-filter">
                  <div className="dropdown-item">
                    High to Low <img src={SortDown} />
                  </div>
                  <div className="dropdown-item">
                    Low to High <img src={SortDownFilter} />
                  </div>
                </div>
              )}
            </button>
            <button
              //  onClick={setBarOpenModal(true)}
              className="share-btn"
            >
              <img src={shareIcon} />
            </button>
          </h1>
          {/* <Sort Icon={Icon} /> */}
          <Sort setData={setBardata} data={bardata} optiondata={barData} />
        </div>
        <div className="bar-chart-wrapper">
          <div className="chart-bar">
            <HighchartsReact highcharts={Highcharts} options={data} />
            {/* <BarGraph /> */}
            {/* {data.map((item) => (
            <div className="chart-content">
              <div className="country">{item.name}</div>
              <div className="bar"></div>
            </div>
          ))} */}

            {/* <ResponsiveContainer height={data.length * 50 + 10}> */}
            {/* <BarChart
              width={600}
              height={100}
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 0 }}
            > */}
            {/* <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide /> */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            {/* <Tooltip /> */}
            {/* <Legend /> */}
            {/* <Bar radius={[0, 10, 10, 0]} dataKey="pv" fill="#FFB800" /> */}
            {/* </BarChart> */}
            {/* </ResponsiveContainer> */}
          </div>
        </div>
      </div>
      {/* {barOpenModal && <Modal />} */}
    </>
  );
};

export default BarChartComponent;
