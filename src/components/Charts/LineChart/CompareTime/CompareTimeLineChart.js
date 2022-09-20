import React from "react";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts";
// import { LineChartBarData } from "../Chart/data";
import LineBarChart from "../Chart/LineBarChart";
import LineChart from "../Chart/LineChart";
import { FadeLoader } from "react-spinners";

const CompareTimeLineChart = ({
  dateValue,
  compareTimeActive,
  chooseTimeLineChartData,
  chooseTimeBarDataState,
  selectCountry,
  contryNameState,
  loading,
}) => {
  return (
    <>
      {dateValue && (
        <div className="bar-chart-line">
          <LineBarChart />
        </div>
      )}
      {compareTimeActive && (
        <div
          className={`${
            dateValue ? "line-chart-bar" : "line-chart-bar-condition"
          }`}
        >
          {loading ? (
            <div className="linechart-loader">
              <FadeLoader color="#F05728" loading={loading} size={50} />
            </div>
          ) : (
            <LineChart
              dateValue={dateValue}
              compareTimeActive={compareTimeActive}
              chooseTimeLineChartData={chooseTimeLineChartData}
              selectCountry={selectCountry}
              contryNameState={contryNameState}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CompareTimeLineChart;
