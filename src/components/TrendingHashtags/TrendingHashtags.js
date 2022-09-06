import React from "react";
import "./TrendingHashtags.scss";
import sentiment from "../../Images/trendingIconOne.svg";
import trending from "../../Images/trendingIconTwo.svg";
import totalUse from "../../Images/trendingIconThree.svg";
import background from "../../Images/hashtag-bg.svg";
// import bubbleChart from "../../Images/Bubble-chart.png";
import Sort from "../SortFilter/Sort";

const TrendingHashtags = () => {
  return (
    <div className="trend-wrapper">
      <div className="content">
        <div className="heading">Trending Hashtags</div>
        <Sort />
        <div className="hashtags-wrapper">
          <div className="left-trending-content">
            <div className="trending-content">
              <img src={sentiment}></img>
              <span className="trending-heading">Sentiment</span>
              <span className="trending-score">204</span>
            </div>
            <div className="trending-content">
              <img src={trending}></img>
              <span className="trending-heading">Trending hashtags</span>
              <span className="trending-score">1,254</span>
            </div>
            <div className="trending-content">
              <img src={totalUse}></img>
              <span className="trending-heading">Total Use</span>
              <span className="trending-score">325</span>
            </div>
          </div>

          <div className="right-trending-content">
            <div className="trending-bubble-content">
              <img className="bg-image" src={background}></img>
              <div className="bubble-one"></div>
              <p className="bubble-one-content">
                <span className="hashtag-title">#wellbeing</span>
              </p>
              <div className="bubble-line-one"></div>
              <div className="bubble-two"></div>
              <p className="bubble-two-content">
                <span className="hashtag-title">#two</span>
              </p>
              <div className="bubble-line-two"></div>
              <div className="bubble-three"></div>
              <p className="bubble-three-content">
                <span className="hashtag-title">#three</span>
              </p>
              <div className="bubble-line-three"></div>
              <div className="bubble-four"></div>
              <p className="bubble-four-content">
                <span className="hashtag-title">#four</span>
              </p>
              <div className="bubble-line-four"></div>
              <div className="bubble-five"></div>
              <p className="bubble-five-content">
                <span className="hashtag-title">#five</span>
              </p>
              <div className="bubble-line-five"></div>
              <div className="bubble-six"></div>
              <p className="bubble-six-content">
                <span className="hashtag-title">#six</span>
              </p>
              <div className="bubble-line-six"></div>
              <div className="bubble-seven"></div>
              <p className="bubble-seven-content">
                <span className="hashtag-title">#seven</span>
              </p>
              <div className="bubble-line-seven"></div>
              <div className="bubble-eight"></div>
              <p className="bubble-eight-content">
                <span className="hashtag-title">#eight</span>
              </p>
              <div className="bubble-line-eight"></div>
              <div className="bubble-nine"></div>
              <p className="bubble-nine-content">
                <span className="hashtag-title">#nine</span>
              </p>
              <div className="bubble-line-nine"></div>
              <div className="bubble-ten"></div>
              <p className="bubble-ten-content">
                <span className="hashtag-title">#ten</span>
              </p>
              <div className="bubble-line-ten"></div>
              <div className="bubble-eleven"></div>
              <p className="bubble-eleven-content">
                <span className="hashtag-title">#eleven</span>
              </p>
              <div className="bubble-line-eleven"></div>
              <div className="bubble-twelve"></div>
              <p className="bubble-twelve-content">
                <span className="hashtag-title">#twelve</span>
              </p>
              <div className="bubble-line-twelve"></div>
              <div className="bubble-thirteen"></div>
              <p className="bubble-thirteen-content">
                <span className="hashtag-title">#thirteen</span>
              </p>
              <div className="bubble-line-thirteen"></div>
              <div className="bubble-fourteen"></div>
              <p className="bubble-fourteen-content">
                <span className="hashtag-title">#fourteen</span>
              </p>
              <div className="bubble-line-fourteen"></div>
              <div className="bubble-fifteen"></div>
              <p className="bubble-fifteen-content">
                <span className="hashtag-title">#fifteen</span>
              </p>
              <div className="bubble-line-fifteen"></div>
              <div className="bubble-sixteen"></div>
              <div className="bubble-seventeen"></div>
              <div className="bubble-eighteen"></div>
              <div className="bubble-nineteen"></div>
              <div className="bubble-twenty"></div>
              <div className="bubble-twentyone"></div>
              <div className="bubble-twentytwo"></div>
              <div className="bubble-twentythree"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingHashtags;
