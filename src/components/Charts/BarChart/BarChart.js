import React, { useEffect, useState } from "react";
import "./BarChart.scss";
import Highcharts from "highcharts";
import Sort from "../../SortFilter/Sort";
import HighchartsReact from "highcharts-react-official";
import Bardata from "./data";
import shareIcon from "../../../Images/share-2.svg";
import TopBottomButton from "../../TopBottomButton/TopBottomButton";
import { getBarData } from "../../../actions/BarChartApis";

const BarChartComponent = () => {
  const [data, setData] = useState({});
  const barData = ["Influencer", "Hashtag"];
  const [bardata, setBardata] = useState("Filter");
  const topBottomData = ["Top 10", "Bottom 10"];
  const [topBottom, setTopBottom] = useState("Top 10");

  useEffect(() => {
    const callApi = async () => {
      // let today = Date.now();
      // var check = moment(today);
      // var month = check.format("M");
      // var day = check.format("D");
      // var year = check.format("YYYY");
      // let fromDate = `${year}-${month}-01`;
      // let toDate = `${year}-${month}-${day}`;
      // console.log(month, day, year);

      let fromDate = "2022-06-01";
      let toDate = "2022-07-31";

      const response = await getBarData(fromDate, toDate);

      let tempData = JSON.parse(JSON.stringify(Bardata));

      for (let i = 0; i < response.data.length; i++) {
        tempData.xAxis.categories.push(response.data[i]._id);
        tempData.series[0].data.push(Math.floor(response.data[i].count));
        tempData.tooltip.pointFormat = `</strong><br/>Happy: <strong>${response.data[i].happy}</strong><br/>Sad: <strong>${response.data[i].sad_per}</strong>`;
      }

      setData(tempData);
    };
    callApi();
  }, []);

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
              <button className="share-btn">
                <img
                  className="share-icon-bar"
                  alt="share-icon-bar"
                  src={shareIcon}
                />
              </button>
            </div>
          </div>
          <div className="filter-container">
            <TopBottomButton
              setTopBottom={setTopBottom}
              topBottomData={topBottomData}
              topBottom={topBottom}
            />
            <Sort
              setData={setBardata}
              data={bardata}
              dropdownOptions={barData}
            />
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
