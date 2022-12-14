import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import xCircle from "../../../../Images/x-circle.svg";
import threeDots from "../../../../Images/threeDots.svg";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../../../context/FilterContext";
import { getCountryDropdownData } from "../../../../actions/DropDownApis";
import { BeatLoader } from "react-spinners";

const CompareTime = ({
  title,
  dateValue,
  setDateClick,
  CompareTimeDropDownClick,
  // chooseTimeClick,
  // chooseTime,
  // chooseTimeDropdownClick,
  // countrySelect,
  countryDropValues,
  dropdownVisible,
  onCountryInputChangeNew,
  DropDownFilter,
  contryNameState,
  lastUserRef,
  showDropDown,
  loading,
  setShowDropDown,
}) => {
  const { state } = useContext(FilterContext);
  const {
    filters: { countryValue },
  } = state;
  const date = Date.now();
  var check = moment(date);
  // const day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
  const month = check.format("MMMM");
  const year = check.format("YYYY");
  const [monthsList, setMonthsList] = useState([]);
  // const [countryDropValues, setCountryDropValues] = useState([]);
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(true);
  // const [inputValue, setInputValue] = useState("");
  // const [dropdownBackUp, setDropdownBackUp] = useState([]);
  // const [showDropDown, setShowDropDown] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   const loadUsers = async () => {
  //     const countryDropdown = await getCountryDropdownData(page);
  //     setCountryDropValues((prev) => [...prev, ...countryDropdown]);
  //     setDropdownBackUp(countryDropdown);
  //   };
  //   setLoading(false);
  //   loadUsers();
  // }, [page]);

  useEffect(() => {
    const date = moment();
    const month = date.format("M");
    // let tempMonths = fullMonthsList.filter((item) => +item.value < +month);

    setMonthsList(fullMonthsList);
  }, []);

  // const observer = useRef();

  // const lastUserRef = useCallback(
  //   (node) => {
  //     if (loading) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         setPage((page) => page + 1);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [loading]
  // );

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropDown(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const fullMonthsList = [
    // {
    //   value: "01",
    //   month: "January, 2022",
    // },
    // {
    //   value: "02",
    //   month: "February, 2022",
    // },
    // {
    //   value: "03",
    //   month: "March, 2022",
    // },
    // {
    //   value: "04",
    //   month: "April, 2022",
    // },
    // {
    //   value: "05",
    //   month: "May, 2022",
    // },
    // {
    //   value: "06",
    //   month: "June, 2022",
    // },
    // {
    //   value: "07",
    //   month: "July",
    // },
    {
      value: "08",
      month: "August, 2022",
    },
    // {
    //   value: "09",
    //   month: "September",
    // },
    // {
    //   value: "10",
    //   month: "October",
    // },
    // {
    //   value: "11",
    //   month: "November",
    // },
    // {
    //   value: "12",
    //   month: "December",
    // },
  ];

  // const DropDownFilter = (e) => {
  //   setShowDropDown(true);
  //   setInputValue(e.target.value);
  //   let filterData = [...dropdownBackUp];
  //   const countryFilter = filterData.filter((value) => {
  //     return value.toLowerCase().includes(inputValue.toLowerCase());
  //   });
  //   setCountryDropValues(countryFilter);
  // };

  // const onCountryInputChange = async (searchValue) => {
  //   setLoading(true);
  //   const countryData = await getCountryDropdownData(1, searchValue);
  //   setCountryDropValues(countryData);
  //   setLoading(false);
  // };

  // const dropdownVisible = () => {
  //   setShowDropDown(false);
  // };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div className="Add-country">
        <div className="country">
          <img alt="threeDots" src={threeDots} />
          <p className="title">{countryValue ? countryValue : title}</p>
          {/* <p className="title">September, 2022</p> */}
        </div>
        {!isActive ? (
          <button
            onClick={() => setIsActive(!isActive)}
            className="country-add"
          >
            <>
              <span className="faplus">
                <FontAwesomeIcon icon={faPlus} />
              </span>

              <p
                style={{
                  fontFamily: "Work-Sans",
                }}
                className="title"
              >
                Choose Country
              </p>
            </>
          </button>
        ) : (
          !dateValue && (
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
                  <p
                    style={{
                      fontWeight: 600,
                      marginTop: 0,
                    }}
                  >
                    Choose Country
                  </p>
                  Choose a time period for comparison of a country's wellbeing
                  inetrest score.
                </div>
              }
            >
              <div className="country-time">
                <button
                  ref={wrapperRef}
                  onClick={dropdownVisible}
                  className="compare-time"
                >
                  <>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        style={{
                          padding: "1rem",
                          background: "transparent",
                          border: "none",
                          fontSize: "1.25rem",
                          outline: "none",
                          fontFamily: "Work-Sans",
                          textAlign: "center",
                        }}
                        type="text"
                        className="compare-time-input"
                        placeholder="Search country name"
                        value={contryNameState}
                        onChange={(e) => {
                          DropDownFilter(e);
                          onCountryInputChangeNew(e.target.value);
                        }}
                      />
                    </div>
                    {showDropDown && contryNameState && (
                      <>
                        <div className="dropdown-wrapper">
                          <div
                            style={{ fontFamily: "Work-Sans" }}
                            className="dropdown-content"
                          >
                            {loading ? (
                              <BeatLoader
                                color="#F05728"
                                loading={true}
                                size={10}
                              />
                            ) : (
                              <>
                                {countryDropValues.map((item, index) =>
                                  countryDropValues.length === index + 1 ? (
                                    <div
                                      ref={lastUserRef}
                                      style={{ fontFamily: "Work-Sans" }}
                                      key={item.value}
                                      onClick={() =>
                                        CompareTimeDropDownClick(item)
                                      }
                                      className="drop-item"
                                    >
                                      {item}
                                    </div>
                                  ) : (
                                    <div
                                      ref={lastUserRef}
                                      style={{ fontFamily: "Work-Sans" }}
                                      key={item.value}
                                      onClick={() =>
                                        CompareTimeDropDownClick(item)
                                      }
                                      className="drop-item"
                                    >
                                      {item}
                                    </div>
                                  )
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                </button>
              </div>
            </Tippy>
          )
        )}

        {dateValue && (
          <div className="country-added">
            <span className="circle-line-added-country-time"></span>
            <p className="title-line-added-country">
              {dateValue}
              <button className="close-addCountry-btn" onClick={setDateClick}>
                <img alt="xCircle" src={xCircle} />
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CompareTime;
