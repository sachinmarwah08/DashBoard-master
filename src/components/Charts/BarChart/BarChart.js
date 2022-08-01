import React from "react";
import "./BarChart.scss";
import Highcharts from "highcharts";

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
import Icon from "../../../Images/Dropdown.svg";
import Sort from "../../SortFilter/Sort";
import HighchartsReact from "highcharts-react-official";
import data from "./data";
// import BarGraph from "./BarGraph";

const BarChartComponent = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <h1 className="heading">
          Countries Rankings by Wellbeing Sentiment Score
        </h1>
        <Sort Icon={Icon} />
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
  );
};

export default BarChartComponent;
