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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
];

const barColors = ["#F05728", "#2A00FF"];

const LineBarChart = () => {
  return (
    <div style={{ width: " 10%", height: "30vh" }}>
      <ResponsiveContainer width="100%" height="100%" aspect="auto">
        <BarChart
          barCategoryGap={-0.0}
          barGap={40}
          data={data}
          layout="horizontal"
        >
          <XAxis
            // width={130}
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
