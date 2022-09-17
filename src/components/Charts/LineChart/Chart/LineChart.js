import React, { useContext } from "react";
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
import { FilterContext } from "../../../../context/FilterContext";

// import { compareCountryData, CompareTime } from "./data";

const Chart = ({
  isValue,
  compareCountryActive,
  compareTimeActive,
  dateValue,
  lineChartData,
  chooseTimeLineChartData,
  selectCountry,
  contryNameState,
}) => {
  const { state } = useContext(FilterContext);
  const { influencerValue, hashtagValue, countryValue, filterActive } =
    state.filters;

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num;
  }

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  function twoDecimalPlacesIfCents(amount) {
    return amount % 1 !== 0 ? amount.toFixed(2) : amount;
  }

  function renderTooltip(item) {
    console.log("item", item);
    if (item && item.payload && item.payload.length) {
      return (
        <div
        // style={{
        //   width: "100%",
        //   display: "flex",
        //   background: "white",
        //   borderRadius: "0.5rem",
        //   flexDirection: "column",
        // }}
        >
          {lineChartData && (
            <>
              <p
                style={{
                  fontSize: "20px",
                  color: "#000000",
                  fontWeight: 700,
                  marginTop: 0,
                  marginBottom: "0.5rem",
                  width: "max-content",
                }}
              >
                {item.payload[0].payload._id}
              </p>

              <div
                style={{
                  fontSize: "20px",
                  color: "#000000",
                  fontWeight: 700,
                  gap: "25px",
                  display: "flex",
                  marginBottom: "0.5rem",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    color: "#939596",
                    width: "max-content",
                  }}
                >
                  {countryValue ? countryValue : selectCountry}
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    color: "#F05728",
                    width: "max-content",
                  }}
                >
                  {kFormatter(item.payload[0].payload.count)}
                </span>
              </div>

              {item.payload[1] && item.payload[1].payload && (
                <div
                  style={{
                    fontSize: "20px",
                    color: "#000000",
                    fontWeight: 700,
                    gap: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#939596",
                      width: "max-content",
                    }}
                  >
                    {contryNameState}
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#2A00FF",
                      width: "max-content",
                    }}
                  >
                    {kFormatter(item.payload[1].payload.compare)}
                  </span>
                </div>
              )}
            </>
          )}

          {/* {chooseTimeLineChartData && (
            <p
              style={{
                fontSize: "20px",
                color: "#000000",
                fontWeight: 700,
                marginTop: 0,
                marginBottom: 0,
                padding: "0.5rem",
              }}
            >
              {item.payload[0].payload.week}
            </p>
          )}

          <div
            style={{
              width: "100%",
              padding: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "20px", color: "#939596", width: "100%" }}>
              {countryValue ? countryValue : selectCountry}
            </span>
            <span style={{ fontSize: "20px", color: "#F05728" }}>
              {twoDecimalPlacesIfCents(item.payload[0].payload.count)}
            </span>
          </div>
          {item.payload[1] && item.payload[1].payload && (
            <div
              style={{
                width: "100%",
                padding: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{ fontSize: "20px", color: "#939596", width: "100%" }}
              >
                {contryNameState}
              </span>
              <span style={{ fontSize: "20px", color: "#2A00FF" }}>
                {twoDecimalPlacesIfCents(item.payload[1].payload.compare)}
              </span>
            </div>
          )} */}
        </div>
      );
    }
    return null;
  }

  console.log("chooseTimeLineChartData", chooseTimeLineChartData);

  return (
    <div style={{ marginTop: "1rem", marginLeft: "1rem" }}>
      <ResponsiveContainer width="100%" aspect={4.2}>
        <LineChart
          data={
            (compareCountryActive && lineChartData) ||
            (compareTimeActive && chooseTimeLineChartData)
          }
          width={600}
          height={50}
          margin={{ top: 50, right: 70, left: 0, bottom: 40 }}
        >
          {/* <PolarGrid strokeDasharray="3 3" /> */}
          {/* <CartesianGrid horizontal={true} vertical={false} /> */}
          <XAxis
            style={{ fontFamily: "Work-Sans" }}
            dataKey={compareTimeActive ? "week" : "_id"}
            stroke="#757575"
            fontWeight={400}
            dy={8}
            fontSize="0.875rem"
            interval={"preserveStartEnd"}
            tickFormatter={(value) => value + ""}
          />
          <YAxis
            style={{ fontFamily: "Work-Sans" }}
            tickFormatter={nFormatter}
            type="number"
            dy={-4}
            domain={["dataMin", "dataMax"]}
            allowDecimals={false}
            scale="auto"
            stroke="#E0E0E0"
          />
          <Tooltip
            content={(item, index) => renderTooltip(item, index)}
            separator=""
            // labelStyle={{
            //   fontWeight: "700",
            //   paddingBottom: "0.5rem",
            //   color: "#000000",
            //   fontSize: "20px",
            //   fontFamily: "Work-Sans",
            //   borderColor: "#757575",
            //   lineHeight: "1.25rem",
            //   borderRadius: "0.5rem",
            // }}
            wrapperStyle={{
              boxShadow:
                "-4px 0px 8px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.5rem",
              zIndex: "99999999999999999999999999999999999999999",
              border: "1px solid #EEEEEE",
              outline: "none",
            }}
          />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="count"
            // dataKey={`${selectCountry}`}
            strokeDasharray="4 4"
            strokeWidth={3}
            stroke="#f05728"
            dot={false}
          />
          {dateValue || isValue ? (
            <Line
              type="monotone"
              dataKey="compare"
              // dataKey={`${contryNameState}`}
              // strokeDasharray="0 3 8 8"
              stroke="#2A00FF"
              strokeWidth={3}
              dot={false}
              // activeDot={{ r: 8 }}
            />
          ) : (
            ""
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
