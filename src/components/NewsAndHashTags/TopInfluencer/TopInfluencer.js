import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import Sort from "../../SortFilter/Sort";
import "./TopInfluencer.scss";
import RadioButton from "../../RadioButton/RadioButton";
import Content from "./Content";
import {
  getInfluencers,
  influencerCount,
} from "../../../actions/TopInfluencerApis";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import infoIcon from "../../../Images/info.svg";
import { FilterContext } from "../../../context/FilterContext";
import {
  getCountryDropdownData,
  getHashtagDropdownData,
  getInfluencerDropdownData,
} from "../../../actions/DropDownApis";

const TopInfluencer = () => {
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
  const dropdownOptions = ["Country", "Influencer", "Hashtag"];
  const [topInfluencerFilter, setTopInfluencerFilter] = useState("Filters");
  const [isRadioChecked, setIsRadioChecked] = useState(1);
  const [influencerCountData, setInfluencerCountData] = useState(0);
  const [getInfluencersData, setGetInfluencersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [influencerDataBackup, setInfluencerDataBackup] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [influencerdata, setInfluencerData] = useState([]);
  const [influencerBackupdata, setInfluencerBackupdata] = useState([]);
  const [hashtagBackupdata, setHashtagBackupdata] = useState([]);
  const [hashtag, sethashtag] = useState([]);
  const [showInfluencerHashtag, setShowInfluencerHashtag] = useState(false);
  const [countryDataDropdown, setCountryDataDropdown] = useState([]);
  const [countryBackupdata, setCountryBackupdata] = useState([]);
  const [globalBackupData, setGlobalBackupData] = useState([]);
  const [influencerCountDataBackup, setInfluencerCountDataBackup] = useState(0);
  const [page, setPage] = useState(1);

  const handleRadioChange = async (value) => {
    setLoading(true);
    const persentile = localStorage.getItem("persentile");
    // let fromDate = "2022-07-01";
    // let toDate = "2022-07-31";
    let countryTypedValue = "";
    let influencerTypedValue = "";
    let hashtagTypedValue = "";
    if (topInfluencerFilter === "Influencer") {
      influencerTypedValue = inputValue;
    }
    if (topInfluencerFilter === "Hashtag") {
      hashtagTypedValue = inputValue;
    }
    if (topInfluencerFilter === "Country") {
      countryTypedValue = inputValue;
    }
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
      "",
      countryTypedValue || countryValue,
      influencerTypedValue || influencerValue,
      hashtagTypedValue || hashtagValue
    );
    setGetInfluencersData(getInfluencersResponse.influencers);
    setLoading(false);
  };

  const handleFilter = (e) => {
    setInputValue(e.target.value);
    setShowInfluencerHashtag(true);
    if (topInfluencerFilter === "Filters") {
      let tempData = [...globalBackupData];
      console.log("influencerDataBackup", influencerDataBackup);
      const newFilter = tempData.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      console.log("newFilter", newFilter);
      setGetInfluencersData(newFilter);
    } else {
      let tempDatadrodown = [...influencerBackupdata];
      let tempHasgtagData = [...hashtagBackupdata];
      let tempCountryData = [...countryBackupdata];

      const influencerFilter = tempDatadrodown.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      const hashtagFilter = tempHasgtagData.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      const countryFilter = tempCountryData.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      setCountryDataDropdown(countryFilter);
      sethashtag(hashtagFilter);
      setInfluencerData(influencerFilter);
    }
  };

  const clearData = () => {
    setTopInfluencerFilter("Filter");
    setGetInfluencersData(globalBackupData);
    setInputValue("");
    setInfluencerCountData(influencerCountDataBackup);
  };

  useEffect(() => {
    if (countryLineChartLoading) {
      const callApi = async () => {
        // let today = Date.now();
        // var check = moment(today);
        // var month = check.format("M");
        // var day = check.format("D");
        // var year = check.format("YYYY");
        // let fromDate = `${year}-${month}-01`;
        // let toDate = `${year}-${month}-${day}`;
        // console.log(month, day, year);

        // let influencerCountFromDate = "2022-07-01";
        // let influencerCountToDate = "2022-07-31";

        // let fromDate = "2022-07-01";
        // let toDate = "2022-07-31";
        let category = "ALL";

        const persentile =
          !countryValue && !influencerValue && !hashtagValue
            ? localStorage.getItem("persentile")
            : "";

        const getInfluencersResponse = await getInfluencers(
          fromDate,
          toDate,
          category,
          persentile,
          countryValue,
          influencerValue,
          hashtagValue,
          page
        );
        localStorage.setItem("persentile", getInfluencersResponse.persentile);

        const getInfluenser = await getInfluencerDropdownData();
        const hashtagDataResponse = await getHashtagDropdownData();
        const countryDataResponse = await getCountryDropdownData();

        setCountryDataDropdown(countryDataResponse);
        setCountryBackupdata(countryDataResponse);
        setInfluencerData(getInfluenser);
        setInfluencerBackupdata(getInfluenser);
        sethashtag(hashtagDataResponse);
        setHashtagBackupdata(hashtagDataResponse);
        setGetInfluencersData(getInfluencersResponse.influencers);
        setGlobalBackupData(getInfluencersResponse.influencers);

        try {
          const influencerCountResponse = await influencerCount(
            fromDate,
            toDate,
            countryValue,
            influencerValue,
            hashtagValue
          );

          setInfluencerCountData(influencerCountResponse.count);
          setInfluencerCountDataBackup(influencerCountResponse.count);
        } catch (error) {}
        console.log(getInfluencersResponse.influencers, "sdmanxasjnx");
        // console.log(getInfluencersResponse.influencers, "influencer");
        // setInfluencerDataBackup(getInfluencersResponse.influencers);
        setLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  /////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log("inputValue", inputValue);
    const loadUsers = async () => {
      let category = "ALL";
      const persentile = localStorage.getItem("persentile");
      setLoading(true);

      const getInfluencersResponse = await getInfluencers(
        fromDate,
        toDate,
        category,
        persentile,
        countryValue,
        influencerValue,
        hashtagValue,
        page
      );

      setGetInfluencersData((prev) => [
        ...prev,
        ...getInfluencersResponse.influencers,
      ]);
      localStorage.setItem("persentile", getInfluencersResponse.persentile);
      setLoading(false);
    };
    if (!inputValue && !countryValue && !influencerValue && !hashtagValue) {
      loadUsers();
    }
  }, [page]);

  const observer = useRef();
  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !inputValue) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  /////////////////////////////////////////////////////////////

  const onFilterDropClick = (option) => {
    setTopInfluencerFilter(option);
  };

  const onEnterInputClick = async (e) => {
    setShowInfluencerHashtag(false);
    if (e.key === "Enter") {
      let countryTypedValue = "";
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      if (topInfluencerFilter === "Influencer") {
        influencerTypedValue = inputValue;
      }
      if (topInfluencerFilter === "Hashtag") {
        hashtagTypedValue = inputValue;
      }
      if (topInfluencerFilter === "Country") {
        countryTypedValue = inputValue;
      }
      let category = "ALL";

      const persentile = "";
      try {
        const getInfluencersResponse = await getInfluencers(
          fromDate,
          toDate,
          category,
          persentile,
          countryTypedValue,
          influencerTypedValue,
          hashtagTypedValue
        );
        setGetInfluencersData(getInfluencersResponse.influencers);
        setInfluencerDataBackup(getInfluencersResponse.influencers);
        // localStorage.setItem("persentile", getInfluencersResponse.persentile);
      } catch (error) {}

      try {
        const influencerCountResponse = await influencerCount(
          fromDate,
          toDate,
          countryTypedValue,
          influencerTypedValue,
          hashtagTypedValue
        );

        setInfluencerCountData(influencerCountResponse.count);
      } catch (error) {}
    }
  };

  const onDropDownClick = async (val) => {
    setInputValue(val);
    setShowInfluencerHashtag(false);
    let countryTypedValue = "";
    let influencerTypedValue = "";
    let hashtagTypedValue = "";
    if (topInfluencerFilter === "Influencer") {
      influencerTypedValue = val;
    }
    if (topInfluencerFilter === "Hashtag") {
      hashtagTypedValue = val;
    }
    if (topInfluencerFilter === "Country") {
      countryTypedValue = val;
    }
    let category = "ALL";

    // const persentile = localStorage.getItem("persentile");

    const influencerCountResponse = await influencerCount(
      fromDate,
      toDate,
      countryTypedValue,
      influencerTypedValue,
      hashtagTypedValue
    );

    const getInfluencersResponse = await getInfluencers(
      fromDate,
      toDate,
      category,
      // persentile,
      countryTypedValue,
      influencerTypedValue,
      hashtagTypedValue
    );
    // localStorage.setItem("persentile", getInfluencersResponse.persentile);
    setInfluencerCountData(influencerCountResponse.count);
    setGetInfluencersData(getInfluencersResponse.influencers);
    console.log(getInfluencersResponse.influencers, "inital");
    setInfluencerDataBackup(getInfluencersResponse.influencers);
  };

  return (
    <div className="right-container">
      <div className="heading-content">
        <div className="right-heading">
          Top Influencers
          <Tippy
            theme={"light"}
            interactive={true}
            content={
              <div
                style={{
                  padding: "0.5rem",
                  fontWeight: 400,
                  fontFamily: "Work-Sans",
                  fontSize: "14px",
                }}
              >
                <p style={{ fontWeight: 600, marginTop: 0 }}>Top Influencers</p>
                In this table, prominent influencers around the world are
                analysed and divided into categories of persons and
                organizations.
              </div>
            }
          >
            <img className="info-icon" src={infoIcon}></img>
          </Tippy>
        </div>

        <div className="icons">
          <p className="score">
            <span className="digits">{influencerCountData}</span> Influencers
          </p>
          {/* <img alt="share-icon" className="share-img" src={shareIcon} /> */}
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
      </div>

      <div className="trending-sort">
        <Sort
          influencerdata={
            (topInfluencerFilter === "Influencer" && influencerdata) ||
            (topInfluencerFilter === "Hashtag" && hashtag) ||
            (topInfluencerFilter === "Country" && countryDataDropdown)
          }
          filterData={inputValue}
          clearData={clearData}
          onchange={handleFilter}
          setData={onFilterDropClick}
          data={topInfluencerFilter}
          dropdownOptions={dropdownOptions}
          onEnterInputClick={onEnterInputClick}
          onDropDownClick={onDropDownClick}
          inputValue={inputValue}
          showInfluencerHashtag={showInfluencerHashtag}
          value={inputValue}
        />
      </div>

      <Content
        lastUserRef={lastUserRef}
        topInfluencerData={getInfluencersData}
        loading={loading}
      />
    </div>
  );
};

export default TopInfluencer;
