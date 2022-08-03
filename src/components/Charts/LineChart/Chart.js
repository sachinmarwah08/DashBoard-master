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
  PolarGrid,
  CartesianGrid,
  // AreaChart,
  // Area,
  // BarChart,
  // Bar,
} from "recharts";
import { data } from "./data";

const Chart = () => {
  const color = {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  };
  return (
    <div>
      {" "}
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          data={data}
          width={600}
          height={100}
          margin={{ top: 50, right: 70, left: 0, bottom: 40 }}
        >
          {/* <PolarGrid strokeDasharray="3 3" /> */}

          {/* <CartesianGrid horizontal={true} vertical={false} /> */}
          <XAxis
            dataKey="name"
            stroke="#757575"
            fontWeight={400}
            fontSize="14px"
            interval={"preserveStartEnd"}
            tickFormatter={(value) => value + ""}
          />
          <YAxis stroke="#E0E0E0" />
          <Tooltip
            separator="         "
            labelStyle={{
              fontWeight: "700",
              color: "##757575",
              fontSize: "20px",
              borderColor: "#757575",
              lineHeight: "20px",
              lineHeight: "28px",
              borderRadius: "8px",
            }}
            wrapperStyle={{
              width: "9rem",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              gap: "10px",
              border: "none",
              outline: "none",
            }}
            itemStyle={{
              gap: "40px",
              color: "#939596",
            }}
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "8px",
              color: "Black",
            }}
          />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="Worldwide"
            strokeDasharray="4 4"
            strokeWidth={3}
            stroke="#F05728"
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
