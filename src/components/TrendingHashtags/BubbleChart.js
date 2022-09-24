import React, { useContext, useEffect, useState } from "react";
import { getTrendingHashtagData } from "../../actions/TrendingHashtagsApis";
import background from "../../Images/hashtag-bg.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import Bubble from "./Bubble";
import { FilterContext } from "../../context/FilterContext";
import { FadeLoader } from "react-spinners";

const BubbleChart = ({
  handleChange,
  trendingHashtag,
  setTrendingHashtag,
  loading,
  setLoading,
  toggle,
  dropdown,
  wrapperRef,
}) => {
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

        // let fromDate = "2022-07-01";
        // let toDate = "2022-07-31";

        const response = await getTrendingHashtagData(
          fromDate,
          toDate,
          countryValue,
          influencerValue,
          hashtagValue
        );
        let tempData = [...response.records];

        if (!hashtagValue) {
          tempData.sort((a, b) => b.hashtag.count - a.hashtag.count);
        }

        setTrendingHashtag(tempData);
        setLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  return (
    <>
      {loading ? (
        <div className="trendingHashtag-loader">
          <FadeLoader color="#F05728" loading={loading} size={50} />
        </div>
      ) : (
        <div className="trending-bubble-content">
          <img className="bg-image" src={background}></img>

          <Bubble
            name="one"
            index={0}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="two"
            index={3}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="three"
            index={2}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="four"
            index={4}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="five"
            index={5}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="six"
            index={6}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="seven"
            index={1}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="eight"
            index={12}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="nine"
            index={13}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="ten"
            index={7}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="eleven"
            index={11}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="twelve"
            index={9}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="thirteen"
            index={10}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="fourteen"
            index={8}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <Bubble
            name="fifteen"
            index={14}
            handleChange={handleChange}
            trendingHashtag={trendingHashtag}
            toggle={toggle}
            dropdown={dropdown}
            wrapperRef={wrapperRef}
          />

          <div className="bubble-line-fifteen"></div>
          <div className="bubble-sixteen"></div>
          <div className="bubble-seventeen"></div>
          <div className="bubble-eighteen"></div>
          <div className="bubble-nineteen"></div>
          <div className="bubble-twenty"></div>
          <div className="bubble-twentyone"></div>
          <div className="bubble-twentytwo"></div>
        </div>
      )}
    </>
  );
};

export default BubbleChart;
