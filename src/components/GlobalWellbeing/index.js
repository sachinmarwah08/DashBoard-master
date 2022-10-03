import React, { useContext, useEffect, useState } from "react";
import "./GlobalWellbeing.scss";
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
import moment from "moment";

const GlobalWellbeing = () => {
  const { state } = useContext(FilterContext);
  const {
    loaders: { countryLineChartLoading },
    filters: {
      countryValue,
      influencerValue,
      hashtagValue,
      dateRangeValue: { fromDate, toDate },
    },
    applyClicked,
  } = state;
  const [data, setData] = useState(0);
  const [absoluteData, setAbsoluteData] = useState({});
  const { absolute_change = 0, persentage = 0 } = absoluteData;
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (countryLineChartLoading) {
      const callApi = async () => {
        setLoader(true);

        let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
          ? false
          : null;

        const response = await getTweetsCount(
          fromDate,
          toDate,
          countryValue,
          influencerValue,
          hashtagValue,
          c
        );
        const diffRes = await getTweetsDiff(
          fromDate,
          toDate,
          countryValue,
          influencerValue,
          hashtagValue,
          c
        );

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

  var year = new Date().getFullYear();
  let formatDate = moment().subtract(1, "days").format("DD");
  let formatMonth = moment().subtract(1, "days").format("MMMM");

  return (
    <div className="main-container">
      <div className="main-container-wrapper">
        <div className="left-content">
          <div className="insite-left-content">
            <h1 className="heading">Global Wellbeing Sentiment Analysis</h1>
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
                    Global Wellbeing Sentiment Analysis
                  </p>
                  This dashboard provides insights on wellbeing rankings by
                  country, top influencers, trending hashtags, tweets, and news
                  stories about wellbeing, as well as categorisation of these
                  into positive and negative sentiment.
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
                  This is the count of positive and negative wellbeing stories
                  from Twitter and News media for the current MTD period.
                </div>
              }
            >
              <p className="value-one">Current Day Value </p>
            </Tippy>

            {!applyClicked && (
              <p className="date">
                As of {formatDate} {formatMonth}, {year}
              </p>
            )}

            {applyClicked && (
              <div style={{ display: "flex", width: "100%" }}>
                {fromDate && (
                  <p style={{ marginRight: "0.3rem" }} className="date">
                    As of {moment(fromDate).format("DD MMM")}
                  </p>
                )}

                {toDate && (
                  <p className="date">
                    {" "}
                    - {moment(toDate).format("DD MMM, YYYY")}
                  </p>
                )}
              </div>
            )}
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
                  This represents the change in the count of positive and
                  negative wellbeing stories on Twitter and News media from the
                  preceding MTD period.
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
                  This represents the percentage change in the count of positive
                  and negative wellbeing stories on Twitter and News media from
                  the preceding MTD period.
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
