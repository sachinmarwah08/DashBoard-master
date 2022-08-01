import React from "react";
import "./NewsAndHashTags.scss";
import RealTimeFeeds from "../RealTimeFeeds/RealTimeFeeds";
import TrendingHashtags from "../TrendingHashtags/TrendingHashtags";

const NewsAndHashTags = () => {
  return (
    <div className="whole-wrapper">
      <div className="big-wrapper">
        <RealTimeFeeds />
        <TrendingHashtags />
      </div>
    </div>
  );
};

export default NewsAndHashTags;
