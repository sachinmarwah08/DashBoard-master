import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
// import downloadIcon from "../../../Images/download-2.svg";
// import shareIcon from "../../../Images/share-3.svg";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountryAndDateButton from "./Buttons/CountryAndDateButton/Button";
import Modal from "../../Modal/Modal";
import Header from "../../Layouts/Header/Header";
import CountryAndTimeButton from "./Buttons/CountryAndTimeButton/Button";
import CompareCountry from "./CompareCountry/Filter";
import CompareTime from "./CompareTime/Filter";
import CompareCountryLineChart from "./CompareCountry/CompareCountryLineChart";
import CompareTimeLineChart from "./CompareTime/CompareTimeLineChart";
import { compareCountry, compareTime } from "../../../actions/LineChartApis";
// import { chooseTimeBarData, LineChartBarData } from "./Chart/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import moment from "moment";
import infoIcon from "../../../Images/info.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { getCountryDropdownData } from "../../../actions/DropDownApis";
import { UPDATE_LOADERS } from "../../../actions/types";
import { FilterContext } from "../../../context/FilterContext";
import moment from "moment";
// import { useInView } from "react-intersection-observer";

const LineChartData = () => {
  const { state, dispatch } = useContext(FilterContext);
  // const { ref, inView, entry } = useInView({
  //   /* Optional options */
  //   threshold: 0,
  // });

  const {
    loaders: { countryLineChartLoading },
    filters: {
      countryValue,
      influencerValue,
      hashtagValue,
      dateRangeValue: { fromDate, toDate },
    },
  } = state;

  const navigate = useNavigate();

  const dateSelect = [
    "Past 7 Days",
    "Past 30 Days",
    "Past 90 Days",
    "This Year",
  ];

  // const [selected, setSelected] = useState("Past 1 months");
  const [selectCountry, setselectCountry] = useState("Worldwide");
  const [data, setData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [LineChartData, setLineChartData] = useState([]);
  // const countrySelect = ["United States", "Canada", "Worldwide"];
  const [countrySelect, setCountrySelect] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const router = useLocation();
  const [addCountry, setaddCountry] = useState(false);
  const [contryNameState, setContryNameState] = useState("");
  const [isValue, setIsValue] = useState(false);
  const [compareCountryActive, setCompareCountryActive] =
    useState("compareCountry");
  const [chooseTime, setChooseTime] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [backUpLineChartData, setBackUpLineChartData] = useState([]);
  const [dataForLineBarChart, setDataForLineBarChart] = useState();
  const [chooseTimeLineChartData, setChooseTimeLineChartData] = useState([]);
  const [chooseTimeBarDataState, setChooseTimeBarDataState] = useState();
  const [countryDropBackUpData, setCountryDropBackUpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showDropDown, setShowDropDown] = useState(false);

  const navigateHome = () => {
    navigate("/");
  };

  function twoDecimalPlacesIfCents(amount) {
    return amount % 1 !== 0 ? amount.toFixed(2) : amount;
  }

  const onCountryEnterPress = async (e) => {
    if (e.key === "Enter") {
      if (
        countrySelect
          .map((x) => x.toLowerCase())
          .includes(e.target.value.toLowerCase())
      ) {
        setIsValue(true);

        let country = e.target.value;
        try {
          const response = await compareCountry(fromDate, toDate, country);

          // let tempBarData = JSON.parse(JSON.stringify(LineChartBarData));
          // console.log(response.bar_graph_data[country]);
          // if (
          //   response &&
          //   response.bar_graph_data &&
          //   response.bar_graph_data[country]
          // ) {
          //   tempBarData.series[0].data[0].y =
          //     response.bar_graph_data[country].happy;
          //   tempBarData.tooltip.headerFormat = `<strong><span style="color:#212121; font-size: 16px;">{point.key}</span></strong><br>`;
          //   tempBarData.tooltip.pointFormat = `{series.name}: <strong><span  style="color:#F05728">{point.y}</span></strong><br><span style="color:#212121">Positive:<span> <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
          //     response.bar_graph_data[country].happy
          //   )}%</span></strong><br/>Negative: <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
          //     response.bar_graph_data[country].sad
          //   )}%</span></strong>`;
          // }
          // if (barChartData) {
          //   tempBarData.series[0].data[1].y = barChartData.happy;
          //   tempBarData.tooltip.pointFormat = `</span></strong><br><span style="color:#212121">Positive:<span> <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
          //     barChartData.happy
          //   )}%</span></strong><br/>Negative: <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
          //     barChartData.sad
          //   )}%</span></strong>`;
          // }

          // setDataForLineBarChart(tempBarData);

          let tempData = [...LineChartData];
          for (let i = 0; i < tempData.length; i++) {
            tempData[i]["compare"] = 0;
          }
          let equal_ids = [];

          if (
            response &&
            response.line_chart_data &&
            response.line_chart_data[country] &&
            response.line_chart_data[country].length
          ) {
            let countryData = response.line_chart_data[country];

            for (let i = 0; i < countryData.length; i++) {
              for (let j = 0; j < tempData.length; j++) {
                if (!equal_ids.includes(tempData[j]._id)) {
                  equal_ids.push(tempData[j]._id);
                }
                if (countryData[i]._id === tempData[j]._id) {
                  if (countryData[i]) {
                    tempData[j]["compare"] = countryData[i].count;
                  }
                }
              }
            }

            for (let i = 0; i < countryData.length; i++) {
              if (!equal_ids.includes(countryData[i]._id)) {
                countryData[i]["compare"] = countryData[i]["count"];
                countryData[i]["count"] = 0;
                tempData.push(countryData[i]);
              }
            }
          }
          response.line_chart_data[country].sort(
            (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
          );
          tempData.forEach((item) => {
            item[selectCountry] = item.count;
            item[country] = item.compare;
          });
          console.log("tempData", tempData);

          // setBarChartData(response.bar_graph_data);
          setLineChartData(tempData);
        } catch (error) {
          toast.error("No records found in Data Lake...", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBa: true,
            newestOnTop: false,
            rtl: false,
            toastClassName: "dark-toast",
          });
        }
      } else {
        toast.error("Country not found", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBa: true,
          newestOnTop: false,
          rtl: false,
          toastClassName: "dark-toast",
        });
      }
    }
  };

  const closeAddCountry = () => {
    setLineChartData(backUpLineChartData);

    setContryNameState("");
    setIsValue(false);
  };

  const handleChange = async (option) => {
    console.log("hiiiii", chooseTime);
    setLoading(true);
    if (contryNameState && isValue) {
      if (
        countrySelect
          .map((x) => x.toLowerCase())
          .includes(contryNameState.toLowerCase())
      ) {
        setIsValue(true);
        // let fromDate = "2022-07-01";
        // let toDate = "2022-07-31";
        let country = contryNameState;
        try {
          const dropResponse = await compareCountry(fromDate, toDate, option);
          const response = await compareCountry(fromDate, toDate, country);

          // let tempBarData = JSON.parse(JSON.stringify(LineChartBarData));
          // console.log(response.bar_graph_data[country]);
          // if (
          //   response &&
          //   response.bar_graph_data &&
          //   response.bar_graph_data[country]
          // ) {
          //   tempBarData.series[0].data[0].y =
          //     response.bar_graph_data[country].happy;
          //   tempBarData.tooltip.headerFormat = `<strong><span style="color:#212121; font-size: 16px;">{point.key}</span></strong><br>`;
          //   tempBarData.tooltip.pointFormat = `{series.name}: <strong><span  style="color:#F05728">{point.y}</span></strong><br><span style="color:#212121">Positive:<span> <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
          //     response.bar_graph_data[country].happy
          //   )}%</span></strong><br/>Negative: <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
          //     response.bar_graph_data[country].sad
          //   )}%</span></strong>`;
          // }
          // if (
          //   dropResponse &&
          //   dropResponse.bar_graph_data &&
          //   dropResponse.bar_graph_data[country]
          // ) {
          //   tempBarData.series[0].data[1].y =
          //     dropResponse.bar_graph_data[option].happy;
          //   tempBarData.tooltip.pointFormat = `</span></strong><br><span style="color:#212121">Positive:<span> <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
          //     dropResponse.bar_graph_data[option].happy
          //   )}%</span></strong><br/>Negative: <strong><span style="color:#F05728">${twoDecimalPlacesIfCents(
          //     dropResponse.bar_graph_data[option].sad
          //   )}%</span></strong>`;
          // }

          // setDataForLineBarChart(tempBarData);

          let tempData = [...dropResponse.line_chart_data[option]];
          for (let i = 0; i < tempData.length; i++) {
            tempData[i]["compare"] = 0;
          }
          let equal_ids = [];

          if (
            response &&
            response.line_chart_data &&
            response.line_chart_data[country] &&
            response.line_chart_data[country].length
          ) {
            let countryData = response.line_chart_data[country];

            for (let i = 0; i < countryData.length; i++) {
              for (let j = 0; j < tempData.length; j++) {
                if (!equal_ids.includes(tempData[j]._id)) {
                  equal_ids.push(tempData[j]._id);
                }
                if (countryData[i]._id === tempData[j]._id) {
                  if (countryData[i]) {
                    tempData[j]["compare"] = countryData[i].count;
                  }
                }
              }
            }

            for (let i = 0; i < countryData.length; i++) {
              if (!equal_ids.includes(countryData[i]._id)) {
                countryData[i]["compare"] = countryData[i]["count"];
                countryData[i]["count"] = 0;
                tempData.push(countryData[i]);
              }
            }
          }
          response.line_chart_data[country].sort(
            (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
          );

          tempData.forEach((item) => {
            item[option] = item.count;
            item[country] = item.compare;
          });
          console.log("tempData", tempData);

          // setBarChartData(response.bar_graph_data);
          setLineChartData(tempData);
          setBackUpLineChartData(dropResponse.line_chart_data[option]);
        } catch (error) {
          toast.error("No records found in Data Lake...", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBa: true,
            newestOnTop: false,
            rtl: false,
            toastClassName: "dark-toast",
          });
        }
      } else {
        toast.error("Country not found", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBa: true,
          newestOnTop: false,
          rtl: false,
          toastClassName: "dark-toast",
        });
      }
    } else if (dateValue && chooseTime) {
      // setDateValue(item.month);
      let country = selectCountry;
      let fromDateCompareTime = "2022-05-01";
      let toDateCompareTime = moment().format("YYYY-MM-DD");
      const response = await compareTime(
        fromDateCompareTime,
        toDateCompareTime,
        country
      );

      // let tempBarData = JSON.parse(JSON.stringify(chooseTimeBarData));
      // console.log(response.bar_graph_data[selectCountry]);
      // if (
      //   response &&
      //   response.bar_graph_data &&
      //   response.bar_graph_data[selectCountry]
      // ) {
      //   tempBarData.series[0].data[0].y =
      //     response.bar_graph_data[selectCountry].happy;
      //   // tempData.tooltip.headerFormat = `<strong><span style="color:#212121; font-size: 16px;">{point.key}</span></strong><br>`;
      //   // tempData.tooltip.pointFormat = `</strong><br><span style="color:#212121">Positive:<span> <strong><span style="color:#F05728">${parseFloat(
      //   //   response.bar_graph_data[selectCountry].happy
      //   // ).toFixed(
      //   //   2
      //   // )}%</span></strong><br/>Negative: <strong><span style="color:#F05728">${parseFloat(
      //   //   response.bar_graph_data[selectCountry].sad
      //   // ).toFixed(2)}%</span></strong>`;
      // }
      // if (barChartData) {
      //   tempBarData.series[0].data[1].y = barChartData.happy;
      //   // tempData.tooltip.pointFormat = `</strong><br/>Happy: <strong>${response.data[i].happy}</strong><br/>Sad: <strong>${response.data[i].sad_per}</strong>`;
      //   // }
      // }

      // setChooseTimeBarDataState(tempBarData);

      let tempData = [...chooseTimeLineChartData];
      for (let i = 0; i < tempData.length; i++) {
        tempData[i]["compare"] = 0;
      }
      let equal_ids = [];

      if (
        response &&
        response.line_chart_data &&
        response.line_chart_data[selectCountry] &&
        response.line_chart_data[selectCountry].length
      ) {
        let countryData = response.line_chart_data[selectCountry];

        for (let i = 0; i < countryData.length; i++) {
          for (let j = 0; j < tempData.length; j++) {
            if (!equal_ids.includes(tempData[j].MonthValue)) {
              equal_ids.push(tempData[j].week);
            }
            if (countryData[i].week === tempData[j].week) {
              if (countryData[i]) {
                tempData[j]["compare"] = countryData[i].count;
              }
            }
          }
        }

        for (let i = 0; i < countryData.length; i++) {
          if (!equal_ids.includes(countryData[i].week)) {
            countryData[i]["compare"] = countryData[i]["count"];
            countryData[i]["count"] = 0;
            tempData.push(countryData[i]);
          }
        }
      }

      // tempData.sort((a, b) => b._id.split("-")[2] - a._id.split("-")[2]);
      console.log("tempData", tempData);
      tempData.forEach((item) => {
        item[selectCountry] = item.count;
        item[selectCountry] = item.compare;
      });

      // setBarChartData(response.bar_graph_data);
      setChooseTimeLineChartData(tempData);
    } else {
      let country = option;
      // let fromDate = "2022-08-01";
      // let toDate = "2022-09-31";
      let fromDateCompareTime = "2022-05-01";
      let toDateCompareTime = moment().format("YYYY-MM-DD");

      const response = await compareCountry(fromDate, toDate, country);

      const responseComapreTime = await compareTime(
        // fromDatetime,
        // toDatetime,
        fromDateCompareTime,
        toDateCompareTime,
        option
      );
      setChooseTimeLineChartData(responseComapreTime.line_chart_data[option]);
      response.line_chart_data[country].sort(
        (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
      );

      response.line_chart_data[country].forEach((item) => {
        item[country] = item.count;
      });
      responseComapreTime.line_chart_data[country].forEach((item) => {
        item[country] = item.count;
        item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
      });
      console.log(
        "...............jkl responseComapreTime",
        responseComapreTime.line_chart_data[country]
      );

      setData(response, "Data");
      setBarChartData(response.bar_graph_data[option]);
      setLineChartData(response.line_chart_data[option]);
      setBackUpLineChartData(response.line_chart_data[option]);
      setLoading(false);
    }
  };

  const onHandleCompareTimeMonthChange = async (item) => {
    setLoading(true);

    let fromDateCompareTime = "2022-05-01";
    let toDateCompareTime = moment().format("YYYY-MM-DD");
    let country = item;
    try {
      setDateValue(item);
      const response = await compareTime(
        // fromDate,
        // toDate,
        fromDateCompareTime,
        toDateCompareTime,
        country
      );

      // let tempBarData = JSON.parse(JSON.stringify(chooseTimeBarData));
      // console.log(response.bar_graph_data[selectCountry]);
      // if (
      //   response &&
      //   response.bar_graph_data &&
      //   response.bar_graph_data[selectCountry]
      // ) {
      //   tempBarData.series[0].data[0].y =
      //     response.bar_graph_data[selectCountry].happy;
      //   // tempData.tooltip.headerFormat = `<strong><span style="color:#212121; font-size: 16px;">{point.key}</span></strong><br>`;
      //   // tempData.tooltip.pointFormat = `</strong><br><span style="color:#212121">Positive:<span> <strong><span style="color:#F05728">${parseFloat(
      //   //   response.bar_graph_data[selectCountry].happy
      //   // ).toFixed(
      //   //   2
      //   // )}%</span></strong><br/>Negative: <strong><span style="color:#F05728">${parseFloat(
      //   //   response.bar_graph_data[selectCountry].sad
      //   // ).toFixed(2)}%</span></strong>`;
      // }
      // if (barChartData) {
      //   tempBarData.series[0].data[1].y = barChartData.happy;
      //   // tempData.tooltip.pointFormat = `</strong><br/>Happy: <strong>${response.data[i].happy}</strong><br/>Sad: <strong>${response.data[i].sad_per}</strong>`;
      //   // }
      // }

      // setChooseTimeBarDataState(tempBarData);

      let tempData = [...chooseTimeLineChartData];
      console.log("initial world tempData", tempData);

      console.log(
        "response.line_chart_data[country]",
        response.line_chart_data[country]
      );
      for (let i = 0; i < tempData.length; i++) {
        tempData[i]["compare"] = 0;
      }
      let equal_ids = [];

      if (
        response &&
        response.line_chart_data &&
        response.line_chart_data[country] &&
        response.line_chart_data[country].length
      ) {
        let countryData = response.line_chart_data[country];

        for (let i = 0; i < countryData.length; i++) {
          for (let j = 0; j < tempData.length; j++) {
            if (!equal_ids.includes(tempData[j].MonthValue)) {
              equal_ids.push(tempData[j].MonthValue);
            }
            if (countryData[i].MonthValue === tempData[j].MonthValue) {
              if (countryData[i]) {
                tempData[j]["compare"] = countryData[i].count;
              }
            }
          }
        }

        for (let i = 0; i < countryData.length; i++) {
          if (!equal_ids.includes(countryData[i].MonthValue)) {
            countryData[i]["compare"] = countryData[i]["count"];
            countryData[i]["count"] = 0;
            tempData.push(countryData[i]);
          }
        }
      }

      // tempData.sort((a, b) => b._id.split("-")[2] - a._id.split("-")[2]);
      console.log(" final tempData", tempData);
      tempData.forEach((item) => {
        item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
      });
      // tempData.forEach((item) => {
      //   item[country] = item.count;
      //   item[country] = item.compare;
      // });

      // setBarChartData(response.bar_graph_data);
      setChooseTimeLineChartData(tempData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("No records found in Data Lake...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBa: true,
        newestOnTop: false,
        rtl: false,
        toastClassName: "dark-toast",
      });
    }
  };

  const getTheNameOfMonth = (month) => {
    let months = [
      "",
      "",
      "",
      "",
      "May, 2022",
      "June, 2022",
      "July, 2022",
      "August, 2022",
      "September, 2022",
      "October, 2022",
    ];
    return months[month];
  };

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

        let fromDatetime = "2022-05-01";
        // let toDatetime = "2022-09-12";
        let country = countryValue || "Worldwide";
        var currentDate = moment().format("YYYY-MM-DD");
        // var pastMonthDate = moment().subtract(1, "M").format("DD-MM-YYYY");
        // console.log(currentDate, futureMonth);

        const response = await compareCountry(
          fromDate,
          toDate,
          country,
          influencerValue,
          hashtagValue
        );
        const responseComapreTime = await compareTime(
          // fromDatetime,
          // toDatetime,
          fromDatetime,
          currentDate,
          country,
          influencerValue,
          hashtagValue
        );
        const countryDropdown = await getCountryDropdownData();

        response.line_chart_data[country].sort(
          (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
        );

        response.line_chart_data[country].forEach((item) => {
          item[country] = item.count;
        });
        responseComapreTime.line_chart_data[country].forEach((item) => {
          item[country] = item.count;
          item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
        });
        console.log(
          "...............jkl responseComapreTime",
          responseComapreTime.line_chart_data[country]
        );
        setCountrySelect(countryDropdown);
        setCountryDropBackUpData(countryDropdown);
        setBarChartData(response.bar_graph_data[country]);
        setLineChartData(response.line_chart_data[country]);
        setBackUpLineChartData(response.line_chart_data[country]);
        setChooseTimeLineChartData(
          responseComapreTime.line_chart_data[country]
        );
        setLoading(false);
        dispatch({
          type: UPDATE_LOADERS,
          payload: {
            field: "countryLineChartLoading",
            value: false,
          },
        });
      };
      callApi();
    }
    // eslint-disable-next-line
  }, [countryLineChartLoading]);

  /////////////////////////////////////////////////////////////
  useEffect(() => {
    setLoading(true);
    const loadUsers = async () => {
      const countryData = await getCountryDropdownData(page);
      setCountrySelect((prev) => [...prev, ...countryData]);
    };
    setLoading(false);
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

  const onCountryNameAdd = (event) => {
    //   setShowDropDown(true);
    setContryNameState(event.target.value);
    //   let tempCountryFilter = [...countryDropBackUpData];
    //   const countryFilter = tempCountryFilter.filter((value) => {
    //     return value.toLowerCase().includes(contryNameState.toLowerCase());
    //   });
    //   setCountrySelect(countryFilter);
  };

  // const [inputValue, setInputValue] = useState("");

  // const onAddCountry = (event) => {
  //   setShowDropDown(true);
  //   setInputValue(event.target.value);
  //   let tempCountryFilter = [...countryDropBackUpData];
  //   const countryFilter = tempCountryFilter.filter((value) => {
  //     return value.toLowerCase().includes(inputValue.toLowerCase());
  //   });
  //   setCountrySelect(countryFilter);
  // };

  // const onCountryInputChange = async (searchValue) => {
  //   // setLoading(true);
  //   const countryData = await getCountryDropdownData(1, searchValue);
  //   setCountrySelect(countryData);
  //   setLoading(false);
  // };

  // const onDropDownClick = (value) => {
  //   setContryNameState(value);
  //   setShowDropDown(false);
  // };

  return (
    <>
      {router.pathname === "/LineChart" ? <Header /> : ""}
      {router.pathname === "/LineChart" ? (
        <button onClick={navigateHome} type="button" className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      ) : (
        ""
      )}

      <div className="lineChart-container">
        <div className="whole-container">
          <div className="heading-content">
            <div className="heading">
              Wellbeing Index Analysis over Time
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
                      Wellbeing Analysis over Time
                    </p>
                    This line graph compares the wellbeing index across
                    countries and over time.
                  </div>
                }
              >
                <img className="info-icon" src={infoIcon}></img>
              </Tippy>
            </div>

            <div className="right-icons">
              {/* <button type="button" alt="downloadIcon" className="d-icon">
                <img alt="download-icon" src={downloadIcon}></img>
              </button> */}
              {/* <button
                onClick={() => setOpenModal(true)}
                type="button"
                alt="shareIcon"
                className="s-icon"
              >
                <img alt="share-icon" src={shareIcon}></img>
              </button> */}
            </div>
          </div>

          {/* DATE AND COUNTRY BUTTONS */}

          <div className="buttons">
            <div className="left-button">
              <div className="select-country-btn">
                <CountryAndDateButton
                  disabled={false}
                  options={countrySelect}
                  handleChange={handleChange}
                  selected={selectCountry}
                  setSelected={setselectCountry}
                  loading={loading}
                  lastUserRef={lastUserRef}
                />
              </div>
              <div className="select-date-btn">
                {/* <CountryAndDateButton
                  disabled={dateValue}
                  options={dateSelect}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
              </div>
            </div>

            {/* COMPARE COUNTRY AND COMPARE TIME BUTTONS */}

            <div className="right-button">
              <CountryAndTimeButton
                onClick={() => setCompareCountryActive("compareCountry")}
                compareCountryActive={compareCountryActive}
                compareCountryvalue="compareCountry"
                value="compareCountry"
                name="Compare Country"
              />

              <CountryAndTimeButton
                onClick={() => setCompareCountryActive("compareTime")}
                compareCountryActive={compareCountryActive}
                value="compareTime"
                compareTimevalue="compareTime"
                name="Compare Time"
              />
            </div>
          </div>

          {!compareCountryActive ? <div className="border"></div> : null}

          {/* COMPARE COUNTRY */}

          {compareCountryActive === "compareCountry" && (
            <CompareCountry
              title={selectCountry}
              addCountry={addCountry}
              AddCountryonClick={() => setaddCountry(!addCountry)}
              closeAddCountry={closeAddCountry}
              addCountryClickName="Add country"
              isValue={isValue}
              onKeyDown={onCountryEnterPress}
              onChange={onCountryNameAdd}
              value={contryNameState}
              options={countrySelect}
              // lastUserRef={lastUserRef}
              // onDropDownClick={onDropDownClick}
              // showDropDown={showDropDown}
              // onCountryInputChange={onCountryInputChange}
            />
          )}

          {/* COMPARE TIME */}

          {compareCountryActive === "compareTime" && (
            <CompareTime
              // title={"June, 2022"}
              dateValue={dateValue}
              onHandleCompareTimeMonthChange={onHandleCompareTimeMonthChange}
              chooseTimeClick={() => setChooseTime(!chooseTime)}
              chooseTime={chooseTime}
              // chooseTimeDropdownClick={() => setDateValue("July, 2022")}
              setDateClick={() => setDateValue("")}
              title={selectCountry}
              countrySelect={countrySelect}
            />
          )}
        </div>

        {/* LINE CHART */}

        <div className="chart">
          {compareCountryActive === "compareCountry" && (
            <CompareCountryLineChart
              loading={loading}
              barData={barChartData}
              dataForLineBarChart={dataForLineBarChart}
              lineChartData={LineChartData}
              isValue={isValue}
              compareCountryActive={compareCountryActive === "compareCountry"}
              selectCountry={selectCountry}
              contryNameState={contryNameState}
            />
          )}
          {compareCountryActive === "compareTime" && (
            <CompareTimeLineChart
              dateValue={dateValue}
              compareTimeActive={compareCountryActive === "compareTime"}
              chooseTimeLineChartData={chooseTimeLineChartData}
              chooseTimeBarDataState={chooseTimeBarDataState}
              selectCountry={selectCountry}
              contryNameState={dateValue}
              loading={loading}
            />
          )}
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        toastClassName="dark-toast"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* MODAL */}

      <div>
        {openModal && (
          <Modal linechartModal={openModal} closeModal={setOpenModal} />
        )}
      </div>
    </>
  );
};

export default LineChartData;
