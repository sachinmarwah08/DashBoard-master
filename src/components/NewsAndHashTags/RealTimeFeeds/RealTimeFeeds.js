import React, { useState } from "react";
import "./RealTimeFeeds.scss";
import { data } from "./data";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Content from "./Content";
import shareIcon from "../../../Images/share.svg";
import Sort from "../../SortFilter/Sort";
import RadioButton from "../../RadioButton/RadioButton";

const RealTimeFeeds = () => {
  const [filterData, setFilterData] = useState(data);
  const [wordEntered, setWordEntered] = useState("");
  const [active, setActive] = useState("Real-time-Tweets");
  const realTimeData = ["Influencer", "hashtags"];
  const [realData, setRealData] = useState("Filter");
  const [isRadioChecked, setIsRadioChecked] = useState(1);

  const handleRadioChange = (value) => {
    setIsRadioChecked(value);
    console.log(value);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return (
        value.heading.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.userName.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.colredHeading.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.hashtags.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.coloredHastags.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.link.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    setFilterData(newFilter);
  };

  const clearData = () => {
    setFilterData(data);
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
          <img alt="share-icon" src={shareIcon} />
        </div>
      </div>
      <div className="realTime-radioBtn">
        <RadioButton
          radioName="realTimeTweets"
          name="Positive"
          checked={isRadioChecked}
          value={1}
          onchange={handleRadioChange}
        />
        <RadioButton
          radioName="realTimeTweets"
          name="Negative"
          checked={isRadioChecked}
          value={2}
          onchange={handleRadioChange}
        />
      </div>

      <div className="search-container-wrapper">
        {/* <div className="search-container">
          <input
            onChange={handleFilter}
            value={wordEntered}
            className="seacrh-bar"
            type="text"
            name="search"
            placeholder="search..."
          />
          <div className="search-icon">
            {filterData.length === 0 ? (
              <FontAwesomeIcon
                onClick={clearData}
                className="close-icon-image"
                icon={faXmark}
              />
            ) : (
              <img className="search-icon-image" src={searchBarLogo} />
            )}
          </div>
        </div>
        <button className="filter-button">
          <img src={filterBarLogo} />
          <div className="filter-title">Filter</div>
        </button> */}
        <Sort
          setData={setRealData}
          data={realData}
          optiondata={realTimeData}
          value={wordEntered}
          onchange={handleFilter}
        />
      </div>

      {active === "Real-time-Tweets" && <Content filterData={filterData} />}
      {active === "Real-time-News" && <Content filterData={filterData} />}
    </div>
  );
};

export default RealTimeFeeds;
