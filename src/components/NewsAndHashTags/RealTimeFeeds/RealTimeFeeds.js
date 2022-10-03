import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import "./RealTimeFeeds.scss";
import RealTimeFeed from "./Content/RealTimeContent";
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
import moment from "moment";

const RealTimeFeeds = () => {
  const myRefNew = useRef(null);
  const myRefNewFeed = useRef(null);
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
  const [active, setActive] = useState("Real-time-Tweets");
  const realTimeData =
    active === "Real-time-Tweets"
      ? ["Country", "Influencer", "Hashtag"]
      : ["Country"];
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
  const [page, setPage] = useState(1);

  const [dropPage, setDropPage] = useState(1);
  const [dropLoading, setDropLoading] = useState(false);

  const [lastPageForNews, setLastPageForNews] = useState(100);
  const [lastPageFortweets, setLastPageFortweets] = useState(100);

  useEffect(() => {
    if (countryLineChartLoading) {
      const callApi = async () => {
        setLoading(true);

        let sentiment = "ALL";
        let newsSentiment = "ALL";

        let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
          ? false
          : null;

        const tweetsCountResponse = await getSocialMediaFlashes(
          fromDate,
          toDate,
          sentiment,
          countryValue,
          influencerValue,
          hashtagValue,
          page,
          c
        );

        const newsCountResponse = await newsFlashes(
          fromDate,
          toDate,
          newsSentiment,
          countryValue,
          influencerValue,
          hashtagValue,
          page,
          c
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
        setLastPageForNews(newsCountResponse.total_page);
        setTweets(tweetsCountResponse.records);
        setLastPageFortweets(tweetsCountResponse.total_page);
        setTweetsDataBackup(tweetsCountResponse.records);
        setGlobalBackupData(tweetsCountResponse.records);
        setNewsDataBackup(newsCountResponse.records);
        setLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  useEffect(() => {
    const loadUsers = async () => {
      console.log("cccccccccccc");
      setLoading(true);
      let sentiment = "ALL";
      let newsSentiment = "ALL";

      if (isRadioChecked === 2) {
        sentiment = "Positive";
      } else if (isRadioChecked === 3) {
        sentiment = "Negative";
      }

      if (isRadioChecked === 2) {
        newsSentiment = "Positive";
      } else if (isRadioChecked === 3) {
        newsSentiment = "Negative";
      }

      let countryTypedValue = "";
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      if (realData === "Influencer") {
        influencerTypedValue = inputValue;
      }
      if (realData === "Hashtag") {
        hashtagTypedValue = inputValue;
      }
      if (realData === "Country") {
        countryTypedValue = inputValue;
      }

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;
      if (page < lastPageFortweets) {
        console.log("in tweete");
        const tweetsCountResponse = await getSocialMediaFlashes(
          fromDate,
          toDate,
          sentiment,
          countryTypedValue || countryValue,
          influencerTypedValue || influencerValue,
          hashtagTypedValue || hashtagValue,
          page,
          c
        );

        if (page === 1) {
          setTweets(tweetsCountResponse.records);
          setLastPageFortweets(tweetsCountResponse.total_page);

          // setNewsFeed(newsCountResponse.records);
        } else {
          setTweets((prev) => [...prev, ...tweetsCountResponse.records]);
          setLastPageFortweets(tweetsCountResponse.total_page);

          // setNewsFeed((prev) => [...prev, ...newsCountResponse.records]);
        }
      }

      if (page < lastPageForNews) {
        console.log("in news");
        const newsCountResponse = await newsFlashes(
          fromDate,
          toDate,
          newsSentiment,
          countryTypedValue || countryValue,
          influencerTypedValue || influencerValue,
          hashtagTypedValue || hashtagValue,
          page,
          c
        );
        if (page === 1) {
          // setTweets(tweetsCountResponse.records);
          setNewsFeed(newsCountResponse.records);
          setLastPageForNews(newsCountResponse.total_page);
        } else {
          // setTweets((prev) => [...prev, ...tweetsCountResponse.records]);
          setNewsFeed((prev) => [...prev, ...newsCountResponse.records]);
          setLastPageForNews(newsCountResponse.total_page);
        }
      }

      setLoading(false);
    };

    if (page) {
      loadUsers();
    }
  }, [page]);

  useEffect(() => {
    const loadUsers = async () => {
      // setLoading(true);
      const countryData = await getCountryDropdownData(dropPage);
      setCountryDataDropdown((prev) => [...prev, ...countryData]);

      const HashtagData = await getHashtagDropdownData(dropPage);
      sethashtag((prev) => [...prev, ...HashtagData]);

      const influencerData = await getInfluencerDropdownData(dropPage);
      setInfluencerData((prev) => [...prev, ...influencerData]);
      setLoading(false);
    };
    loadUsers();
  }, [dropPage]);

  const observer = useRef();
  const lastUserRef = useCallback(
    (node) => {
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkklll");
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          active === "Real-time-Tweets" &&
          entries[0].isIntersecting &&
          tweets &&
          tweets.length > 3 &&
          page < lastPageFortweets
        ) {
          console.log("kya hal jh");
          setPage((page) => page + 1);
        }
        if (
          active === "Real-time-News" &&
          entries[0].isIntersecting &&
          newsFeed &&
          newsFeed.length > 3 &&
          page < lastPageForNews
        ) {
          console.log("kya hal jh han");
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const dropObserver = useRef();
  const lastDropRef = useCallback(
    (node) => {
      if (dropLoading) return;
      if (dropObserver.current) dropObserver.current.disconnect();
      dropObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setDropPage((page) => page + 1);
        }
      });
      if (node) dropObserver.current.observe(node);
    },
    [dropLoading]
  );

  const handleRadioChange = async (value) => {
    myRefNew.current.scrollTo(0, 0);
    // myRefNewFeed.current.scrollTo(0, 0);
    // setLoading(true);
    setPage(null);
    setLastPageForNews(100);
    setLastPageFortweets(100);
    let countryTypedValue = "";
    let influencerTypedValue = "";
    let hashtagTypedValue = "";
    if (realData === "Influencer") {
      influencerTypedValue = inputValue;
    }
    if (realData === "Hashtag") {
      hashtagTypedValue = inputValue;
    }
    if (realData === "Country") {
      countryTypedValue = inputValue;
    }

    let sentiment = "ALL";
    if (value === 2) {
      sentiment = "Positive";
    } else if (value === 3) {
      sentiment = "Negative";
    }

    let newsSentiment = "ALL";
    if (value === 2) {
      newsSentiment = "Positive";
    } else if (value === 3) {
      newsSentiment = "Negative";
    }

    setIsRadioChecked(value);

    // const newsCountResponse = await newsFlashes(
    //   fromDate,
    //   toDate,
    //   newsSentiment,
    //   countryTypedValue || countryValue,
    //   influencerTypedValue || influencerValue,
    //   hashtagTypedValue || hashtagValue
    // );

    // const tweetsCountResponse = await getSocialMediaFlashes(
    //   fromDate,
    //   toDate,
    //   sentiment,
    //   countryTypedValue || countryValue,
    //   influencerTypedValue || influencerValue,
    //   hashtagTypedValue || hashtagValue
    // );

    // setNewsFeed(newsCountResponse.records);
    // setTweets(tweetsCountResponse.records);
    setTimeout(() => {
      setPage(1);
    }, 0);
    // setLoading(false);
  };

  const handleFilter = (e) => {
    console.log("in filter change");
    setInputValue(e.target.value);
    setShowInfluencerHashtag(true);
    // setLoading(true);
    if (realData === "Filters") {
      setShowInfluencerHashtag(false);
      // setLoading(false);
      let tempData = [...newDataBackup];

      const newFilter = tempData.filter((value) => {
        return (
          value.headline.toLowerCase().includes(inputValue.toLowerCase()) ||
          // value.htag.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.news_source.toLowerCase().includes(inputValue.toLowerCase())
        );
      });

      setNewsFeed(newFilter);
      // setLoading(false);
    }
    if (realData === "Filters") {
      let tempData = [...globalBackupData];

      const newFilter = tempData.filter((value) => {
        return (
          value.username.toLowerCase().includes(inputValue.toLowerCase()) ||
          // value.htag.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.events.toLowerCase().includes(inputValue.toLowerCase()) ||
          value.url.toLowerCase().includes(inputValue.toLowerCase())
        );
      });
      setTweets(newFilter);
    } else {
      let tempDatadrodown = [...influencerBackupdata];
      let tempHasgtagData = [...hashtagBackupdata];
      let tempCountryData = [...countryBackupdata];

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
      setLoading(false);
    }
  };

  const onInfluencerInputChange = async (searchValue) => {
    if (realData === "Country") {
      // setLoading(true);
      const countryData = await getCountryDropdownData(1, searchValue);
      setCountryDataDropdown(countryData);
      setLoading(false);
    }
    if (realData === "Influencer") {
      // setLoading(true);
      const influencerData = await getInfluencerDropdownData(1, searchValue);
      setInfluencerData(influencerData);
      setLoading(false);
    }
    if (realData === "Hashtag") {
      // setLoading(true);
      const hashtagData = await getHashtagDropdownData(1, searchValue);
      sethashtag(hashtagData);
      setLoading(false);
    }
  };

  const onEnterInputClick = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      setShowInfluencerHashtag(false);
      let countryTypedValue = "";
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      if (realData === "Influencer") {
        influencerTypedValue = inputValue;
      }
      if (realData === "Hashtag") {
        hashtagTypedValue = inputValue;
      }
      if (realData === "Country") {
        countryTypedValue = inputValue;
      }

      let sentiment = "ALL";
      let newsSentiment = "ALL";

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      const tweetsCountResponse = await getSocialMediaFlashes(
        fromDate,
        toDate,
        sentiment,
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue,
        1,
        c
      );

      const newsCountResponse = await newsFlashes(
        fromDate,
        toDate,
        newsSentiment,
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue,
        1,
        c
      );

      setPage(1);
      setNewsFeed(newsCountResponse.records);
      setTweets(tweetsCountResponse.records);
      // setTweetsDataBackup(tweetsCountResponse.records);
      setLoading(false);
    }
  };

  const onDropDownClick = async (val) => {
    // setLoading(true);
    myRefNew.current.scrollTo(0, 0);
    setInputValue(val);
    setShowInfluencerHashtag(false);
    let countryTypedValue = "";
    let influencerTypedValue = "";
    let hashtagTypedValue = "";
    if (realData === "Influencer") {
      influencerTypedValue = val;
    }
    if (realData === "Hashtag") {
      hashtagTypedValue = val;
    }
    if (realData === "Country") {
      countryTypedValue = val;
    }
    let sentiment = "ALL";

    let newsSentiment = "ALL";

    let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
      ? false
      : null;

    // const tweetsCountResponse = await getSocialMediaFlashes(
    //   fromDate,
    //   toDate,
    //   sentiment,
    //   countryTypedValue,
    //   influencerTypedValue,
    //   hashtagTypedValue,
    //   1,
    //   c
    // );

    // const newsCountResponse = await newsFlashes(
    //   fromDate,
    //   toDate,
    //   newsSentiment,
    //   countryTypedValue,
    //   influencerTypedValue,
    //   hashtagTypedValue,
    //   1,
    //   c
    // );

    setPage(null);
    // setNewsFeed(newsCountResponse.records);
    // setTweets(tweetsCountResponse.records);
    // setTweetsDataBackup(tweetsCountResponse.records);
    setTimeout(() => {
      setPage(1);
    }, 0);
    setLoading(false);
  };

  const clearData = () => {
    myRefNew.current.scrollTo(0, 0);
    setRealData("Filter");
    setTweets(globalBackupData);
    setNewsFeed(newDataBackup);
    setInputValue("");
    setPage(null);
    setTimeout(() => {
      setPage(1);
    }, 0);

    setLastPageForNews(100);
    setLastPageFortweets(100);
  };

  const onFilterDropClick = (option) => {
    console.log("hii");
    console.log(option);
    // myRefNew.current.scrollTo(0, 0);
    setRealData(option);
    // setPage(null);
    // setTimeout(() => {
    //   setPage(1);
    // }, 0);
    // setLoading(false);
    // setLastPageForNews(100);
    // setLastPageFortweets(100);
  };

  return (
    <div className="left-container">
      <div className="main-heading">
        <button
          onClick={() => {
            setActive("Real-time-Tweets");
            setPage(null);
            setTimeout(() => {
              setPage(1);
            }, 0);
          }}
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
          lastUserRef={lastUserRef}
          onSearch={onInfluencerInputChange}
          lastDropRef={lastDropRef}
        />
      </div>

      {active === "Real-time-Tweets" && (
        <RealTimeFeed
          lastUserRef={lastUserRef}
          filterData={tweets}
          loading={loading}
          ref={myRefNew}
        />
      )}

      {active === "Real-time-News" && (
        <NewsFeed
          lastUserRef={lastUserRef}
          filterData={newsFeed}
          loading={loading}
          ref={myRefNew}
        />
      )}
    </div>
  );
};

export default RealTimeFeeds;
