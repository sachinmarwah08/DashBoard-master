import React from "react";
import "./TrendingHashtags.scss";
import { data } from "./data";
// import { TagCloud } from "react-tagcloud";

// const data = [
//   { value: "JavaScript", count: 38 },
//   { value: "React", count: 30 },
//   { value: "Nodejs", count: 28 },
//   { value: "Express.js", count: 25 },
//   { value: "HTML5", count: 33 },
//   { value: "MongoDB", count: 28 },
//   // { value: "CSS3", count: 20 },
// ];

const TrendingHashtags = () => {
  return (
    <div className="trend-wrapper">
      <div className="content">
        <div className="heading">Trending Hashtags</div>
        <div className="hashtags-wrapper">
          <ul class="cloud" role="navigation" aria-label="Webdev word cloud">
            {data.map((item) => (
              <li>
                <a href="#" data-weight={item.id}>
                  {item.hashtags}
                </a>
              </li>
            ))}

            {/* <li><a href="#" data-weight="1">Ember</a></li>
  <li><a href="#" data-weight="5">Sass</a></li>
  <li><a href="#" data-weight="8">HTML</a></li>
  <li><a href="#" data-weight="6">FlexBox</a></li>
  <li><a href="#" data-weight="4">API</a></li>
  <li><a href="#" data-weight="5">VueJS</a></li>
  <li><a href="#" data-weight="6">Grid</a></li>
  <li><a href="#" data-weight="2">Rest</a></li>
  <li><a href="#" data-weight="9">JavaScript</a></li>
  <li><a href="#" data-weight="3">Animation</a></li>
  <li><a href="#" data-weight="7">React</a></li>
  <li><a href="#" data-weight="8">CSS</a></li>
  <li><a href="#" data-weight="1">Cache</a></li>
  <li><a href="#" data-weight="3">Less</a></li> */}
          </ul>
          {/* {data.map((item) => (
            <div key={item.id} className="hashtags-data">
              {item.hashtags}
            </div>
          ))} */}
          {/* 
          <div className="line-one">
            <p className="one">#strength</p>
          </div>
          <div className="line-two">
            <p className="two-one">#allaboutus</p>
            <p className="two-two">#seattleseahawks</p>
            <p className="two-three">#bnb</p>
            <p className="two-four">#SDGS</p>
            <p className="two-five">#Accessiblity</p>
          </div>
          <div className="line-three">
            <p className="three-one">#love</p>
            <p className="three-two">#immunotherapy</p>
            <p className="three-three">#bmtsm</p>
            <p className="three-four">#nature</p>
            <p className="three-five">#Tech4Good</p>
            <p className="three-six">#family</p>
          </div>
          <div className="line-four">
            <p className="four-one">#wellness</p>
            <p className="four-two">#cart</p>
            <p className="four-three">#us</p>
          </div>
          <div className="line-five">
            <p className="five-one">#Accessibility</p>
            <p className="five-two">#genetherapy</p>
            <p className="five-three">#ash21</p>
            <p className="five-four">#smile</p>
            <p className="five-five">#inspiration</p>
          </div>
          <div className="line-six">
            <p className="six-one">#mindfulness</p>
            <p className="six-two">#together</p>
            <p className="six-three">#SDGS</p>
            <p className="six-four">#spiritual</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TrendingHashtags;
