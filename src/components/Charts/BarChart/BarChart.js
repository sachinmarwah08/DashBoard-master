import React, { useContext, useEffect, useState } from "react";
import "./BarChart.scss";
import Highcharts from "highcharts";
import Sort from "../../SortFilter/Sort";
import HighchartsReact from "highcharts-react-official";
import Bardata from "./data";
import shareIcon from "../../../Images/share-2.svg";
import TopBottomButton from "../../TopBottomButton/TopBottomButton";
import { getBarData } from "../../../actions/BarChartApis";
import { PuffLoader } from "react-spinners";
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const newBar = [
  {
    name: "Page A",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const BarChartComponent = () => {
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
  const [data, setData] = useState({});
  const barDataOption = ["Influencer", "Hashtag"];
  const [bardataFilterDrop, setBardataFilterDrop] = useState("Filters");
  // const topBottomData = ["Top 10", "Bottom 10"];
  // const [topBottom, setTopBottom] = useState("Top 10");
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState("Top 10 Countries Wellbeing Analysis");
  const [inputValue, setInputValue] = useState("");
  const [influencerdata, setInfluencerData] = useState([]);
  const [influencerBackupdata, setInfluencerBackupdata] = useState([]);
  const [hashtagBackupdata, setHashtagBackupdata] = useState([]);
  const [hashtag, sethashtag] = useState([]);
  const [showInfluencerHashtag, setShowInfluencerHashtag] = useState(false);
  const [barBackupData, setBarBackupData] = useState([]);

  // const handleChange = (value) => {
  //   setHeading(value);
  // };

  // function kFormatter(num) {
  //   return Math.abs(num) > 999
  //     ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
  //     : Math.sign(num) * Math.abs(num);
  // }

  const onInputChange = async (e) => {
    setInputValue(e.target.value);
    setShowInfluencerHashtag(true);
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
  };

  useEffect(() => {
    if (countryLineChartLoading) {
      const callApi = async (val) => {
        // let today = Date.now();
        // var check = moment(today);
        // var month = check.format("M");
        // var day = check.format("D");
        // var year = check.format("YYYY");
        // let fromDate = `${year}-${month}-01`;
        // let toDate = `${year}-${month}-${day}`;
        // console.log(month, day, year);

        // let fromDate = "2022-06-01";
        // let toDate = "2022-07-31";
        // let country = "United States";
        // let order = "asc";
        let order = "des";

        const response = await getBarData(
          fromDate,
          toDate,
          countryValue,
          influencerValue,
          hashtagValue,
          order
        );
        const getInfluenser = await getInfluencerDropdownData();
        const hashtagDataResponse = await getHashtagDropdownData();

        let tempData = JSON.parse(JSON.stringify(Bardata));
        let maxValue = 50;

        for (let i = 0; i < response.data.length; i++) {
          maxValue = Math.max(maxValue, response.data[i].count);
          tempData.xAxis.categories.push(response.data[i]._id);

          tempData.series[0].data.push(Math.floor(response.data[i].count));
          tempData.tooltip.headerFormat = `<strong><span style="color:#212121; font-size: 16px;">{point.key}</span></strong><br>`;
          tempData.tooltip.pointFormat = `{series.name}: <strong><span  style="color:#F05728">{point.y}</span></strong>`;

          // tempData.tooltip.formatter = function () {
          //   return `${response.data[i].happy}`;
          // };
        }
        tempData.yAxis.max = maxValue;
        setInfluencerData(getInfluenser);
        setInfluencerBackupdata(getInfluenser);
        sethashtag(hashtagDataResponse);
        setHashtagBackupdata(hashtagDataResponse);
        setData(tempData);
        setBarBackupData(tempData);
        setLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  const onFilterDropClick = (option) => {
    setBardataFilterDrop(option);
  };

  // const onTopBottomClick = async (val) => {
  //   let order = "des";
  //   if (val === "des") {
  //     order = "des";
  //   } else if (val === "asc") {
  //     order = "asc";
  //   }

  //   const response = await getBarData(
  //     fromDate,
  //     toDate,
  //     countryValue,
  //     influencerValue,
  //     hashtagValue,
  //     order
  //   );

  //   let tempData = JSON.parse(JSON.stringify(Bardata));

  //   for (let i = 0; i < response.data.length; i++) {
  //     tempData.xAxis.categories.push(response.data[i]._id);
  //     tempData.series[0].data.push(Math.floor(response.data[i].count));
  //     tempData.tooltip.headerFormat = `<strong><span style="color:#212121; font-size: 16px;">{point.key}</span></strong><br>`;
  //     tempData.tooltip.pointFormat = `{series.name}: <strong><span  style="color:#F05728">{point.y}</span></strong>`;
  //     // tempData.tooltip.pointFormat = `{series.name}: <strong><span  style="color:#F05728">{point.y}</span></strong><br><span style="color:#212121">Positive:<span> <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
  //     //   response.data[i].happy
  //     // )}%</span></strong><br/>Negative: <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
  //     //   response.data[i].sad_per
  //     // )}%</span></strong>`;

  //     // tempData.tooltip.formatter = function () {
  //     //   return `${response.data[i].happy}`;
  //     // };
  //   }

  //   setData(tempData);
  // };

  const onEnterInputClick = async (e) => {
    setShowInfluencerHashtag(false);
    if (e.key === "Enter") {
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      if (bardataFilterDrop === "Influencer") {
        influencerTypedValue = inputValue;
      }
      if (bardataFilterDrop === "Hashtag") {
        hashtagTypedValue = inputValue;
      }
      const response = await getBarData(
        fromDate,
        toDate,
        countryValue,
        influencerTypedValue,
        hashtagTypedValue
      );

      let tempData = JSON.parse(JSON.stringify(Bardata));

      for (let i = 0; i < response.data.length; i++) {
        tempData.xAxis.categories.push(response.data[i]._id);
        tempData.series[0].data.push(Math.floor(response.data[i].count));
        tempData.tooltip.headerFormat = `<strong><span style="color:#212121; font-size: 16px;">{point.key}</span></strong><br>`;
        tempData.tooltip.pointFormat = `{series.name}: <strong><span  style="color:#F05728">{point.y}</span></strong>`;

        // tempData.tooltip.formatter = function () {
        //   return `${response.data[i].happy}`;
        // };
      }

      setData(tempData);
    }
  };

  const onDropDownClick = async (val) => {
    setInputValue(val);
    setShowInfluencerHashtag(false);
    let influencerTypedValue = "";
    let hashtagTypedValue = "";
    if (bardataFilterDrop === "Influencer") {
      influencerTypedValue = val;
    }
    if (bardataFilterDrop === "Hashtag") {
      hashtagTypedValue = val;
    }
    const response = await getBarData(
      fromDate,
      toDate,
      countryValue,
      influencerTypedValue,
      hashtagTypedValue
    );

    let tempData = JSON.parse(JSON.stringify(Bardata));

    for (let i = 0; i < response.data.length; i++) {
      tempData.xAxis.categories.push(response.data[i]._id);
      tempData.series[0].data.push(Math.floor(response.data[i].count));
      tempData.tooltip.headerFormat = `<strong><span style="color:#212121; font-size: 16px;">{point.key}</span></strong><br>`;
      tempData.tooltip.pointFormat = `{series.name}: <strong><span  style="color:#F05728">{point.y}</span></strong>`;
    }

    setData(tempData);
  };

  const clearData = () => {
    setData(barBackupData);
    setInputValue("");
    setBardataFilterDrop("Filter");
  };

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="bar-heading-wrapper">
            <div className="heading-left">
              <h1 className="heading">{heading}</h1>
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
                    The analysis of the top 10 and bottom 10 countries according
                    to their wellbeing index scores is shown in this widget. To
                    quantify a country's wellbeing on a numerical scale,
                    wellbeing positive and negative percentages are calculated
                    for each country.
                  </div>
                }
              >
                <img className="info-icon" src={infoIcon}></img>
              </Tippy>
            </div>
            {/* <div className="btn-share">
              <TopBottomButton
                handleChange={handleChange}
                setTopBottom={setTopBottom}
                topBottomData={topBottomData}
                topBottom={topBottom}
                onTopBottomClick={onTopBottomClick}
              />
              <button className="share-btn">
                <img
                  className="share-icon-bar"
                  alt="share-icon-bar"
                  src={shareIcon}
                />
              </button>
            </div> */}
          </div>
          {/* <div className="filter-container"> */}
          <Sort
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
          />
          {/* </div> */}
        </div>
        <div className="bar-chart-wrapper">
          <div className="chart-bar">
            {loading ? (
              <div className="bar-loader">
                <PuffLoader color="#F05728" loading={loading} size={50} />
              </div>
            ) : (
              // <HighchartsReact highcharts={Highcharts} options={data} />
              <ResponsiveContainer width="100%" height="100%" aspect="auto">
                <BarChart data={newBar} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    fill="#212121"
                    fontWeight={400}
                    fontSize="12px"
                    type="category"
                  />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar dataKey="pv" fill="#F05728" radius={[6, 6, 6, 6]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChartComponent;
