import React, { useContext, useEffect, useState } from "react";
import "./GlobalWellbeing.scss";
// import moment from "moment";
import {
  getTweetsCount,
  getTweetsDiff,
} from "../../actions/GlobalWellBeingApis";
import infoIcon from "../../Images/info.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../context/FilterContext";
import { BeatLoader } from "react-spinners";

const GlobalWellbeing = () => {
  const { state } = useContext(FilterContext);
  const {
    loaders: { countryLineChartLoading },
    filters: {
      countryValue,
      dateRangeValue: { fromDate, toDate },
    },
  } = state;
  const [data, setData] = useState(0);
  const [absoluteData, setAbsoluteData] = useState({});
  const { absolute_change = 0, persentage = 0 } = absoluteData;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (countryLineChartLoading) {
      const callApi = async () => {
        // let today = Date.now();
        // var check = moment(today);
        // var month = check.format("M");
        // var day = check.format("D");
        // var year = check.format("YYYY");
        // let fromDate = `${year}-${month}-01`;
        // let toDate = `${year}-${month}-${day}`;
        // console.log(month, day, year);

        // let fromDate = "2022-07-01";
        // let toDate = "2022-07-31";

        // let fromDateDiff = "2022-07-01";
        // let toDateDiff = "2022-07-31";

        const response = await getTweetsCount(fromDate, toDate, countryValue);
        const diffRes = await getTweetsDiff(fromDate, toDate, countryValue);

        setData(response.pos_neg_tweet_count);
        setAbsoluteData(diffRes);
        setLoader(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

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

  function twoDecimalPlacesIfCents(amount) {
    return amount % 1 !== 0 ? amount.toFixed(2) : amount;
  }

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  var date = new Date().getDate();
  var year = new Date().getFullYear();

  let monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = new Date().getMonth();
  let monthName = monthsArray[month];

  return (
    <div className="main-container">
      <div className="main-container-wrapper">
        <div className="left-content">
          <div className="insite-left-content">
            <h1 className="heading">Global Wellbeing Index</h1>
            <Tippy
              theme={"light"}
              interactive={true}
              content={
                <div
                  style={{
                    padding: "0.5rem",
                    fontWeight: 400,
                    fontFamily: "Work-Sans",
                    fontSize: "14px",
                  }}
                >
                  <p style={{ fontWeight: 600, marginTop: 0 }}>
                    Global Wellbeing Index
                  </p>
                  This index provides insights on wellbeing rankings by country,
                  top influencers, trending hashtags, tweets, and news stories
                  about wellbeing, as well as categorisation of these into
                  positive and negative sentiment.
                </div>
              }
            >
              <img className="info-icon" src={infoIcon}></img>
            </Tippy>
          </div>
        </div>
        <div className="right-content">
          <div className="right-border"></div>

          <div className="column-one">
            {loader ? (
              <div className="trendingHashtag-loader">
                <BeatLoader color="#F05728" loading={loader} size={10} />
              </div>
            ) : (
              <p className="digit-one">{nFormatter(data)}</p>
            )}

            <Tippy
              theme={"light"}
              interactive={true}
              content={
                <div
                  style={{
                    padding: "0.5rem",
                    fontWeight: 400,
                    fontFamily: "Work-Sans",
                    fontSize: "14px",
                  }}
                >
                  <p style={{ fontWeight: 600, marginTop: 0 }}>
                    Current Day Value
                  </p>
                  This is the global wellbeing index score for the current MTD
                  period.
                </div>
              }
            >
              <p className="value-one">Current Day Value </p>
            </Tippy>

            <p className="date">
              As of {date} {monthName}, {year}
            </p>
          </div>

          <div className="column-two">
            {loader ? (
              <div className="trendingHashtag-loader">
                <BeatLoader color="#F05728" loading={loader} size={10} />
              </div>
            ) : (
              <p className="column-two-digit-one">
                {kFormatter(absolute_change)}
              </p>
            )}

            <Tippy
              theme={"light"}
              interactive={true}
              content={
                <div
                  style={{
                    padding: "0.5rem",
                    fontWeight: 400,
                    fontFamily: "Work-Sans",
                    fontSize: "14px",
                  }}
                >
                  <p style={{ fontWeight: 600, marginTop: 0 }}>
                    Absolute Change
                  </p>
                  This represents the change in the global wellbeing index score
                  from the preceding MTD period.
                </div>
              }
            >
              <p className="value-one-tilte">Absolute Change</p>
            </Tippy>
          </div>
          <div className="column-two">
            {loader ? (
              <div className="trendingHashtag-loader">
                <BeatLoader color="#F05728" loading={loader} size={10} />
              </div>
            ) : (
              <p className="column-two-digit-one">
                {twoDecimalPlacesIfCents(persentage)}%
              </p>
            )}

            <Tippy
              theme={"light"}
              interactive={true}
              content={
                <div
                  style={{
                    padding: "0.5rem",
                    fontWeight: 400,
                    fontFamily: "Work-Sans",
                    fontSize: "14px",
                  }}
                >
                  <p style={{ fontWeight: 600, marginTop: 0 }}>
                    Percentage Change
                  </p>
                  This represents the percentage change in the global wellbeing
                  index score from the preceding MTD period.
                </div>
              }
            >
              <p className="value-one-tilte">Percentage Change</p>
            </Tippy>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalWellbeing;
