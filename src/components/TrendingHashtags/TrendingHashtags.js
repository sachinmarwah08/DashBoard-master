import React from "react";
import "./TrendingHashtags.scss";
import { data } from "./data";

const TrendingHashtags = () => {
  return (
    <div className="trend-wrapper">
      <div className="content">
        <div className="heading">Trending Hashtags</div>
        <div className="hashtags-wrapper">
          {data.map((item) => (
            <div key={item.id} className="hashtags-data">
              {item.hashtags}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingHashtags;
