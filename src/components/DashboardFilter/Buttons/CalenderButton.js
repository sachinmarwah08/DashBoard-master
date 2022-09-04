import React, { useState } from "react";
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
  // differenceInCalendarDays,
} from "date-fns";
import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import Select from "react-select";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

const CalenderButton = ({ icon, name }) => {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }
  return (
    <button
      onClick={() => setIsFilterActive(!isFilterActive)}
      className={`${
        isFilterActive
          ? "dropdown-filter-button-calender-colored"
          : "dropdown-filter-button-calender"
      }`}
    >
      <div className="dropdown-filter-content-calender">
        <div className="filter-content">
          <img className="user-Icon" src={icon}></img>
          <p className="filter-title">{name}</p>
        </div>
        <div className="dropdown-Icon">
          {!isFilterActive ? (
            <FontAwesomeIcon className="faAngleDown" icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon className="faAngleDown" icon={faAngleUp} />
          )}
        </div>
      </div>
      {isFilterActive && (
        <div className="calender">
          <DateRangePicker
            staticRanges={[
              ...defaultStaticRanges,
              {
                label: "This Year",
                range: () => ({
                  startDate: startOfYear(new Date()),
                  endDate: endOfDay(new Date()),
                }),
                isSelected(range) {
                  const definedRange = this.range();
                  return (
                    isSameDay(range.startDate, definedRange.startDate) &&
                    isSameDay(range.endDate, definedRange.endDate)
                  );
                },
              },
              {
                label: "Last Year",
                range: () => ({
                  startDate: startOfYear(addYears(new Date(), -1)),
                  endDate: endOfYear(addYears(new Date(), -1)),
                }),
                isSelected(range) {
                  const definedRange = this.range();
                  return (
                    isSameDay(range.startDate, definedRange.startDate) &&
                    isSameDay(range.endDate, definedRange.endDate)
                  );
                },
              },
            ]}
            rangeColors={["#F05728", "#F05728", "#F05728"]}
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
        </div>
      )}
    </button>
  );
};

export default CalenderButton;
