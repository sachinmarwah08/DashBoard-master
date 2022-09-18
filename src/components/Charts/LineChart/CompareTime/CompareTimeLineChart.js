import React from "react";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts";
// import { LineChartBarData } from "../Chart/data";
import LineBarChart from "../Chart/LineBarChart";
import LineChart from "../Chart/LineChart";

const CompareTimeLineChart = ({
  dateValue,
  compareTimeActive,
  chooseTimeLineChartData,
  chooseTimeBarDataState,
  selectCountry,
  contryNameState,
}) => {
  return (
    <>
      {/* {dateValue && (
        <div className="bar-chart-line">
          <LineBarChart />
        </div>
      )} */}
      {compareTimeActive && (
        <div
          className={`${
            dateValue ? "line-chart-bar" : "line-chart-bar-condition"
          }`}
        >
          <LineChart
            dateValue={dateValue}
            compareTimeActive={compareTimeActive}
            chooseTimeLineChartData={chooseTimeLineChartData}
            selectCountry={selectCountry}
            contryNameState={contryNameState}
          />
        </div>
      )}
    </>
  );
};

export default CompareTimeLineChart;
