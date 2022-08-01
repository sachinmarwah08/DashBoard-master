import React from "react";
import "./Bar.scss";

const Bar = (props) => {
  const { label, height, fill, fillOpacity, width } = props;
  return (
    <div className="bar-container-svg">
      <div className="country-name">{label}</div>
      <div className="colored-bar">
        <svg
          style={{ borderRadius: "6px" }}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width={width}
            height={height}
            fill={fill}
            fillOpacity={fillOpacity}
          />
        </svg>
      </div>
    </div>
  );
};

Bar.defaultProps = {
  label: "label",
  height: 40,
  width: 100,
  fill: "#F05728",
  fillOpacity: "0.35",
};

export default Bar;
