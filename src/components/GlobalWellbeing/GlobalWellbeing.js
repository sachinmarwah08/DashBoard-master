import React, { useEffect, useState } from "react";
import "./GlobalWellbeing.scss";
import axios from "axios";

const GlobalWellbeing = () => {
  const [data, setData] = useState("");
  const [absoluteData, setAbsoluteData] = useState("");

  useEffect(() => {
    const callApi = async () => {
      const digitOne = await axios.get(
        "http://43.204.168.67:8888/api/v1/get-tweet-count-diff?from_date=2022-07-01&to_date=2022-07-26"
      );
      const absolute = await axios.get(
        "http://43.204.168.67:8888/api/v1/get-absolute-tweet-count-diff?from_date=2022-07-01&to_date=2022-07-10"
      );
      setData(digitOne.data);
      setAbsoluteData(absolute.data);
    };
    callApi();
  }, []);

  return (
    <div className="main-container">
      <div className="left-content">
        <h1 className="heading">Global Wellbeing Sentiment Index</h1>
      </div>
      <div className="right-content">
        <div className="right-border"></div>

        <div className="column-one">
          <p className="digit-one">{data.pos_neg_count_diff}</p>
          <p className="value-one">Current Day Value </p>
          <p className="date">As of 20 July, 2022</p>
        </div>

        <div className="column-two">
          <p className="column-two-digit-one">
            {absoluteData.absolute_value_diff}
          </p>
          <p className="value-one-tilte">Absolute Change</p>
        </div>
        <div className="column-two">
          <p className="column-two-digit-one">{absoluteData.persentage}%</p>
          <p className="value-one-tilte">Percentage Change</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalWellbeing;
