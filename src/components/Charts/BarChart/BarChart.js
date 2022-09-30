import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./BarChart.scss";
import Sort from "../../SortFilter/Sort";
import { getBarData } from "../../../actions/BarChartApis";
import { FadeLoader } from "react-spinners";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../../context/FilterContext";
import infoIcon from "../../../Images/info.svg";
import {
  getHashtagDropdownData,
  getInfluencerDropdownData,
} from "../../../actions/DropDownApis";
import BarChartData from "./BarChartData";
import moment from "moment";

const BarChartComponent = () => {
  const { state } = useContext(FilterContext);
  const {
    loaders: { countryLineChartLoading },
    filters: {
      // countryValue,
      influencerValue,
      hashtagValue,
      dateRangeValue: { fromDate, toDate },
    },
  } = state;
  const [data, setData] = useState([]);
  const barDataOption = ["Influencer", "Hashtag"];
  const [bardataFilterDrop, setBardataFilterDrop] = useState("Filters");
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [influencerdata, setInfluencerData] = useState([]);
  const [influencerBackupdata, setInfluencerBackupdata] = useState([]);
  const [hashtagBackupdata, setHashtagBackupdata] = useState([]);
  const [hashtag, sethashtag] = useState([]);
  const [showInfluencerHashtag, setShowInfluencerHashtag] = useState(false);
  const [barBackupData, setBarBackupData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // if (countryLineChartLoading) {
    setLoading(true);
    const callApi = async (val) => {
      // let today = Date.now();
      // var check = moment(today);
      // var month = check.format("M");
      // var day = check.format("D");
      // var year = check.format("YYYY");
      // let fromDate = `${year}-${month}-01`;
      // let toDate = `${year}-${month}-${day}`;
      // console.log(month, day, year);

      let order = "des";
      let country = "";

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      const response = await getBarData(
        fromDate,
        toDate,
        // countryValue,
        country,
        influencerValue,
        hashtagValue,
        order,
        c
      );
      const getInfluenser = await getInfluencerDropdownData();
      const hashtagDataResponse = await getHashtagDropdownData();

      let tempData = [];

      for (let i = 0; i < response.data.length; i++) {
        tempData.push({
          name: response.data[i]._id,
          pv: response.data[i].count,
          happy: response.data[i].happy,
          sad_per: response.data[i].sad_per,
        });
      }

      setInfluencerData(getInfluenser);
      setInfluencerBackupdata(getInfluenser);
      sethashtag(hashtagDataResponse);
      setHashtagBackupdata(hashtagDataResponse);
      setData(tempData);
      setBarBackupData(tempData);
      setLoading(false);
    };
    callApi();
    // }
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      // setLoading(true);
      const HashtagData = await getHashtagDropdownData(page);
      sethashtag((prev) => [...prev, ...HashtagData]);

      const influencerData = await getInfluencerDropdownData(page);
      setInfluencerData((prev) => [...prev, ...influencerData]);
      setLoading(false);
    };
    loadUsers();
  }, [page]);

  const observer = useRef();

  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const onInputChange = async (e) => {
    setInputValue(e.target.value);
    setLoading(true);
    setShowInfluencerHashtag(true);
    if (bardataFilterDrop === "Filters") {
      setShowInfluencerHashtag(false);
    }
    let tempData = [...influencerBackupdata];
    let tempHasgtagData = [...hashtagBackupdata];
    const newFilter = tempData.filter((value) => {
      return value.toLowerCase().includes(inputValue.toLowerCase());
    });
    const hashtagFilter = tempHasgtagData.filter((value) => {
      return value.toLowerCase().includes(inputValue.toLowerCase());
    });

    sethashtag(hashtagFilter);
    setInfluencerData(newFilter);
    setLoading(false);
  };

  const onInfluencerInputChange = async (searchValue) => {
    if (bardataFilterDrop === "Influencer") {
      setLoading(true);
      const influencerData = await getInfluencerDropdownData(1, searchValue);
      setInfluencerData(influencerData);
      setLoading(false);
    }
    if (bardataFilterDrop === "Hashtag") {
      setLoading(true);
      const hashtagData = await getHashtagDropdownData(1, searchValue);
      sethashtag(hashtagData);
      setLoading(false);
    }
  };

  const onEnterInputClick = async (e) => {
    setShowInfluencerHashtag(false);
    if (e.key === "Enter") {
      setLoading(true);
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      if (bardataFilterDrop === "Influencer") {
        influencerTypedValue = inputValue;
      }
      if (bardataFilterDrop === "Hashtag") {
        hashtagTypedValue = inputValue;
      }

      let order = "des";
      let country = "";

      const response = await getBarData(
        fromDate,
        toDate,
        country,
        influencerTypedValue,
        hashtagTypedValue,
        order
      );

      let tempData = [];

      for (let i = 0; i < response.data.length; i++) {
        tempData.push({
          name: response.data[i]._id,
          pv: response.data[i].count,
          happy: response.data[i].happy,
          sad_per: response.data[i].sad_per,
        });
      }

      setData(tempData);
      setLoading(false);
    }
  };

  const onDropDownClick = async (val) => {
    setInputValue(val);
    setShowInfluencerHashtag(false);
    setLoading(true);
    let influencerTypedValue = "";
    let hashtagTypedValue = "";
    if (bardataFilterDrop === "Influencer") {
      influencerTypedValue = val;
    }
    if (bardataFilterDrop === "Hashtag") {
      hashtagTypedValue = val;
    }

    let order = "des";
    let country = "";

    const response = await getBarData(
      fromDate,
      toDate,
      country,
      influencerTypedValue,
      hashtagTypedValue,
      order
    );

    let tempData = [];

    for (let i = 0; i < response.data.length; i++) {
      tempData.push({
        name: response.data[i]._id,
        pv: response.data[i].count,
        happy: response.data[i].happy,
        sad_per: response.data[i].sad_per,
      });
    }

    setData(tempData);
    setLoading(false);
  };

  const clearData = () => {
    setData(barBackupData);
    setInputValue("");
    setBardataFilterDrop("Filter");
  };

  const onFilterDropClick = (option) => {
    setBardataFilterDrop(option);
  };

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="bar-heading-wrapper">
            <div className="heading-left">
              <h1 className="heading">Top 10 Countries Wellbeing Analysis</h1>
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
                    <p style={{ fontWeight: 600, marginTop: 0 }}>
                      Countries Wellbeing Analysis
                    </p>
                    The analysis of the top 10 countries according to their
                    wellbeing interest and sentiment is shown in this widget. To
                    quantify a country's wellbeing on a numerical scale,
                    wellbeing positive and negative percentages are calculated
                    for each country.
                  </div>
                }
              >
                <img className="info-icon" src={infoIcon}></img>
              </Tippy>
            </div>
          </div>

          {/* <Sort
            influencerdata={
              bardataFilterDrop === "Influencer" ? influencerdata : hashtag
            }
            filterData={inputValue}
            clearData={clearData}
            setData={onFilterDropClick}
            data={bardataFilterDrop}
            dropdownOptions={barDataOption}
            onchange={onInputChange}
            onEnterInputClick={onEnterInputClick}
            onDropDownClick={onDropDownClick}
            inputValue={inputValue}
            showInfluencerHashtag={showInfluencerHashtag}
            value={inputValue}
            lastUserRef={lastUserRef}
            onSearch={onInfluencerInputChange}
          /> */}
        </div>

        <div className="bar-chart-wrapper">
          <div className="chart-bar">
            {loading ? (
              <div className="bar-loader">
                <FadeLoader color="#F05728" loading={loading} size={50} />
              </div>
            ) : data.length === 0 ? (
              ""
            ) : (
              <BarChartData data={data} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChartComponent;
