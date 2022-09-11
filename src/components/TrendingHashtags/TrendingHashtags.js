import React, { useContext, useEffect, useState } from "react";
import "./TrendingHashtags.scss";
import sentiment from "../../Images/trendingIconOne.svg";
import trending from "../../Images/trendingIconTwo.svg";
import totalUse from "../../Images/trendingIconThree.svg";
import Sort from "../SortFilter/Sort";
import BubbleChart from "./BubbleChart";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import infoIcon from "../../Images/info.svg";
import { getTrendingHashtagData } from "../../actions/TrendingHashtagsApis";
import { FilterContext } from "../../context/FilterContext";

const TrendingHashtags = () => {
  const { state } = useContext(FilterContext);
  const {
    loaders: { countryLineChartLoading },
    filters: {
      countryValue,
      influencerValue,
      hashtagValue,
      dateRangeValue: { fromDate, toDate },
    },
  } = state;
  const [trendingFilter, setTrendingFilter] = useState("Filters");
  const realTimeData = ["Country", "Influencer", "Hashtag"];
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [totalConnections, setTotalConnections] = useState("");
  const [hashtag, setHashtag] = useState("");

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

        const response = await getTrendingHashtagData(
          fromDate,
          toDate,
          countryValue,
          influencerValue,
          hashtagValue
        );
        if (response.records && response.records.length) {
          setTotalCount(response.records[0].hashtag.count);
          setTotalConnections(response.records[0].connection);
          setHashtag(response.records[0].hashtag.htag);
        }

        setData(response.records);
        // console.log(response.records, "trending hashtag");
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  const handleChange = (index) => {
    setTotalCount(data && data.length && data[index].hashtag.count);
    setTotalConnections(data && data.length && data[index].connection);
    setHashtag(data && data.length && data[index].hashtag.htag);
  };

  return (
    <div className="trend-wrapper">
      <div className="content">
        <div className="heading">
          Trending Hashtags
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
                  Trending Hashtags
                </p>
                This graph displays the top trending hashtags used in tweets
                about wellbeing along with their associations.
              </div>
            }
          >
            <img className="info-icon" src={infoIcon}></img>
          </Tippy>
        </div>
        <Sort
          data={trendingFilter}
          setData={setTrendingFilter}
          dropdownOptions={realTimeData}
        />
        <div className="hashtags-wrapper">
          <div className="left-trending-content">
            {/* <div className="trending-content">
              <img src={sentiment}></img>
              <span className="trending-heading">Hashtag</span>
              <span className="trending-score">
                {data && data.length && data[0].hashtag.htag}
              </span>
            </div> */}
            <div className="trending-content">
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
                    <p style={{ fontWeight: 600, marginTop: 0 }}>Total Use</p>
                    This widget shows how often {hashtag} appears in various
                    tweets about wellbeing.
                  </div>
                }
              >
                <img src={trending}></img>
              </Tippy>
              <span className="trending-heading">Total Use</span>
              <span className="trending-score">{totalCount}</span>
            </div>
            <div className="trending-content">
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
                      Total Connections
                    </p>
                    This widget shows the frequency with which {hashtag} is used
                    in association with other trending hashtags.
                  </div>
                }
              >
                <img src={totalUse}></img>
              </Tippy>

              <span className="trending-heading">Total Connections</span>
              <span className="trending-score">{totalConnections}</span>
            </div>
          </div>

          <div className="right-trending-content">
            <BubbleChart handleChange={handleChange} />
          </div>
        </div>
        <p className="note">
          * Clicking on the hashtag bubble will provide insights about its usage
          and connections
        </p>
      </div>
    </div>
  );
};

export default TrendingHashtags;
