import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import xCircle from "../../../../Images/x-circle.svg";
import threeDots from "../../../../Images/threeDots.svg";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../../../context/FilterContext";
import { getCountryDropdownData } from "../../../../actions/DropDownApis";

const CompareTime = ({
  title,
  dateValue,
  chooseTimeClick,
  chooseTime,
  chooseTimeDropdownClick,
  onHandleCompareTimeMonthChange,
  setDateClick,
  countrySelect,
}) => {
  const { dispatch, state } = useContext(FilterContext);
  const {
    filters: { countryValue },
  } = state;
  const date = Date.now();
  var check = moment(date);
  // const day = check.format("dddd"); // => ('Monday' , 'Tuesday' ----)
  const month = check.format("MMMM");
  const year = check.format("YYYY");
  const [monthsList, setMonthsList] = useState([]);
  const [countryDropValues, setCountryDropValues] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadUsers = async () => {
      const countryDropdown = await getCountryDropdownData(page);
      setCountryDropValues((prev) => [...prev, ...countryDropdown]);
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

  useEffect(() => {
    const date = moment();
    const month = date.format("M");
    // let tempMonths = fullMonthsList.filter((item) => +item.value < +month);

    setMonthsList(fullMonthsList);
  }, []);

  return (
    <>
      <div className="Add-country">
        <div className="country">
          <img alt="threeDots" src={threeDots} />
          <p className="title">{countryValue ? countryValue : title}</p>
          {/* <p className="title">September, 2022</p> */}
        </div>

        {!dateValue && (
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
                <p style={{ fontWeight: 600, marginTop: 0 }}>Choose Country</p>
                Choose a time period for comparison of a country's wellbeing
                index score.
              </div>
            }
          >
            <div className="country-time">
              <button
                onClick={chooseTimeClick}
                className={`${
                  !chooseTime ? "compare-time" : "compare-time-with-border"
                }`}
              >
                <>
                  <span className="faplus">
                    {!chooseTime ? (
                      <FontAwesomeIcon icon={faAngleDown} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleUp} />
                    )}
                  </span>

                  <p className="title">Choose Country</p>
                  {chooseTime && (
                    <div
                      style={{ fontFamily: "Work-Sans" }}
                      className="dropdown-content"
                    >
                      {countryDropValues.map((item, index) =>
                        countryDropValues.length === index + 1 ? (
                          <div
                            ref={lastUserRef}
                            style={{ fontFamily: "Work-Sans" }}
                            key={item.value}
                            onClick={() => onHandleCompareTimeMonthChange(item)}
                            className="drop-item"
                          >
                            {item}
                          </div>
                        ) : (
                          <div
                            ref={lastUserRef}
                            style={{ fontFamily: "Work-Sans" }}
                            key={item.value}
                            onClick={() => onHandleCompareTimeMonthChange(item)}
                            className="drop-item"
                          >
                            {item}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </>
              </button>
            </div>
          </Tippy>
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
