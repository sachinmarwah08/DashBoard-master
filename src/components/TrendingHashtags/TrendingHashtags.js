import React from "react";
import "./TrendingHashtags.scss";
import { data } from "./data";

const TrendingHashtags = () => {
  return (
    <div className="trend-wrapper">
      <div className="content">
        <div className="heading">Trending Hashtags</div>
        <div className="hashtags-wrapper">
          <ul class="cloud" role="navigation" aria-label="Webdev word cloud">
            {data.map((item) => (
              <li>
                <a href="" data-weight={item.id}>
                  {item.hashtags}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrendingHashtags;
