import React, { useState, useEffect, useContext } from "react";
import "./RealTimeFeeds.scss";
import RealTimeFeed from "./Content/RealTimeContent";
import shareIcon from "../../../Images/share-2.svg";
import Sort from "../../SortFilter/Sort";
import RadioButton from "../../RadioButton/RadioButton";
import {
  getSocialMediaFlashes,
  newsFlashes,
} from "../../../actions/RealTimeFeedsApis";
import NewsFeed from "./Content/NewsFeedContent";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../../context/FilterContext";

const RealTimeFeeds = () => {
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
  const [wordEntered, setWordEntered] = useState("");
  const [active, setActive] = useState("Real-time-Tweets");
  const realTimeData = ["Country", "Influencer", "Hashtag"];
  const [realData, setRealData] = useState("Filters");
  const [isRadioChecked, setIsRadioChecked] = useState(1);
  const [tweets, setTweets] = useState([]);
  const [newsFeed, setNewsFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tweetsDataBackup, setTweetsDataBackup] = useState([]);

  const handleRadioChange = async (value) => {
    setLoading(true);
    // let tweetsFromDate = "2022-07-01";
    // let tweetsToDate = "2022-07-31";
    let sentiment = "All";
    if (value === 2) {
      sentiment = "Positive";
    } else if (value === 3) {
      sentiment = "Negative";
    }

    // let newsFromDate = "2022-07-01";
    // let newsToDate = "2022-07-31";
    let newsSentiment = "All";
    if (value === 2) {
      newsSentiment = "Positive";
    } else if (value === 3) {
      newsSentiment = "Negative";
    }

    setIsRadioChecked(value);

    const newsCountResponse = await newsFlashes(
      fromDate,
      toDate,
      newsSentiment,
      countryValue,
      influencerValue,
      hashtagValue
    );
    setNewsFeed(newsCountResponse.records);

    const tweetsCountResponse = await getSocialMediaFlashes(
      fromDate,
      toDate,
      sentiment,
      countryValue,
      influencerValue,
      hashtagValue
    );
    setTweets(tweetsCountResponse.records);
    setLoading(false);
  };

  const handleFilter = (event) => {
    let tempData = [...tweetsDataBackup];
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = tempData.filter((value) => {
      return (
        value.username.toLowerCase().includes(searchWord.toLowerCase()) ||
        // value.htag.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.events.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.url.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    setTweets(newFilter);
  };

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

        // let tweetsFromDate = "2022-07-01";
        // let tweetsToDate = "2022-07-31";
        let sentiment = "All";

        // let newsFromDate = "2022-07-01";
        // let newsToDate = "2022-07-31";
        let newsSentiment = "All";

        const tweetsCountResponse = await getSocialMediaFlashes(
          fromDate,
          toDate,
          sentiment,
          countryValue,
          influencerValue
        );

        const newsCountResponse = await newsFlashes(
          fromDate,
          toDate,
          newsSentiment,
          countryValue,
          influencerValue
        );

        setNewsFeed(newsCountResponse.records);
        setTweets(tweetsCountResponse.records);
        setTweetsDataBackup(tweetsCountResponse.records);
        setLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  const clearData = () => {
    setTweets(tweetsDataBackup);
    setWordEntered("");
  };

  return (
    <div className="left-container">
      <div className="main-heading">
        <button
          onClick={() => setActive("Real-time-Tweets")}
          className={` ${
            active === "Real-time-Tweets" ? "colored-heading" : "heading"
          }`}
        >
          <Tippy
            theme={"light"}
            interactive={true}
            content={
              <div
                style={{
                  textAlign: "left",
                  padding: "0.5rem",
                  fontWeight: 400,
                  fontFamily: "Work-Sans",
                  fontSize: "14px",
                }}
              >
                <p style={{ fontWeight: 600, marginTop: 0 }}>
                  Real-time Tweets
                </p>
                You can access the tweet of interest based on its emotional
                context by clicking on it.
              </div>
            }
          >
            <div className="tweets-heading">Real-time Tweets</div>
          </Tippy>
        </button>
        <button
          onClick={() => setActive("Real-time-News")}
          className={` ${
            active === "Real-time-News"
              ? "second-colored-heading"
              : "second-heading"
          }`}
        >
          <Tippy
            theme={"light"}
            interactive={true}
            content={
              <div
                style={{
                  textAlign: "left",
                  padding: "0.5rem",
                  fontWeight: 400,
                  fontFamily: "Work-Sans",
                  fontSize: "14px",
                }}
              >
                <p style={{ fontWeight: 600, marginTop: 0 }}>Real-time News</p>
                You can access the news of interest based on its emotional
                context by clicking on it.
              </div>
            }
          >
            <div className="tweets-heading">Real-time News</div>
          </Tippy>
        </button>
        {/* <div className="share-icon-btn">
          <img className="share-icon" alt="share-icon" src={shareIcon} />
        </div> */}
      </div>
      <div className="realTime-radioBtn">
        <RadioButton
          radioName="realTimeTweets"
          name="All"
          checked={isRadioChecked}
          value={1}
          onchange={handleRadioChange}
        />
        <RadioButton
          radioName="realTimeTweets"
          name="Positive"
          checked={isRadioChecked}
          value={2}
          onchange={handleRadioChange}
        />
        <RadioButton
          radioName="realTimeTweets"
          name="Negative"
          checked={isRadioChecked}
          value={3}
          onchange={handleRadioChange}
        />
      </div>

      <div className="search-container-wrapper">
        <Sort
          clearData={clearData}
          filterData={tweets.length === 0}
          setData={setRealData}
          data={realData}
          dropdownOptions={realTimeData}
          value={wordEntered}
          onchange={handleFilter}
        />
      </div>

      {active === "Real-time-Tweets" && (
        <RealTimeFeed filterData={tweets} loading={loading} />
      )}
      {active === "Real-time-News" && (
        <NewsFeed filterData={newsFeed} loading={loading} />
      )}
    </div>
  );
};

export default RealTimeFeeds;
