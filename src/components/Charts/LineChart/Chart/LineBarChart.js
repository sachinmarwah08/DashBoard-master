import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const barColors = ["#2A00FF", "#F05728"];

const LineBarChart = ({ data }) => {
  return (
    <div style={{ width: "8rem", height: "12rem" }}>
      <ResponsiveContainer width="100%" height="100%" aspect="auto">
        <BarChart
          barCategoryGap={-0.0}
          barGap={40}
          data={data}
          layout="horizontal"
        >
          <XAxis
            dataKey="name"
            fill="#212121"
            fontWeight={400}
            fontSize="12px"
            type="category"
            hide
          />
          <YAxis type="number" hide />
          <Tooltip
            wrapperStyle={{
              boxShadow: " 0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "14px",
              zIndex: "99999999999999999999999999999999999999999",
              border: "1px solid #939596",
              outline: "none",
            }}
            // content={(item, index) => renderTooltip(item, index)}
            cursor={{ fill: "transparent" }}
          />
          <Bar cursor="pointer" dataKey="pv">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineBarChart;
