import React, { useEffect, useState } from "react";
import "./GlobalWellbeing.scss";
// import moment from "moment";
import {
  getTweetsCount,
  getTweetsDiff,
} from "../../actions/GlobalWellBeingApis";

const GlobalWellbeing = () => {
  const [data, setData] = useState(0);
  const [absoluteData, setAbsoluteData] = useState({});
  const { absolute_change = 0, persentage = 0 } = absoluteData;

  useEffect(() => {
    const callApi = async () => {
      // let today = Date.now();
      // var check = moment(today);
      // var month = check.format("M");
      // var day = check.format("D");
      // var year = check.format("YYYY");
      // let fromDate = `${year}-${month}-01`;
      // let toDate = `${year}-${month}-${day}`;
      // console.log(month, day, year);

      let fromDate = "2022-07-01";
      let toDate = "2022-07-26";

      let fromDateDiff = "2022-07-01";
      let toDateDiff = "2022-07-10";

      const response = await getTweetsCount(fromDate, toDate);
      const diffRes = await getTweetsDiff(fromDateDiff, toDateDiff);

      setData(response.pos_neg_tweet_count);
      setAbsoluteData(diffRes);
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
          <p className="digit-one">{data}</p>
          <p className="value-one">Current Day Value </p>
          <p className="date">As of 27 August, 2022</p>
        </div>

        <div className="column-two">
          <p className="column-two-digit-one">{absolute_change}</p>
          <p className="value-one-tilte">Absolute Change</p>
        </div>
        <div className="column-two">
          <p className="column-two-digit-one">{persentage}%</p>
          <p className="value-one-tilte">Percentage Change</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalWellbeing;
