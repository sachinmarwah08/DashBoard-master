import React, { useState } from "react";
import Sort from "../../SortFilter/Sort";
import { data } from "./data";
import "./TopInfluencer.scss";
import shareIcon from "../../../Images/share-2.svg";
import RadioButton from "../../RadioButton/RadioButton";
import Content from "./Content";

const TopInfluencer = () => {
  const dropdownOptions = ["Country", "Influencer", "Hashtag"];
  const [topInfluencerFilter, setTopInfluencerFilter] = useState("Filter");
  const [isRadioChecked, setIsRadioChecked] = useState(1);
  const [topInfluencerData, setTopInfluencerData] = useState(data);
  const [wordEntered, setWordEntered] = useState("");

  const handleRadioChange = (value) => {
    setIsRadioChecked(value);
    console.log(value);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.hashtags.toLowerCase().includes(searchWord.toLowerCase());
    });

    setTopInfluencerData(newFilter);
  };

  const clearData = () => {
    setTopInfluencerData(data);
    setWordEntered("");
  };

  return (
    <div className="right-container">
      <div className="heading-content">
        <div className="right-heading">Top Influencers</div>
        <div className="icons">
          <p className="score">
            <span className="digits">13569</span> Influencers
          </p>
          <img alt="share-icon" className="share-img" src={shareIcon} />
        </div>
      </div>

      <div className="trending-radioBtn">
        <RadioButton
          radioName="topInfluencer"
          name="All"
          checked={isRadioChecked}
          value={1}
          onchange={handleRadioChange}
        />
        <RadioButton
          radioName="topInfluencer"
          name="Person"
          checked={isRadioChecked}
          value={2}
          onchange={handleRadioChange}
        />
        <RadioButton
          radioName="topInfluencer"
          name="Organisation"
          checked={isRadioChecked}
          value={3}
          onchange={handleRadioChange}
        />
        <RadioButton
          radioName="topInfluencer"
          name="Media House"
          checked={isRadioChecked}
          value={4}
          onchange={handleRadioChange}
        />
      </div>

      <div className="trending-sort">
        <Sort
          filterData={topInfluencerData.length === 0}
          clearData={clearData}
          value={wordEntered}
          onchange={handleFilter}
          setData={setTopInfluencerFilter}
          data={topInfluencerFilter}
          dropdownOptions={dropdownOptions}
        />
      </div>

      <Content topInfluencerData={topInfluencerData} />
    </div>
  );
};

export default TopInfluencer;
