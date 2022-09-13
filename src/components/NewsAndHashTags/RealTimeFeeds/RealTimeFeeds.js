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
import {
  getCountryDropdownData,
  getHashtagDropdownData,
  getInfluencerDropdownData,
} from "../../../actions/DropDownApis";

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
  const [newDataBackup, setNewsDataBackup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tweetsDataBackup, setTweetsDataBackup] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [influencerdata, setInfluencerData] = useState([]);
  const [influencerBackupdata, setInfluencerBackupdata] = useState([]);
  const [hashtagBackupdata, setHashtagBackupdata] = useState([]);
  const [hashtag, sethashtag] = useState([]);
  const [showInfluencerHashtag, setShowInfluencerHashtag] = useState(false);
  const [countryDataDropdown, setCountryDataDropdown] = useState([]);
  const [countryBackupdata, setCountryBackupdata] = useState([]);
  const [globalBackupData, setGlobalBackupData] = useState([]);
  // const [influencerCountDataBackup, setInfluencerCountDataBackup] = useState(0);

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

  const handleFilter = (e) => {
    setInputValue(e.target.value);
    if (realData === "Filters") {
      let tempData = [...newDataBackup];
      console.log("influencerDataBackup", newDataBackup);
      const newFilter = tempData.filter((value) => {
        return (
          value.headline.toLowerCase().includes(inputValue.toLowerCase()) ||
          // value.htag.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.news_source.toLowerCase().includes(inputValue.toLowerCase())
        );
      });
      console.log("newFilter", newFilter);
      setNewsFeed(newFilter);
    }
    if (realData === "Filters") {
      let tempData = [...globalBackupData];
      console.log("influencerDataBackup", tweetsDataBackup);
      const newFilter = tempData.filter((value) => {
        return (
          value.username.toLowerCase().includes(inputValue.toLowerCase()) ||
          // value.htag.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.events.toLowerCase().includes(inputValue.toLowerCase()) ||
          value.url.toLowerCase().includes(inputValue.toLowerCase())
        );
      });
      console.log("newFilter", newFilter);
      setTweets(newFilter);
    } else {
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      let countryTypedValue = "";
      if (realData === "Influencer") {
        influencerTypedValue = inputValue;
        setShowInfluencerHashtag(true);
      }
      if (realData === "Hashtag") {
        hashtagTypedValue = inputValue;
        setShowInfluencerHashtag(true);
      }
      if (realData === "Country") {
        countryTypedValue = inputValue;
        setShowInfluencerHashtag(true);
      }
      let tempDatadrodown = [...influencerBackupdata];
      let tempHasgtagData = [...hashtagBackupdata];
      let tempCountryData = [...countryBackupdata];
      // let tempData = [...tweetsDataBackup];
      // const newFilter = tempData.filter((value) => {
      //   return (
      //     value.username.toLowerCase().includes(tempData.toLowerCase()) ||
      //     // value.htag.toLowerCase().includes(searchWord.toLowerCase()) ||
      //     value.events.toLowerCase().includes(tempData.toLowerCase()) ||
      //     value.url.toLowerCase().includes(tempData.toLowerCase())
      //   );
      // });
      const influencerFilter = tempDatadrodown.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      const hashtagFilter = tempHasgtagData.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      const countryFilter = tempCountryData.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      setCountryDataDropdown(countryFilter);
      sethashtag(hashtagFilter);
      setInfluencerData(influencerFilter);
      // setTweets(newFilter);
    }
  };

  const clearData = () => {
    setRealData("Filter");
    setTweets(globalBackupData);
    setNewsFeed(newDataBackup);
    setInputValue("");
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
          influencerValue,
          hashtagValue
        );

        const newsCountResponse = await newsFlashes(
          fromDate,
          toDate,
          newsSentiment,
          countryValue,
          influencerValue,
          hashtagValue
        );
        const getInfluenser = await getInfluencerDropdownData();
        const hashtagDataResponse = await getHashtagDropdownData();
        const countryDataResponse = await getCountryDropdownData();

        setCountryDataDropdown(countryDataResponse);
        setCountryBackupdata(countryDataResponse);
        setInfluencerData(getInfluenser);
        setInfluencerBackupdata(getInfluenser);
        sethashtag(hashtagDataResponse);
        setHashtagBackupdata(hashtagDataResponse);
        setNewsFeed(newsCountResponse.records);
        setTweets(tweetsCountResponse.records);
        setTweetsDataBackup(tweetsCountResponse.records);
        setGlobalBackupData(tweetsCountResponse.records);
        setNewsDataBackup(newsCountResponse.records);
        setLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  const onFilterDropClick = (option) => {
    setRealData(option);
  };

  const onEnterInputClick = async (e) => {
    if (e.key === "Enter") {
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      let countryTypedValue = "";
      if (realData === "Influencer") {
        influencerTypedValue = inputValue;
      }
      if (realData === "Hashtag") {
        hashtagTypedValue = inputValue;
      }
      if (realData === "Country") {
        countryTypedValue = inputValue;
      }
      let sentiment = "All";

      // let newsFromDate = "2022-07-01";
      // let newsToDate = "2022-07-31";
      let newsSentiment = "All";

      const tweetsCountResponse = await getSocialMediaFlashes(
        fromDate,
        toDate,
        sentiment,
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue
      );

      const newsCountResponse = await newsFlashes(
        fromDate,
        toDate,
        newsSentiment,
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue
      );
      setNewsFeed(newsCountResponse.records);
      setTweets(tweetsCountResponse.records);
      setTweetsDataBackup(tweetsCountResponse.records);
    }
  };

  const onDropDownClick = async (val) => {
    setInputValue(val);
    setShowInfluencerHashtag(false);
    let influencerTypedValue = "";
    let hashtagTypedValue = "";
    let countryTypedValue = "";
    if (realData === "Influencer") {
      influencerTypedValue = val;
    }
    if (realData === "Hashtag") {
      hashtagTypedValue = val;
    }
    if (realData === "Country") {
      countryTypedValue = val;
    }
    let sentiment = "All";

    // let newsFromDate = "2022-07-01";
    // let newsToDate = "2022-07-31";
    let newsSentiment = "All";

    const tweetsCountResponse = await getSocialMediaFlashes(
      fromDate,
      toDate,
      sentiment,
      countryTypedValue,
      influencerTypedValue,
      hashtagTypedValue
    );

    const newsCountResponse = await newsFlashes(
      fromDate,
      toDate,
      newsSentiment,
      countryTypedValue,
      influencerTypedValue,
      hashtagTypedValue
    );
    setNewsFeed(newsCountResponse.records);
    setTweets(tweetsCountResponse.records);
    setTweetsDataBackup(tweetsCountResponse.records);
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
                You can access the tweet of interest based on its sentiment by
                clicking on it.
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
                You can access the news of interest based on its sentiment by
                clicking on it.
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
          influencerdata={
            (realData === "Influencer" && influencerdata) ||
            (realData === "Hashtag" && hashtag) ||
            (realData === "Country" && countryDataDropdown)
          }
          clearData={clearData}
          filterData={inputValue}
          setData={onFilterDropClick}
          dropdownOptions={realTimeData}
          onchange={handleFilter}
          data={realData}
          onEnterInputClick={onEnterInputClick}
          onDropDownClick={onDropDownClick}
          inputValue={inputValue}
          showInfluencerHashtag={showInfluencerHashtag}
          value={inputValue}
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
