import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  // AreaChart,
  // Area,
  // BarChart,
  // Bar,
} from "recharts";
import { data } from "./data";

const Chart = () => {
  return (
    <div>
      {" "}
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          data={data}
          width={500}
          height={100}
          margin={{ top: 50, right: 70, left: 0, bottom: 40 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="name"
            interval={"preserveStartEnd"}
            tickFormatter={(value) => value + ""}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              color: "Black",
              outline: "none",
              boxShadow: "black",
              borderRadius: "10px",
            }}
          />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="Worldwide"
            strokeDasharray="4 4"
            strokeWidth={3}
            stroke="red"
            dot={false}
          />
          {/* <Line
            type="monotone"
            dataKey="fees"
            // strokeDasharray="0 3 8 8"
            stroke="#2A00FF"
            strokeWidth={3}
            dot={false}
            // activeDot={{ r: 8 }}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
