import React, { useContext, useEffect, useRef, useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // addDays,
  endOfDay,
  // startOfDay,
  startOfYear,
  // startOfMonth,
  // endOfMonth,
  endOfYear,
  // addMonths,
  addYears,
  // startOfWeek,
  // endOfWeek,
  isSameDay,
  addDays,
  // differenceInCalendarDays,
} from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../../context/FilterContext";
import moment from "moment";
import { TOGGLE_CALENDER } from "../../../actions/types";

const CalenderButton = ({ icon }) => {
  const { state, dispatch } = useContext(FilterContext);
  const {
    filters: { calenderToggler },
  } = state;

  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const [dateState, setDateState] = useState([
    {
      startDate: firstDay,
      endDate: date,
      key: "selection",
    },
  ]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          calenderToggler(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function handleSelect(ranges) {
    setDateState([ranges.selection]);
    let dateObj = {
      fromDate: moment(ranges.selection.startDate).format("YYYY-MM-DD"),
      toDate: moment(ranges.selection.endDate).format("YYYY-MM-DD"),
    };
    dispatch({
      type: "SET_FILTERS",
      payload: { field: "dateRangeValue", value: dateObj },
    });
  }

  const onFilterBUttonClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    dispatch({ type: TOGGLE_CALENDER });
  };

  return (
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
          <p style={{ fontWeight: 600, marginTop: 0 }}>Date picker</p>
          Choose the start and end dates on the calendar to apply the date range
          filter.
        </div>
      }
    >
      <button
        onClick={onFilterBUttonClick}
        className={`${
          calenderToggler
            ? "dropdown-filter-button-calender-colored"
            : "dropdown-filter-button-calender"
        }`}
      >
        <div className="dropdown-filter-content-calender">
          <div className="filter-content">
            <img className="user-Icon" src={icon}></img>
            <p style={{ fontFamily: "Work-Sans" }} className="filter-title">
              Select Dates
            </p>
          </div>
          <div className="dropdown-Icon">
            {!calenderToggler ? (
              <FontAwesomeIcon className="faAngleDown" icon={faAngleDown} />
            ) : (
              <FontAwesomeIcon className="faAngleDown" icon={faAngleUp} />
            )}
          </div>
        </div>
        {calenderToggler && (
          <div
            ref={wrapperRef}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
            className="calender"
          >
            <DateRangePicker
              rangeColors={["#F05728", "#F05728", "#F05728"]}
              onChange={handleSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={dateState}
              direction="horizontal"
            />
          </div>
        )}
      </button>
    </Tippy>
  );
};

export default CalenderButton;
