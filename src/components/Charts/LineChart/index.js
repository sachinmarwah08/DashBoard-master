import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import "./index.scss";
import moment from "moment";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/svg-arrow.css";
import Modal from "../../Modal/Modal";
import CompareTime from "./CompareTime/Filter";
import "react-toastify/dist/ReactToastify.css";
import infoIcon from "../../../Images/info.svg";
import Header from "../../Layouts/Header/Header";
import CompareCountry from "./CompareCountry/Filter";
import { ToastContainer, toast } from "react-toastify";
import { UPDATE_LOADERS } from "../../../actions/types";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterContext } from "../../../context/FilterContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CompareTimeLineChart from "./CompareTime/CompareTimeLineChart";
import { getCountryDropdownData } from "../../../actions/DropDownApis";
import CountryAndDateButton from "./Buttons/CountryAndDateButton/Button";
import CountryAndTimeButton from "./Buttons/CountryAndTimeButton/Button";
import { compareCountry, compareTime } from "../../../actions/LineChartApis";
import CompareCountryLineChart from "./CompareCountry/CompareCountryLineChart";
// import SelectSearch from "react-select-search";
// import downloadIcon from "../../../Images/download-2.svg";
// import shareIcon from "../../../Images/share-3.svg";
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

  const router = useLocation();
  const [selectCountry, setselectCountry] = useState("Worldwide");
  const [compareCountryActive, setCompareCountryActive] =
    useState("compareCountry");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isValue, setIsValue] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [chooseTime, setChooseTime] = useState(false);
  const [contryNameState, setContryNameState] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [barChartData, setBarChartData] = useState([]);
  const [LineChartData, setLineChartData] = useState([]);
  const [countrySelect, setCountrySelect] = useState([]);
  const [backUpLineChartData, setBackUpLineChartData] = useState([]);
  const [dataForLineBarChart, setDataForLineBarChart] = useState([]);
  const [chooseTimeLineChartData, setChooseTimeLineChartData] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [countryDropBackUpData, setCountryDropBackUpData] = useState([]);
  const [chooseTimeBarDataState, setChooseTimeBarDataState] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [countryDropValues, setCountryDropValues] = useState([]);
  const [dropdownBackUp, setDropdownBackUp] = useState([]);
  const [backupCompareTimeLineChart, setBackupCompareTimeLineChart] = useState(
    []
  );
  // const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(true);
  // const [inputValue, setInputValue] = useState("");
  // const [selected, setSelected] = useState("Past 1 months");
  // const [addCountry, setaddCountry] = useState(false);

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

        let country = countryValue || "Worldwide";
        var currentDate = moment().subtract(1, "days").format("YYYY-MM-DD");
        let fromDatetime = "2022-05-01";

        let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
          ? false
          : null;

        const response = await compareCountry(
          fromDate,
          toDate,
          country,
          influencerValue,
          hashtagValue,
          c
        );
        const responseComapreTime = await compareTime(
          fromDatetime,
          currentDate,
          country,
          influencerValue,
          hashtagValue,
          c
        );
        const countryDropdown = await getCountryDropdownData();

        // response.line_chart_data[country].sort(
        //   (a, b) => b._id.split("-")[2] - a._id.split("-")[2]
        // );

        response.line_chart_data[country].sort(function (a, b) {
          return new Date(a._id) - new Date(b._id);
        });

        response.line_chart_data[country].forEach((item) => {
          item[country] = item.count;
        });

        responseComapreTime.line_chart_data[country].forEach((item) => {
          item[country] = item.count;
          item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
        });

        let tempBarData = [];

        tempBarData[0] = {
          name: country,
          pv: response.bar_graph_data[country].happy,
          sad: response.bar_graph_data[country].sad,
        };

        let tempChooseTimeBarData = [];

        tempChooseTimeBarData[0] = {
          name: country,
          pv: response.bar_graph_data[country].happy,
          sad: response.bar_graph_data[country].sad,
        };

        setDataForLineBarChart(tempBarData);
        setChooseTimeBarDataState(tempChooseTimeBarData);
        setCountryDropValues(countryDropdown);
        setCountrySelect(countryDropdown);
        setBarChartData(response.bar_graph_data[country]);
        setLineChartData(response.line_chart_data[country]);
        setBackUpLineChartData(response.line_chart_data[country]);
        console.log(response.line_chart_data[country], "line chart");
        setChooseTimeLineChartData(
          responseComapreTime.line_chart_data[country]
        );
        setBackupCompareTimeLineChart(
          responseComapreTime.line_chart_data[country]
        );
        setCountryDropBackUpData(countryDropdown);
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
  }, [countryLineChartLoading]);

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

  const navigateHome = () => {
    navigate("/");
  };

  // function twoDecimalPlacesIfCents(amount) {
  //   return amount % 1 !== 0 ? amount.toFixed(2) : amount;
  // }

  const closeAddCountry = () => {
    setLineChartData(backUpLineChartData);
    setContryNameState("");
    setIsValue(false);
  };

  const closeChooseTime = () => {
    // setChooseTimeLineChartData(backUpLineChartData);
    setContryNameState("");
    setDateValue(false);
  };

  const getTheNameOfMonth = (month) => {
    let months = [
      "January, 2022",
      "February, 2022",
      "March, 2022",
      "April, 2022",
      "May, 2022",
      "June, 2022",
      "July, 2022",
      "August, 2022",
      "September, 2022",
      "October, 2022",
    ];
    return months[month];
  };

  // const onCountryNameAdd = (event) => {
  //   setContryNameState(event.target.value);
  //   setShowDropDown(true);
  // };

  // const onCountryEnterPress = async (e) => {
  //   if (e.key === "Enter") {
  //     setLoading(true);
  //     if (
  //       newCoutrySelect
  //         .map((x) => x.toLowerCase())
  //         .includes(e.target.value.toLowerCase())
  //     ) {
  //       setIsValue(true);

  //       let country = e.target.value;
  //       try {
  //         const response = await compareCountry(fromDate, toDate, country);

  //         console.log(response.bar_graph_data[country].happy, "coming heere");

  //         // BAR CHART

  //         let tempBarData = [];

  //         tempBarData[0] = { ...dataForLineBarChart[0] };

  //         tempBarData[1] = {
  //           name: country,
  //           pv: response.bar_graph_data[country].happy,
  //           sad: response.bar_graph_data[country].sad,
  //         };

  //         setDataForLineBarChart(tempBarData);

  //         // BAR CHART

  //         let tempData = [...LineChartData];
  //         for (let i = 0; i < tempData.length; i++) {
  //           tempData[i]["compare"] = 0;
  //         }
  //         let equal_ids = [];

  //         if (
  //           response &&
  //           response.line_chart_data &&
  //           response.line_chart_data[country] &&
  //           response.line_chart_data[country].length
  //         ) {
  //           let countryData = response.line_chart_data[country];

  //           for (let i = 0; i < countryData.length; i++) {
  //             for (let j = 0; j < tempData.length; j++) {
  //               if (!equal_ids.includes(tempData[j]._id)) {
  //                 equal_ids.push(tempData[j]._id);
  //               }
  //               if (countryData[i]._id === tempData[j]._id) {
  //                 if (countryData[i]) {
  //                   tempData[j]["compare"] = countryData[i].count;
  //                 }
  //               }
  //             }
  //           }

  //           for (let i = 0; i < countryData.length; i++) {
  //             if (!equal_ids.includes(countryData[i]._id)) {
  //               countryData[i]["compare"] = countryData[i]["count"];
  //               countryData[i]["count"] = 0;
  //               tempData.push(countryData[i]);
  //             }
  //           }
  //         }

  //         response.line_chart_data[country].sort(
  //           (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
  //         );

  //         tempData.forEach((item) => {
  //           item[selectCountry] = item.count;
  //           item[country] = item.compare;
  //         });

  //         setLineChartData(tempData);
  //         setLoading(false);
  //       } catch (error) {
  //         toast.error("No records found in Data Lake...", {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBa: true,
  //           newestOnTop: false,
  //           rtl: false,
  //           toastClassName: "dark-toast",
  //         });
  //       }
  //     } else {
  //       toast.error("Country not found", {
  //         position: "top-right",
  //         autoClose: 1000,
  //         hideProgressBa: true,
  //         newestOnTop: false,
  //         rtl: false,
  //         toastClassName: "dark-toast",
  //       });
  //     }
  //   }
  // };

  const handleChange = async (option) => {
    setLoading(true);
    if (contryNameState && isValue) {
      setLoading(true);
      // if (
      //   selectCountry
      //     .map((x) => x.toLowerCase())
      //     .includes(contryNameState.toLowerCase())
      // ) {
      // setIsValue(true);
      let country = isValue;

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      try {
        const dropResponse = await compareCountry(
          fromDate,
          toDate,
          option,
          "",
          "",
          c
        );
        const response = await compareCountry(
          fromDate,
          toDate,
          country,
          "",
          "",
          c
        );

        // dropResponse.line_chart_data[option].sort(
        //   (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
        // );

        dropResponse.line_chart_data[option].sort(function (a, b) {
          return new Date(a._id) - new Date(b._id);
        });

        // BAR CHART

        let tempBarData = [...dataForLineBarChart];

        tempBarData[0] = { ...dataForLineBarChart[0] };

        tempBarData[0] = {
          name: option,
          pv: dropResponse.bar_graph_data[option].happy,
          sad: dropResponse.bar_graph_data[option].sad,
        };

        setDataForLineBarChart(tempBarData);

        // BAR CHART

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
        // response.line_chart_data[country].sort(
        //   (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
        // );

        response.line_chart_data[country].sort(function (a, b) {
          return new Date(a._id) - new Date(b._id);
        });

        tempData.forEach((item) => {
          item[option] = item.count;
          item[country] = item.compare;
        });

        // setBarChartData(response.bar_graph_data);
        setLineChartData(tempData);
        setBackUpLineChartData(dropResponse.line_chart_data[option]);
        setLoading(false);
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
      // } else {
      //   toast.error("Country not found", {
      //     position: "top-right",
      //     autoClose: 1000,
      //     hideProgressBa: true,
      //     newestOnTop: false,
      //     rtl: false,
      //     toastClassName: "dark-toast",
      //   });
      // }
    } else if (contryNameState && dateValue) {
      setLoading(true);

      // setDateValue(item.month);

      let country = dateValue;

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      try {
        let fromDateCompareTime = "2022-05-01";
        let toDateCompareTime = moment()
          .subtract(1, "days")
          .format("YYYY-MM-DD");

        const dropResponse = await compareTime(
          fromDateCompareTime,
          toDateCompareTime,
          option,
          "",
          "",
          c
        );

        const response = await compareTime(
          fromDateCompareTime,
          toDateCompareTime,
          country,
          "",
          "",
          c
        );

        // BAR CHART

        let tempChooseTimeBarData = [...chooseTimeBarDataState];

        tempChooseTimeBarData[0] = { ...chooseTimeBarDataState[0] };

        tempChooseTimeBarData[0] = {
          name: option,
          pv: dropResponse.bar_graph_data[option].happy,
          sad: dropResponse.bar_graph_data[option].sad,
        };

        setChooseTimeBarDataState(tempChooseTimeBarData);

        // BAR CHART

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

        tempData.forEach((item) => {
          item[option] = item.count;
          item[country] = item.compare;
        });

        dropResponse.line_chart_data[option].forEach((item) => {
          item[option] = item.count;
          item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
        });

        setLoading(false);
        setChooseTimeLineChartData(tempData);
        setBackupCompareTimeLineChart(dropResponse.line_chart_data[option]);
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
      setLoading(true);
      let country = option;
      let fromDateCompareTime = "2022-05-01";
      let toDateCompareTime = moment().subtract(1, "days").format("YYYY-MM-DD");

      let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
        ? false
        : null;

      const response = await compareCountry(
        fromDate,
        toDate,
        country,
        "",
        "",
        c
      );

      // response.line_chart_data[country].sort(
      //   (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
      // );

      response.line_chart_data[country].sort(function (a, b) {
        return new Date(a._id) - new Date(b._id);
      });

      const responseComapreTime = await compareTime(
        fromDateCompareTime,
        toDateCompareTime,
        country,
        "",
        "",
        c
      );

      // BAR CHART

      let tempCompareCountryBarData = [...dataForLineBarChart];

      tempCompareCountryBarData[0] = { ...dataForLineBarChart[0] };

      tempCompareCountryBarData[0] = {
        name: country,
        pv: response.bar_graph_data[country].happy,
        sad: response.bar_graph_data[country].sad,
      };

      setDataForLineBarChart(tempCompareCountryBarData);

      // BAR CHART

      // BAR CHART

      let tempChooseTimeBarData = [...chooseTimeBarDataState];

      tempChooseTimeBarData[0] = { ...chooseTimeBarDataState[0] };

      tempChooseTimeBarData[0] = {
        name: country,
        pv: responseComapreTime.bar_graph_data[country].happy,
        sad: responseComapreTime.bar_graph_data[country].sad,
      };

      setChooseTimeBarDataState(tempChooseTimeBarData);

      // BAR CHART

      let tempData = [...responseComapreTime.line_chart_data[country]];
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
        let countryData = responseComapreTime.line_chart_data[selectCountry];

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

      tempData.forEach((item) => {
        item[selectCountry] = item.count;
        item[selectCountry] = item.compare;
      });

      setChooseTimeLineChartData(responseComapreTime.line_chart_data[option]);

      // response.line_chart_data[country].sort(
      //   (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
      // );

      response.line_chart_data[country].sort(function (a, b) {
        return new Date(a._id) - new Date(b._id);
      });

      response.line_chart_data[country].forEach((item) => {
        item[country] = item.count;
      });

      responseComapreTime.line_chart_data[country].forEach((item) => {
        item[country] = item.count;
        item["MonthName"] = getTheNameOfMonth(item.MonthValue - 1);
      });

      setBarChartData(response.bar_graph_data[option]);
      setLineChartData(response.line_chart_data[option]);
      setBackUpLineChartData(response.line_chart_data[option]);
      setLoading(false);
    }
  };

  const CompareCountryDropDownClick = async (item) => {
    setLoading(true);

    let country = item;
    let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
      ? false
      : null;

    try {
      setIsValue(item);
      const response = await compareCountry(
        fromDate,
        toDate,
        country,
        "",
        "",
        c
      );

      console.log(response.bar_graph_data[country].happy, "coming heere");

      // BAR CHART

      let tempBarData = [];

      tempBarData[0] = { ...dataForLineBarChart[0] };

      tempBarData[1] = {
        name: country,
        pv: response.bar_graph_data[country].happy,
        sad: response.bar_graph_data[country].sad,
      };

      setDataForLineBarChart(tempBarData);

      // BAR CHART

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

      // response.line_chart_data[country].sort(
      //   (a, b) => a._id.split("-")[2] - b._id.split("-")[2]
      // );

      response.line_chart_data[country].sort(function (a, b) {
        return new Date(a._id) - new Date(b._id);
      });

      tempData.forEach((item) => {
        item[selectCountry] = item.count;
        item[country] = item.compare;
      });

      setLineChartData(tempData);
      setLoading(false);
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
  };

  const CompareTimeDropDownClick = async (item) => {
    setLoading(true);

    let fromDateCompareTime = "2022-05-01";
    let toDateCompareTime = moment().subtract(1, "days").format("YYYY-MM-DD");
    let country = item;

    let c = moment(toDate).isSame(moment(new Date()).format("YYYY-MM-DD"))
      ? false
      : null;

    try {
      setDateValue(item);
      const response = await compareTime(
        fromDateCompareTime,
        toDateCompareTime,
        country,
        "",
        "",
        c
      );

      // BAR CHART

      let tempChooseTimeBarData = [];

      tempChooseTimeBarData[0] = { ...chooseTimeBarDataState[0] };

      tempChooseTimeBarData[1] = {
        name: country,
        pv: response.bar_graph_data[country].happy,
        sad: response.bar_graph_data[country].sad,
      };

      setChooseTimeBarDataState(tempChooseTimeBarData);

      // BAR CHART

      let tempData = [...chooseTimeLineChartData];

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

  const onAddCountry = (event) => {
    setInputValue(event.target.value);
    let tempCountryFilter = [...countryDropBackUpData];
    const countryFilter = tempCountryFilter.filter((value) => {
      return value.toLowerCase().includes(inputValue.toLowerCase());
    });
    setCountrySelect(countryFilter);
  };

  const onCountryInputChange = async (searchValue) => {
    // setLoading(true);
    const countryData = await getCountryDropdownData(1, searchValue);
    setCountrySelect(countryData);
    setLoading(false);
  };

  const ClearData = async () => {
    const countryDropdown = await getCountryDropdownData();
    setInputValue("");
    setCountrySelect(countryDropdown);
  };

  useEffect(() => {
    setLoading(true);
    const loadUsers = async () => {
      const countryDropdown = await getCountryDropdownData(page);
      setCountryDropValues((prev) => [...prev, ...countryDropdown]);
      setDropdownBackUp(countryDropdown);
    };
    setLoading(false);
    loadUsers();
  }, [page]);

  const DropDownFilter = (e) => {
    setContryNameState(e.target.value);
    let filterData = [...dropdownBackUp];
    const countryFilter = filterData.filter((value) => {
      return value.toLowerCase().includes(contryNameState.toLowerCase());
    });
    setCountryDropValues(countryFilter);
  };

  const onCountryInputChangeNew = async (searchValue) => {
    // setLoading(true);
    const countryData = await getCountryDropdownData(1, searchValue);
    setCountryDropValues(countryData);
    setLoading(false);
  };

  const dropdownVisible = () => {
    setShowDropDown(true);
  };

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
              Wellbeing Analysis over Time
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
                    This line graph compares the wellbeing interest and
                    sentiment across countries and over time.
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
                  loading={loading}
                  options={countrySelect}
                  selected={selectCountry}
                  lastUserRef={lastUserRef}
                  handleChange={handleChange}
                  setSelected={setselectCountry}
                  onAddCountry={onAddCountry}
                  onSearch={onCountryInputChange}
                  value={inputValue}
                  ClearData={ClearData}
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
                value="compareCountry"
                name="Compare Country"
                compareCountryvalue="compareCountry"
                compareCountryActive={compareCountryActive}
                onClick={() => setCompareCountryActive("compareCountry")}
              />

              <CountryAndTimeButton
                value="compareTime"
                name="Compare Time"
                compareTimevalue="compareTime"
                compareCountryActive={compareCountryActive}
                onClick={() => setCompareCountryActive("compareTime")}
              />
            </div>
          </div>

          {!compareCountryActive ? <div className="border"></div> : null}

          {/* COMPARE COUNTRY */}

          {compareCountryActive === "compareCountry" && (
            <CompareCountry
              isValue={isValue}
              title={selectCountry}
              closeAddCountry={closeAddCountry}
              CompareCountryDropDownClick={CompareCountryDropDownClick}
              lastUserRef={lastUserRef}
              showDropDown={showDropDown}
              loading={loading}
              contryNameState={contryNameState}
              DropDownFilter={DropDownFilter}
              onCountryInputChangeNew={onCountryInputChangeNew}
              dropdownVisible={dropdownVisible}
              countryDropValues={countryDropValues}
              setShowDropDown={setShowDropDown}
              // addCountry={addCountry}
              // addCountryClickName="Add country"
              // AddCountryonClick={() => setaddCountry(!addCountry)}
              // value={contryNameState}
              // options={newCoutrySelect}
              // onChange={onCountryNameAdd}
              // onKeyDown={onCountryEnterPress}
              // onDropDownClick={onDropDownClick}
              // onCountryInputChange={onCountryInputChangeNew}
            />
          )}

          {/* COMPARE TIME */}

          {compareCountryActive === "compareTime" && (
            <CompareTime
              title={selectCountry}
              dateValue={dateValue}
              setDateClick={closeChooseTime}
              CompareTimeDropDownClick={CompareTimeDropDownClick}
              lastUserRef={lastUserRef}
              showDropDown={showDropDown}
              loading={loading}
              contryNameState={contryNameState}
              DropDownFilter={DropDownFilter}
              onCountryInputChangeNew={onCountryInputChangeNew}
              dropdownVisible={dropdownVisible}
              countryDropValues={countryDropValues}
              setShowDropDown={setShowDropDown}
              // chooseTime={chooseTime}
              // countrySelect={countrySelect}
              // chooseTimeClick={() => setChooseTime(!chooseTime)}
              // chooseTimeDropdownClick={() => setDateValue("July, 2022")}
            />
          )}
        </div>

        {/* LINE CHART */}

        <div className="chart">
          {compareCountryActive === "compareCountry" && (
            <CompareCountryLineChart
              loading={loading}
              isValue={isValue}
              barData={barChartData}
              lineChartData={LineChartData}
              selectCountry={selectCountry}
              contryNameState={isValue}
              dataForLineBarChart={dataForLineBarChart}
              compareCountryActive={compareCountryActive === "compareCountry"}
            />
          )}
          {compareCountryActive === "compareTime" && (
            <CompareTimeLineChart
              loading={loading}
              dateValue={dateValue}
              contryNameState={dateValue}
              selectCountry={selectCountry}
              chooseTimeLineChartData={chooseTimeLineChartData}
              chooseTimeBarDataState={chooseTimeBarDataState}
              compareTimeActive={compareCountryActive === "compareTime"}
            />
          )}
        </div>
      </div>

      {/* ERROR MESSAGE */}

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
