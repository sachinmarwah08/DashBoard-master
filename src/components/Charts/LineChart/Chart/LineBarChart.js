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

const barColors = ["#F05728", "#2A00FF"];

function ParseFloat(str, val) {
  str = str.toString();
  str = str.slice(0, str.indexOf(".") + val + 1);
  return Number(str);
}

const LineBarChart = ({ data }) => {
  function renderTooltip(BarLineChartItems) {
    console.log("BarItemCompareCountry", BarLineChartItems);
    if (
      BarLineChartItems &&
      BarLineChartItems.payload &&
      BarLineChartItems.payload.length
    ) {
      return (
        <div
          style={{
            width: "100%",
          }}
        >
          {data && (
            <>
              <div
                style={{
                  borderRadius: "14px",
                  marginBottom: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    color: "#212121",
                    fontWeight: 700,
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                >
                  {BarLineChartItems.payload[0].payload.name}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    marginTop: "0.5rem",
                    color: "#212121",
                    fontWeight: 500,
                    marginBottom: 0,
                  }}
                >
                  Positive:{" "}
                  <span style={{ color: "#F05728", fontWeight: 600 }}>
                    {ParseFloat(BarLineChartItems.payload[0].payload.pv, 2)}%
                  </span>
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    marginTop: "0.5rem",
                    color: "#212121",
                    fontWeight: 500,
                    marginBottom: 0,
                  }}
                >
                  Negative:{" "}
                  <span style={{ color: "#F05728", fontWeight: 600 }}>
                    {ParseFloat(BarLineChartItems.payload[0].payload.sad, 2)}%
                  </span>
                </span>
              </div>
            </>
          )}
        </div>
      );
    }
    return null;
  }
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
            content={(item, index) => renderTooltip(item, index)}
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
