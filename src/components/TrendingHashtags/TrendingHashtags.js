import React, { useState } from "react";
import dropdown from "../../Images/DropdownWhite.svg";
import Sort from "../SortFilter/Sort";
import { trendingHashtags } from "./data";
import "./TrendingHashtags.scss";
import shareIcon from "../../Images/sharetwo.svg";

const TrendingHashtags = () => {
  const trendingData = ["Country", "Influencer", "Hashtag"];
  const [trendData, setTrendData] = useState("Filter");
  return (
    <div className="right-container">
      <div className="heading-content">
        <div className="right-heading">Trending Hashtags</div>
        <div className="icons">
          <p className="score">Sentiment Score</p>
          <img
            alt="dropdown"
            className="dropdown-img-trending"
            src={dropdown}
          />
          <img alt="share-icon" className="share-img" src={shareIcon} />
        </div>
      </div>
      <div className="trending-sort">
        <Sort
          setData={setTrendData}
          data={trendData}
          optiondata={trendingData}
        />
      </div>
      <div className="right-content-wrapper">
        {trendingHashtags.map((item) => (
          <div key={item.id} className="right-content">
            <div key={item.id} className="left-content">
              <p className="id">{item.id}</p>
              <p className="username">{item.hashtags}</p>
              <div className="value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingHashtags;
