import React, { useState } from "react";
import "./RealTimeFeeds.scss";
import { data } from "./data";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Content from "./Content";
import shareIcon from "../../Images/share.svg";

const RealTimeFeeds = () => {
  const [filterData, setFilterData] = useState(data);
  const [wordEntered, setWordEntered] = useState("");
  const [active, setActive] = useState("Real-time-Tweets");

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
          <img src={shareIcon} />
        </div>
      </div>
      <div className="radio-button">
        <div>
          <label className="container">
            <p className="positive">Positive</p>
            <input type="radio" checked="checked" name="radio" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="second-container">
          <label className="container">
            <p className="positive">Negative</p>
            <input type="radio" checked="checked" name="radio" />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
      <div className="search-container">
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
            <FontAwesomeIcon
              className="search-icon-image"
              icon={faMagnifyingGlass}
            />
          )}
        </div>
      </div>
      {active === "Real-time-Tweets" && <Content filterData={filterData} />}
      {active === "Real-time-News" && <Content filterData={filterData} />}
    </div>
  );
};

export default RealTimeFeeds;
