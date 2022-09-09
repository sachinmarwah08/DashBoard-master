import React, { useEffect, useState } from "react";
import { getTrendingHashtagData } from "../../actions/TrendingHashtagsApis";
import background from "../../Images/hashtag-bg.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import Bubble from "./Bubble";

const BubbleChart = ({ handleChange }) => {
  const [trendingHashtag, setTrendingHashtag] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      // let today = Date.now();
      // var check = moment(today);
      // var month = check.format("M");
      // var day = check.format("D");
      // var year = check.format("YYYY");
      // let fromDate = `${year}-${month}-01`;
      // let toDate = `${year}-${month}-${day}`;
      // console.log(month, day, year);

      let fromDate = "2022-06-01";
      let toDate = "2022-07-31";

      const response = await getTrendingHashtagData(fromDate, toDate);
      let tempData = [...response.records];
      tempData.sort((a, b) => b.hashtag.count - a.hashtag.count);

      setTrendingHashtag(tempData);
    };
    callApi();
  }, []);

  return (
    <div className="trending-bubble-content">
      <img className="bg-image" src={background}></img>

      <Bubble
        name="one"
        index={0}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="two"
        index={3}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="three"
        index={2}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="four"
        index={4}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="five"
        index={5}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="six"
        index={6}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="seven"
        index={1}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="eight"
        index={12}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="nine"
        index={13}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="ten"
        index={7}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="eleven"
        index={11}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="twelve"
        index={9}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="thirteen"
        index={10}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="fourteen"
        index={8}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <Bubble
        name="fifteen"
        index={14}
        handleChange={handleChange}
        trendingHashtag={trendingHashtag}
      />

      <div className="bubble-line-fifteen"></div>
      <div className="bubble-sixteen"></div>
      <div className="bubble-seventeen"></div>
      <div className="bubble-eighteen"></div>
      <div className="bubble-nineteen"></div>
      <div className="bubble-twenty"></div>
      <div className="bubble-twentyone"></div>
      <div className="bubble-twentytwo"></div>
      {/* <div className="bubble-twentythree"></div> */}
    </div>
  );
};

export default BubbleChart;
