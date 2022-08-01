import React from "react";
import Bar from "./Bar";

const BarGraph = (props) => {
  const { data } = props;
  let barArray = [];

  Object.keys(data).forEach((key) => {
    barArray.push(
      <Bar
        label={key}
        width={`${(data[key] / sum(Object.values(data))) * 200}vw`}
      />
    );
  });

  return barArray;
};

function sum(data) {
  return data.reduce((a, b) => parseInt(a) + parseInt(b), 0);
}

BarGraph.defaultProps = {
  data: {
    Sweden: 100000,
    Belgium: 15000,
    Hungary: 20000,
    Austria: 40000,
    Denmark: 70000,
    Lithuania: 95000,
    Japan: 65000,
    Latvia: 25000,
    Luxembourg: 85000,
    Malta: 35000,
    Africa: 45000,
    WHOGeneva: 95000,
  },
};

export default BarGraph;
