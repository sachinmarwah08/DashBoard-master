import React, { useState, useEffect } from "react";
import Sort from "../../SortFilter/Sort";
import "./TopInfluencer.scss";
import shareIcon from "../../../Images/share-2.svg";
import RadioButton from "../../RadioButton/RadioButton";
import Content from "./Content";
import {
  getInfluencers,
  influencerCount,
} from "../../../actions/TopInfluencerApis";

const TopInfluencer = () => {
  const dropdownOptions = ["Country", "Influencer", "Hashtag"];
  const [topInfluencerFilter, setTopInfluencerFilter] = useState("Filter");
  const [isRadioChecked, setIsRadioChecked] = useState(1);
  const [wordEntered, setWordEntered] = useState("");
  const [influencerCountData, setInfluencerCountData] = useState(0);
  const [getInfluencersData, setGetInfluencersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [influencerDataBackup, setInfluencerDataBackup] = useState([]);

  const handleRadioChange = async (value) => {
    setLoading(true);
    const persentile = localStorage.getItem("persentile");
    let fromDate = "2022-07-01";
    let toDate = "2022-07-31";
    let category = "ALL";
    if (value === 2) {
      category = "PERSON";
    } else if (value === 3) {
      category = "ORGANIZATION";
    }
    setLoading(false);
    setIsRadioChecked(value);

    const getInfluencersResponse = await getInfluencers(
      fromDate,
      toDate,
      category,
      persentile
    );
    setGetInfluencersData(getInfluencersResponse.influencers);
    setLoading(false);
  };

  const handleFilter = (event) => {
    let tempData = [...influencerDataBackup];
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = tempData.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    setGetInfluencersData(newFilter);
  };

  const clearData = () => {
    setGetInfluencersData(influencerDataBackup);
    setWordEntered("");
  };

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

      let influencerCountFromDate = "2022-07-01";
      let influencerCountToDate = "2022-07-31";

      let fromDate = "2022-07-01";
      let toDate = "2022-07-31";
      let category = "ALL";

      const influencerCountResponse = await influencerCount(
        influencerCountFromDate,
        influencerCountToDate
      );

      const getInfluencersResponse = await getInfluencers(
        fromDate,
        toDate,
        category
      );
      localStorage.setItem("persentile", getInfluencersResponse.persentile);

      setInfluencerCountData(influencerCountResponse.count);
      setGetInfluencersData(getInfluencersResponse.influencers);
      setInfluencerDataBackup(getInfluencersResponse.influencers);
      setLoading(false);
    };
    callApi();
  }, []);

  return (
    <div className="right-container">
      <div className="heading-content">
        <div className="right-heading">Top Influencers</div>
        <div className="icons">
          <p className="score">
            <span className="digits">{influencerCountData}</span> Influencers
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
          filterData={getInfluencersData.length === 0}
          clearData={clearData}
          value={wordEntered}
          onchange={handleFilter}
          setData={setTopInfluencerFilter}
          data={topInfluencerFilter}
          dropdownOptions={dropdownOptions}
        />
      </div>

      <Content topInfluencerData={getInfluencersData} loading={loading} />
    </div>
  );
};

export default TopInfluencer;
