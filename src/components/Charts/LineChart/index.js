import React, { useEffect, useState } from "react";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
import downloadIcon from "../../../Images/download-2.svg";
import shareIcon from "../../../Images/share-3.svg";
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
import { chooseTimeBarData, LineChartBarData } from "./Chart/data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const LineChartData = () => {
  const [selected, setSelected] = useState("Past 1 months");
  const [selectCountry, setselectCountry] = useState("World");
  const [data, setData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [LineChartData, setLineChartData] = useState([]);

  const dateSelect = [
    "Past Day ",
    "Past 7 Days",
    "Past 30 Days",
    "Past 90 Days",
    "Past Year",
  ];
  const countrySelect = ["United States", "Canada", "World"];
  const [openModal, setOpenModal] = useState(false);
  const router = useLocation();
  const navigate = useNavigate();
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

  const navigateHome = () => {
    navigate("/");
  };

  const onCountryNameAdd = (event) => {
    setContryNameState(event.target.value);
  };

  const onCountryEnterPress = async (e) => {
    if (e.key === "Enter") {
      if (
        countrySelect
          .map((x) => x.toLowerCase())
          .includes(e.target.value.toLowerCase())
      ) {
        setIsValue(true);
        let fromDate = "2022-07-01";
        let toDate = "2022-07-31";
        let country = e.target.value;
        try {
          const response = await compareCountry(fromDate, toDate, country);

          let tempBarData = JSON.parse(JSON.stringify(LineChartBarData));
          console.log(response.bar_graph_data[country]);
          if (
            response &&
            response.bar_graph_data &&
            response.bar_graph_data[country]
          ) {
            tempBarData.series[0].data[0].y =
              response.bar_graph_data[country].happy;
            // tempData.tooltip.pointFormat = `</strong><br/>Happy: <strong>${response.data[i].happy}</strong><br/>Sad: <strong>${response.data[i].sad_per}</strong>`;
            // }
          }
          if (barChartData) {
            tempBarData.series[0].data[1].y = barChartData.happy;
            // tempData.tooltip.pointFormat = `</strong><br/>Happy: <strong>${response.data[i].happy}</strong><br/>Sad: <strong>${response.data[i].sad_per}</strong>`;
            // }
          }

          setDataForLineBarChart(tempBarData);

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
          tempData.sort((a, b) => b._id.split("-")[2] - a._id.split("-")[2]);
          console.log("tempData", tempData);

          // setBarChartData(response.bar_graph_data);
          setLineChartData(tempData);
        } catch (error) {
          toast.error("Server error...", {
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
    let country = option;
    let fromDate = "2022-07-01";
    let toDate = "2022-07-31";

    const response = await compareCountry(fromDate, toDate, country);

    setData(response, "Data");
    setBarChartData(response.bar_graph_data[option]);
    setLineChartData(response.line_chart_data[option]);
    setBackUpLineChartData(response.line_chart_data[option]);
  };

  const onHandleCompareTimeMonthChange = async (item) => {
    let fromDate = "2022-06-01";
    let toDate = "2022-06-30";

    try {
      setDateValue(item.month);
      const response = await compareTime(fromDate, toDate, selectCountry);

      let tempBarData = JSON.parse(JSON.stringify(chooseTimeBarData));
      console.log(response.bar_graph_data[selectCountry]);
      if (
        response &&
        response.bar_graph_data &&
        response.bar_graph_data[selectCountry]
      ) {
        tempBarData.series[0].data[0].y =
          response.bar_graph_data[selectCountry].happy;
        // tempData.tooltip.pointFormat = `</strong><br/>Happy: <strong>${response.data[i].happy}</strong><br/>Sad: <strong>${response.data[i].sad_per}</strong>`;
        // }
      }
      if (barChartData) {
        tempBarData.series[0].data[1].y = barChartData.happy;
        // tempData.tooltip.pointFormat = `</strong><br/>Happy: <strong>${response.data[i].happy}</strong><br/>Sad: <strong>${response.data[i].sad_per}</strong>`;
        // }
      }

      setChooseTimeBarDataState(tempBarData);

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
            if (!equal_ids.includes(tempData[j].week)) {
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

      // setBarChartData(response.bar_graph_data);
      setChooseTimeLineChartData(tempData);
    } catch (error) {
      toast.error("Server error...", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBa: true,
        newestOnTop: false,
        rtl: false,
        toastClassName: "dark-toast",
      });
    }
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

      let fromDate = "2022-07-01";
      let toDate = "2022-07-31";
      let country = "World";
      // var currentDate = moment().format("DD-MM-YYYY");
      // var pastMonthDate = moment().subtract(1, "M").format("DD-MM-YYYY");
      // console.log(currentDate, futureMonth);

      const response = await compareCountry(fromDate, toDate, country);
      const responseComapreTime = await compareTime(fromDate, toDate, country);
      console.log("response", response);
      console.log("responseComapreTime4", responseComapreTime);

      // setData(response, "Data");
      setBarChartData(response.bar_graph_data.World);
      setLineChartData(response.line_chart_data.World);
      setBackUpLineChartData(response.line_chart_data.World);
      setChooseTimeLineChartData(responseComapreTime.line_chart_data.World);
    };
    callApi();
  }, []);
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
            <div className="heading">Wellbeing Sentiment Score Over Time</div>
            <div className="right-icons">
              <button type="button" alt="downloadIcon" className="d-icon">
                <img alt="download-icon" src={downloadIcon}></img>
              </button>
              <button
                onClick={() => setOpenModal(true)}
                type="button"
                alt="shareIcon"
                className="s-icon"
              >
                <img alt="share-icon" src={shareIcon}></img>
              </button>
            </div>
          </div>

          {/* DATE AND COUNTRY BUTTONS */}

          <div className="buttons">
            <div className="left-button">
              <div className="select-country-btn">
                <CountryAndDateButton
                  disabled={isValue}
                  options={countrySelect}
                  handleChange={handleChange}
                  selected={selectCountry}
                  setSelected={setselectCountry}
                />
              </div>
              <div className="select-date-btn">
                <CountryAndDateButton
                  disabled={dateValue}
                  options={dateSelect}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </div>

            {/* COMPARE COUNTRY AND COMPARE TIME BUTTONS */}

            <div className="right-button">
              <CountryAndTimeButton
                onClick={() => setCompareCountryActive("compareCountry")}
                compareCountryActive={compareCountryActive}
                value="compareCountry"
                name="Compare Country"
              />

              <CountryAndTimeButton
                onClick={() => setCompareCountryActive("compareTime")}
                compareCountryActive={compareCountryActive}
                value="compareTime"
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
            />
          )}

          {/* COMPARE TIME */}

          {compareCountryActive === "compareTime" && (
            <CompareTime
              title={"June, 2022"}
              dateValue={dateValue}
              onHandleCompareTimeMonthChange={onHandleCompareTimeMonthChange}
              chooseTimeClick={() => setChooseTime(!chooseTime)}
              chooseTime={chooseTime}
              chooseTimeDropdownClick={() => setDateValue("July, 2022")}
              setDateClick={() => setDateValue("")}
              chooseTimeBarDataState={chooseTimeBarDataState}
            />
          )}
        </div>

        {/* LINE CHART */}

        <div className="chart">
          {compareCountryActive === "compareCountry" && (
            <CompareCountryLineChart
              barData={barChartData}
              dataForLineBarChart={dataForLineBarChart}
              lineChartData={LineChartData}
              isValue={isValue}
              compareCountryActive={compareCountryActive === "compareCountry"}
            />
          )}
          {compareCountryActive === "compareTime" && (
            <CompareTimeLineChart
              dateValue={dateValue}
              compareTimeActive={compareCountryActive === "compareTime"}
              chooseTimeLineChartData={chooseTimeLineChartData}
              chooseTimeBarDataState={chooseTimeBarDataState}
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
