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
import moment from "moment";

const TopInfluencer = () => {
  // const myRefNew = useRef(null);
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

  useEffect(() => {
    if (countryLineChartLoading) {
      const callApi = async () => {
        setLoading(true);

        let category = "ALL";

        let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
          ? false
          : null;

        console.log(
          fromDate,
          toDate,
          category,
          "",
          countryValue,
          influencerValue,
          hashtagValue,
          page,
          c,
          "Main UseEffect"
        );

        const getInfluencersResponse = await getInfluencers(
          fromDate,
          toDate,
          category,
          "",
          countryValue,
          influencerValue,
          hashtagValue,
          page,
          c
        );

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
            hashtagValue,
            c
          );

          setInfluencerCountData(influencerCountResponse.count);
          setInfluencerCountDataBackup(influencerCountResponse.count);
        } catch (error) {}
        setLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  useEffect(() => {
    const loadUsers = async (value) => {
      setLoading(true);

      let category = "ALL";
      if (isRadioChecked) {
        if (value === 2) {
          category = "PERSON";
        } else if (value === 3) {
          category = "ORGANIZATION";
        }
      }

      // const persentile = localStorage.getItem("persentile");

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

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

      console.log(
        fromDate,
        toDate,
        category,
        // persentile,
        "",
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue,
        1,
        c,
        "LoadUser UseEffect"
      );

      const getInfluencersResponse = await getInfluencers(
        fromDate,
        toDate,
        category,
        // persentile,
        "",
        countryTypedValue || countryValue,
        influencerTypedValue,
        hashtagTypedValue || hashtagValue,
        page,
        c
      );

      setGetInfluencersData((prev) => [
        ...prev,
        ...getInfluencersResponse.influencers,
      ]);

      const countryData = await getCountryDropdownData(page);
      setCountryDataDropdown((prev) => [...prev, ...countryData]);

      const HashtagData = await getHashtagDropdownData(page);
      sethashtag((prev) => [...prev, ...HashtagData]);

      const influencerData = await getInfluencerDropdownData(page);
      setInfluencerData((prev) => [...prev, ...influencerData]);

      // if (getInfluencersResponse.persentile === 0) {
      //   return null;
      // } else
      //   localStorage.setItem("persentile", getInfluencersResponse.persentile);

      setLoading(false);
    };
    loadUsers();
  }, [page]);

  // useEffect(() => {
  //   const loadUsersDropDown = async () => {
  //     // setLoading(true);
  //     // setLoading(false);
  //   };
  //   loadUsersDropDown();
  // }, [page]);

  const observer = useRef();

  const lastUserRef = useCallback(
    (node) => {
      console.log(loading, "loading");
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log(entries, "entires");
        if (entries[0].isIntersecting) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleRadioChange = async (value) => {
    setLoading(true);

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

    // const persentile = localStorage.getItem("persentile");

    let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
      ? false
      : null;

    setPage(1);
    setGetInfluencersData("");

    console.log(
      fromDate,
      toDate,
      category,
      "",
      // persentile,
      countryTypedValue || countryValue,
      influencerTypedValue,
      hashtagTypedValue || hashtagValue,
      1,
      c,
      "RadioChange UseEffect"
    );

    const getInfluencersResponse = await getInfluencers(
      fromDate,
      toDate,
      category,
      // persentile,
      "",
      countryTypedValue || countryValue,
      influencerTypedValue,
      hashtagTypedValue || hashtagValue,
      1,
      c
    );

    // if (getInfluencersResponse.persentile === 0) {
    //   return null;
    // } else
    //   localStorage.setItem("persentile", getInfluencersResponse.persentile);

    setIsRadioChecked(value);
    setGetInfluencersData(getInfluencersResponse.influencers);
    setLoading(false);
  };

  const handleFilter = (e) => {
    setInputValue(e.target.value);
    setShowInfluencerHashtag(true);
    if (topInfluencerFilter === "Filters") {
      // setLoading(false);
      let tempData = [...globalBackupData];
      const newFilter = tempData.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      setGetInfluencersData(newFilter);
      setShowInfluencerHashtag(false);
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
      setLoading(false);
    }
  };

  const onInfluencerInputChange = async (searchValue) => {
    if (topInfluencerFilter === "Country") {
      // setLoading(true);
      const countryData = await getCountryDropdownData(1, searchValue);
      setCountryDataDropdown(countryData);
      // setLoading(false);
    }
    if (topInfluencerFilter === "Influencer") {
      // setLoading(true);
      const influencerData = await getInfluencerDropdownData(1, searchValue);
      setInfluencerData(influencerData);
      // setLoading(false);
    }
    if (topInfluencerFilter === "Hashtag") {
      // setLoading(true);
      const hashtagData = await getHashtagDropdownData(1, searchValue);
      sethashtag(hashtagData);
      // setLoading(false);
    }
  };

  const onEnterInputClick = async (e) => {
    setShowInfluencerHashtag(false);
    if (e.key === "Enter") {
      setLoading(true);
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

      // const persentile = localStorage.getItem("persentile");

      let category = "ALL";
      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      try {
        setPage(1);
        console.log(
          fromDate,
          toDate,
          category,
          // persentile,
          "",
          countryTypedValue,
          influencerTypedValue,
          hashtagTypedValue,
          1,
          c,
          "OnEnter UseEffect"
        );
        const getInfluencersResponse = await getInfluencers(
          fromDate,
          toDate,
          category,
          // persentile,
          "",
          countryTypedValue,
          influencerTypedValue,
          hashtagTypedValue,
          1,
          c
        );

        setGetInfluencersData(getInfluencersResponse.influencers);
        setInfluencerDataBackup(getInfluencersResponse.influencers);

        // if (getInfluencersResponse.persentile === 0) {
        //   return null;
        // } else
        //   localStorage.setItem("persentile", getInfluencersResponse.persentile);
      } catch (error) {}

      try {
        const influencerCountResponse = await influencerCount(
          fromDate,
          toDate,
          countryTypedValue,
          influencerTypedValue,
          hashtagTypedValue,
          c
        );

        setInfluencerCountData(influencerCountResponse.count);
      } catch (error) {}
    }
    setLoading(false);
  };

  const onDropDownClick = async (val) => {
    setLoading(true);
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

    let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
      ? false
      : null;

    // const persentile = localStorage.getItem("persentile");

    try {
      console.log(
        fromDate,
        toDate,
        category,
        // persentile,
        "",
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue,
        1,
        c,
        "Dropdown UseEffect"
      );

      setPage(1);
      const getInfluencersResponse = await getInfluencers(
        fromDate,
        toDate,
        category,
        // persentile,
        "",
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue,
        1,
        c
      );

      // if (getInfluencersResponse.persentile === 0) {
      //   return null;
      // } else
      //   localStorage.setItem("persentile", getInfluencersResponse.persentile);

      setGetInfluencersData(getInfluencersResponse.influencers);
      setInfluencerDataBackup(getInfluencersResponse.influencers);
      setLoading(false);
    } catch (error) {}

    try {
      const influencerCountResponse = await influencerCount(
        fromDate,
        toDate,
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue,
        c
      );

      setInfluencerCountData(influencerCountResponse.count);
    } catch (error) {}
  };

  const clearData = () => {
    setTopInfluencerFilter("Filter");
    setPage(1);
    setGetInfluencersData(globalBackupData);
    setInfluencerCountData(influencerCountDataBackup);
    setInputValue("");
    setShowInfluencerHashtag(false);
  };

  const onFilterDropClick = (option) => {
    setTopInfluencerFilter(option);
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
          lastUserRef={lastUserRef}
          onSearch={onInfluencerInputChange}
        />
      </div>

      <Content
        lastUserRef={lastUserRef}
        topInfluencerData={getInfluencersData}
        loading={loading}
        // ref={myRefNew}
      />
    </div>
  );
};

export default TopInfluencer;
