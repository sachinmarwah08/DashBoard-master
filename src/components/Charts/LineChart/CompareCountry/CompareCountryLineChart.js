import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { LineChartBarData } from '../Chart/data';
import LineChart from '../Chart/LineChart';

const CompareCountryLineChart = ({
  isValue,
  compareCountryActive,
  barData,
  lineChartData,
  dataForLineBarChart,
  selectCountry,
  contryNameState,
}) => {
  // console.log(dataForLineBarChart, "linebAr");
  return (
    <>
      {isValue && (
        <div className="bar-chart-line">
          <HighchartsReact
            highcharts={Highcharts}
            options={dataForLineBarChart}
          />
        </div>
      )}
      {compareCountryActive && (
        <div
          className={`${
            isValue ? 'line-chart-bar' : 'line-chart-bar-condition'
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
  );
};

export default CompareCountryLineChart;
