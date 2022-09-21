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
} from "recharts";

function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

function twoDecimalPlacesIfCents(amount) {
  return amount % 1 !== 0 ? amount.toFixed(2) : amount;
}

const BarChartData = ({ data }) => {
  function renderTooltip(BarItems) {
    if (BarItems && BarItems.payload && BarItems.payload.length) {
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
                  {BarItems.payload[0].payload.name}
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
                  Index:{" "}
                  <span style={{ color: "#F05728", fontWeight: 600 }}>
                    {kFormatter(BarItems.payload[0].payload.pv)}
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
                  Positive:{" "}
                  <span style={{ color: "#F05728", fontWeight: 600 }}>
                    {twoDecimalPlacesIfCents(BarItems.payload[0].payload.happy)}
                    %
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
                    {twoDecimalPlacesIfCents(
                      BarItems.payload[0].payload.sad_per
                    )}
                    %
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
    <ResponsiveContainer width="100%" height="100%" aspect="auto">
      <BarChart data={data} layout="vertical">
        <XAxis type="number" hide />
        <YAxis
          width={130}
          dataKey="name"
          fill="#212121"
          fontWeight={400}
          fontSize="12px"
          type="category"
        />
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
        <Bar
          cursor="pointer"
          dataKey="pv"
          fill="#F05728"
          radius={[6, 6, 6, 6]}
          opacity={0.35}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartData;
