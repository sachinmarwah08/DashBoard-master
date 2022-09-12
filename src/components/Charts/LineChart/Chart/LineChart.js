import React from "react";
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

  // const DataFormater = (number) => {
  //   if(number > 1000000000){
  //     return (number/1000000000).toString() + 'B';
  //   }else if(number > 1000000){
  //     return (number/1000000).toString() + 'M';
  //   }else if(number > 1000){
  //     return (number/1000).toString() + 'K';
  //   }else{
  //     return number.toString();
  //   }
  // }

  function renderTooltip(item) {
    console.log("item", item);
    return <div>Custom content</div>;
  }

  console.log("chooseTimeLineChartData", chooseTimeLineChartData);

  return (
    <div style={{ marginTop: "1rem" }}>
      <ResponsiveContainer
        width="100%"
        aspect={isValue || dateValue ? 3.6 : 4.2}
      >
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
            fontSize="0.875rem"
            interval={"preserveStartEnd"}
            tickFormatter={(value) => value + ""}
          />
          <YAxis
            style={{ fontFamily: "Work-Sans" }}
            tickFormatter={nFormatter}
            type="number"
            domain={["dataMin", "dataMax"]}
            allowDecimals={false}
            scale="auto"
            stroke="#E0E0E0"
          />
          <Tooltip
            // content={(item, index) => renderTooltip(item, index)}
            separator=""
            labelStyle={{
              fontWeight: "700",
              paddingBottom: "0.5rem",
              color: "#000000",
              fontSize: "20px",
              fontFamily: "Work-Sans",
              borderColor: "#757575",
              lineHeight: "1.25rem",
              borderRadius: "0.5rem",
            }}
            wrapperStyle={{
              boxShadow:
                "-4px 0px 8px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.5rem",
              gap: "0.625rem",
              border: "1px solid #EEEEEE",
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
            dataKey={`${selectCountry}`}
            strokeDasharray="4 4"
            strokeWidth={3}
            stroke="#f05728"
            dot={false}
          />
          {dateValue || isValue ? (
            <Line
              type="monotone"
              dataKey={`${contryNameState}`}
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
