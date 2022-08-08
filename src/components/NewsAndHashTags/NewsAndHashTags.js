import React from "react";
import "./NewsAndHashTags.scss";
import RealTimeFeeds from "./RealTimeFeeds/RealTimeFeeds";
import TopInfluencer from "./TopInfluencer/TopInfluencer";

const NewsAndHashTags = () => {
  return (
    <div className="whole-wrapper">
      <div className="big-wrapper">
        <TopInfluencer />
        <RealTimeFeeds />
      </div>
    </div>
  );
};

export default NewsAndHashTags;
