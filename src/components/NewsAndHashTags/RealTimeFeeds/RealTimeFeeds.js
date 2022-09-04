import React, { useState, useEffect } from "react";
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

const RealTimeFeeds = () => {
  const [wordEntered, setWordEntered] = useState("");
  const [active, setActive] = useState("Real-time-Tweets");
  const realTimeData = ["Influencer", "hashtags"];
  const [realData, setRealData] = useState("Filter");
  const [isRadioChecked, setIsRadioChecked] = useState(1);
  const [tweets, setTweets] = useState([]);
  const [newsFeed, setNewsFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tweetsDataBackup, setTweetsDataBackup] = useState([]);

  const handleRadioChange = async (value) => {
    setLoading(true);
    let tweetsFromDate = "2022-07-01";
    let tweetsToDate = "2022-07-31";
    let sentiment = "All";
    if (value === 2) {
      sentiment = "Positive";
    } else if (value === 3) {
      sentiment = "Negative";
    }

    let newsFromDate = "2022-07-01";
    let newsToDate = "2022-07-31";
    let newsSentiment = "All";
    if (value === 2) {
      newsSentiment = "Positive";
    } else if (value === 3) {
      newsSentiment = "Negative";
    }

    setIsRadioChecked(value);

    const newsCountResponse = await newsFlashes(
      newsFromDate,
      newsToDate,
      newsSentiment
    );
    setNewsFeed(newsCountResponse.records);

    const tweetsCountResponse = await getSocialMediaFlashes(
      tweetsFromDate,
      tweetsToDate,
      sentiment
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
    const callApi = async () => {
      // let today = Date.now();
      // var check = moment(today);
      // var month = check.format("M");
      // var day = check.format("D");
      // var year = check.format("YYYY");
      // let fromDate = `${year}-${month}-01`;
      // let toDate = `${year}-${month}-${day}`;
      // console.log(month, day, year);

      let tweetsFromDate = "2022-07-01";
      let tweetsToDate = "2022-07-31";
      let sentiment = "All";

      let newsFromDate = "2022-07-01";
      let newsToDate = "2022-07-31";
      let newsSentiment = "All";

      const tweetsCountResponse = await getSocialMediaFlashes(
        tweetsFromDate,
        tweetsToDate,
        sentiment
      );

      const newsCountResponse = await newsFlashes(
        newsFromDate,
        newsToDate,
        newsSentiment
      );

      setNewsFeed(newsCountResponse.records);
      setTweets(tweetsCountResponse.records);
      setTweetsDataBackup(tweetsCountResponse.records);
      setLoading(false);
    };
    callApi();
  }, []);

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
          <div className="tweets-heading">Real-time Tweets</div>
        </button>
        <button
          onClick={() => setActive("Real-time-News")}
          className={` ${
            active === "Real-time-News"
              ? "second-colored-heading"
              : "second-heading"
          }`}
        >
          <div className="tweets-heading">Real-time News</div>
        </button>
        <div className="share-icon-btn">
          <img className="share-icon" alt="share-icon" src={shareIcon} />
        </div>
      </div>
      <div className="realTime-radioBtn">
        <RadioButton
          radioName="realTimeTweets"
          name="All Sentiment"
          checked={isRadioChecked}
          value={1}
          onchange={handleRadioChange}
        />
        <RadioButton
          radioName="realTimeTweets"
          name="Positive Sentiment"
          checked={isRadioChecked}
          value={2}
          onchange={handleRadioChange}
        />
        <RadioButton
          radioName="realTimeTweets"
          name="Negative Sentiment"
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
