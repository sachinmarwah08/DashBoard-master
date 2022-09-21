import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./TrendingHashtags.scss";
// import sentiment from "../../Images/trendingIconOne.svg";
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
import {
  getCountryDropdownData,
  getHashtagDropdownData,
  getInfluencerDropdownData,
} from "../../actions/DropDownApis";
import { BeatLoader } from "react-spinners";

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
  const [inputValue, setInputValue] = useState("");
  const [influencerdata, setInfluencerData] = useState([]);
  const [influencerBackupdata, setInfluencerBackupdata] = useState([]);
  const [hashtagBackupdata, setHashtagBackupdata] = useState([]);
  const [hashtagdropdwon, sethashtagdropdwon] = useState([]);
  const [showInfluencerHashtag, setShowInfluencerHashtag] = useState(false);
  const [countryDataDropdown, setCountryDataDropdown] = useState([]);
  const [countryBackupdata, setCountryBackupdata] = useState([]);
  const [trendingHashtag, setTrendingHashtag] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (countryLineChartLoading) {
      setLoading(true);
      const callApi = async () => {
        // let today = Date.now();
        // var check = moment(today);
        // var month = check.format("M");
        // var day = check.format("D");
        // var year = check.format("YYYY");
        // let fromDate = `${year}-${month}-01`;
        // let toDate = `${year}-${month}-${day}`;
        // console.log(month, day, year);

        const getInfluenser = await getInfluencerDropdownData();
        const hashtagDataResponse = await getHashtagDropdownData();
        const countryDataResponse = await getCountryDropdownData();

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
        } else {
          setTotalCount(0);
          setTotalConnections(0);
          setHashtag([]);
        }
        setCountryDataDropdown(countryDataResponse);
        setCountryBackupdata(countryDataResponse);
        setInfluencerData(getInfluenser);
        setInfluencerBackupdata(getInfluenser);
        sethashtagdropdwon(hashtagDataResponse);
        setHashtagBackupdata(hashtagDataResponse);
        setData(response.records);
        setLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  useEffect(() => {
    const loadUsers = async () => {
      // setLoading(true);
      const countryData = await getCountryDropdownData(page);
      setCountryDataDropdown((prev) => [...prev, ...countryData]);

      const HashtagData = await getHashtagDropdownData(page);
      sethashtagdropdwon((prev) => [...prev, ...HashtagData]);

      const influencerData = await getInfluencerDropdownData(page);
      setInfluencerData((prev) => [...prev, ...influencerData]);
      setLoading(false);
    };
    loadUsers();
  }, [page]);

  const observer = useRef();

  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !inputValue) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  const onInputChange = async (e) => {
    setShowInfluencerHashtag(true);
    setInputValue(e.target.value);
    if (trendingFilter === "Filters") {
      setShowInfluencerHashtag(false);
    }
    let tempData = [...influencerBackupdata];
    let tempHasgtagData = [...hashtagBackupdata];
    let tempCountryData = [...countryBackupdata];
    const newFilter = tempData.filter((value) => {
      return value.toLowerCase().includes(inputValue.toLowerCase());
    });
    const hashtagFilter = tempHasgtagData.filter((value) => {
      return value.toLowerCase().includes(inputValue.toLowerCase());
    });
    const countryFilter = tempCountryData.filter((value) => {
      return value.toLowerCase().includes(inputValue.toLowerCase());
    });
    setCountryDataDropdown(countryFilter);
    sethashtagdropdwon(hashtagFilter);
    setInfluencerData(newFilter);
  };

  const onInfluencerInputChange = async (searchValue) => {
    if (trendingFilter === "Country") {
      setLoading(true);
      const countryData = await getCountryDropdownData(1, searchValue);
      setCountryDataDropdown(countryData);
      setLoading(false);
    }
    if (trendingFilter === "Influencer") {
      setLoading(true);
      const influencerData = await getInfluencerDropdownData(1, searchValue);
      setInfluencerData(influencerData);
      setLoading(false);
    }
    if (trendingFilter === "Hashtag") {
      setLoading(true);
      const hashtagData = await getHashtagDropdownData(1, searchValue);
      sethashtagdropdwon(hashtagData);
      setLoading(false);
    }
  };

  const onFilterDropClick = (option) => {
    setTrendingFilter(option);
  };

  const handleChange = (index) => {
    setTotalCount(data && data.length && data[index].hashtag.count);
    setTotalConnections(data && data.length && data[index].connection);
    setHashtag(data && data.length && data[index].hashtag.htag);
  };

  const onEnterInputClick = async (e) => {
    setShowInfluencerHashtag(false);
    if (e.key === "Enter") {
      setLoading(true);
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      let countryTypedValue = "";
      if (trendingFilter === "Influencer") {
        influencerTypedValue = inputValue;
      }
      if (trendingFilter === "Hashtag") {
        hashtagTypedValue = inputValue;
      }
      if (trendingFilter === "Country") {
        countryTypedValue = inputValue;
      }
      const response = await getTrendingHashtagData(
        fromDate,
        toDate,
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue
      );
      if (response.records && response.records.length) {
        setTotalCount(response.records[0].hashtag.count);
        setTotalConnections(response.records[0].connection);
        setHashtag(response.records[0].hashtag.htag);
      }

      const responseBubbleChart = await getTrendingHashtagData(
        fromDate,
        toDate,
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue
      );
      let tempData = [...responseBubbleChart.records];

      if (!trendingFilter === "Influencer") {
        tempData.sort((a, b) => b.hashtag.count - a.hashtag.count);
      }

      if (!trendingFilter === "Hashtag") {
        tempData.sort((a, b) => b.hashtag.count - a.hashtag.count);
      }

      if (!trendingFilter === "Country") {
        tempData.sort((a, b) => b.hashtag.count - a.hashtag.count);
      }

      setTrendingHashtag(tempData);
      setData(response.records);
      setLoading(false);
    }
  };

  const onDropDownClick = async (val) => {
    setInputValue(val);
    setShowInfluencerHashtag(false);
    setLoading(true);
    let influencerTypedValue = "";
    let hashtagTypedValue = "";
    let countryTypedValue = "";
    if (trendingFilter === "Influencer") {
      influencerTypedValue = inputValue;
    }
    if (trendingFilter === "Hashtag") {
      hashtagTypedValue = inputValue;
    }
    if (trendingFilter === "Country") {
      countryTypedValue = inputValue;
    }
    const response = await getTrendingHashtagData(
      fromDate,
      toDate,
      countryTypedValue,
      influencerTypedValue,
      hashtagTypedValue
    );
    if (response.records && response.records.length) {
      setTotalCount(response.records[0].hashtag.count);
      setTotalConnections(response.records[0].connection);
      setHashtag(response.records[0].hashtag.htag);
    }
    setData(response.records);
    setLoading(false);
  };

  return (
    <>
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
            influencerdata={
              (trendingFilter === "Influencer" && influencerdata) ||
              (trendingFilter === "Hashtag" && hashtagdropdwon) ||
              (trendingFilter === "Country" && countryDataDropdown)
            }
            data={trendingFilter}
            setData={onFilterDropClick}
            dropdownOptions={realTimeData}
            onchange={onInputChange}
            onEnterInputClick={onEnterInputClick}
            onDropDownClick={onDropDownClick}
            inputValue={inputValue}
            showInfluencerHashtag={showInfluencerHashtag}
            value={inputValue}
            lastUserRef={lastUserRef}
            onSearch={onInfluencerInputChange}
          />
          <div className="hashtags-wrapper">
            <div className="left-trending-content">
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
                {loading ? (
                  <BeatLoader color="#F05728" loading={loading} size={10} />
                ) : (
                  <span className="trending-score">
                    {kFormatter(totalCount)}
                  </span>
                )}
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
                      This widget shows the frequency with which {hashtag} is
                      used in association with other trending hashtags.
                    </div>
                  }
                >
                  <img src={totalUse}></img>
                </Tippy>

                <span className="trending-heading">Total Connections</span>
                {loading ? (
                  <BeatLoader color="#F05728" loading={loading} size={10} />
                ) : (
                  <span className="trending-score">
                    {kFormatter(totalConnections)}
                  </span>
                )}
              </div>
            </div>

            <div className="right-trending-content">
              <BubbleChart
                trendingHashtag={trendingHashtag}
                setTrendingHashtag={setTrendingHashtag}
                handleChange={handleChange}
                loading={loading}
                setLoading={setLoading}
                trendingFilter={trendingFilter}
              />
            </div>
          </div>

          <p className="note">
            * Clicking on the hashtag bubble will provide insights about its
            usage and connections
          </p>
        </div>
      </div>
    </>
  );
};

export default TrendingHashtags;
