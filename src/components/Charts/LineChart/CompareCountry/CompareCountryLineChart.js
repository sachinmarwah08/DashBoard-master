import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { LineChartBarData } from "./data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
  // PolarGrid,
  // CartesianGrid,
  // AreaChart,
  // Area,
  // BarChart,
  // Bar,
} from "recharts";
import { compareCountryData } from "./data";

const CompareCountryLineChart = ({ isValue, compareCountryActive, value }) => {
  return (
    <>
      {isValue && (
        <div className="bar-chart-line">
          <HighchartsReact highcharts={Highcharts} options={LineChartBarData} />
        </div>
      )}
      {compareCountryActive && (
        <div
          className={`${
            isValue ? "line-chart-bar" : "line-chart-bar-condition"
          }`}
        >
          <div style={{ marginTop: "1rem" }}>
            <ResponsiveContainer width="100%" aspect={4}>
              {compareCountryActive && (
                <LineChart
                  data={compareCountryData}
                  width={600}
                  height={50}
                  margin={{ top: 50, right: 70, left: 0, bottom: 40 }}
                >
                  {/* <PolarGrid strokeDasharray="3 3" /> */}

                  {/* <CartesianGrid horizontal={true} vertical={false} /> */}
                  <XAxis
                    dataKey="name"
                    stroke="#757575"
                    fontWeight={400}
                    fontSize="0.875rem"
                    interval={"preserveStartEnd"}
                    tickFormatter={(value) => value + ""}
                  />
                  <YAxis stroke="#E0E0E0" />
                  <Tooltip
                    separator="         "
                    labelStyle={{
                      fontWeight: "700",
                      width: "8rem",
                      color: "#14144B",
                      fontSize: "15px",
                      borderColor: "#757575",
                      lineHeight: "1.25rem",
                      borderRadius: "0.5rem",
                    }}
                    wrapperStyle={{
                      width: "9rem",
                      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                      borderRadius: "0.5rem",
                      gap: "0.625rem",
                      border: "none",
                      outline: "none",
                    }}
                    itemStyle={{
                      gap: "2.5rem",
                      color: "#939596",
                    }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "0.5rem",
                      color: "Black",
                    }}
                  />
                  {/* <Legend /> */}
                  <Line
                    type="monotone"
                    dataKey="Worldwide"
                    strokeDasharray="4 4"
                    strokeWidth={3}
                    stroke="#f05728"
                    dot={false}
                  />
                  {isValue && (
                    <Line
                      type="monotone"
                      dataKey="India"
                      // strokeDasharray="0 3 8 8"
                      stroke="#2A00FF"
                      strokeWidth={3}
                      dot={false}
                      // activeDot={{ r: 8 }}
                    />
                  )}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CompareCountryLineChart;
