import React from "react";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts";
// import { LineChartBarData } from "../Chart/data";
import LineChart from "../Chart/LineChart";
import { FadeLoader } from "react-spinners";
import LineBarChart from "../Chart/LineBarChart";

const CompareCountryLineChart = ({
  isValue,
  compareCountryActive,
  barData,
  lineChartData,
  dataForLineBarChart,
  selectCountry,
  contryNameState,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <div className="lineChart-loader">
          <FadeLoader color="#F05728" loading={loading} size={50} />
        </div>
      ) : (
        <>
          {isValue && (
            <div className="bar-chart-line">
              <LineBarChart data={dataForLineBarChart} />
            </div>
          )}
          {compareCountryActive && (
            <div
              className={`${
                isValue ? "line-chart-bar" : "line-chart-bar-condition"
              }`}
            >
              <LineChart
                barData={barData}
                lineChartData={lineChartData}
                isValue={isValue}
                compareCountryActive={compareCountryActive}
                selectCountry={selectCountry}
                contryNameState={contryNameState}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CompareCountryLineChart;
