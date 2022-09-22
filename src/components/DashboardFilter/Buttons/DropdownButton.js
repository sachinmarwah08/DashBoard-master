import React, { useState, useRef, useEffect } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BeatLoader } from "react-spinners";
import { debounce } from "throttle-debounce";

const DropdownButton = ({
  icon,
  name,
  data,
  selectedVal,
  handleChange,
  lastUserRef,
  loading,
  onSearch,
}) => {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (data) => {
    return data.filter(
      (option) => option.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsFilterActive(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const debounceSearch = debounce(
    1000,
    (num) => {
      onSearch(num);
    },
    { atBegin: false }
  );

  return (
    <button
      ref={wrapperRef}
      onClick={() => setIsFilterActive(!isFilterActive)}
      className={`${
        isFilterActive
          ? " dropdown-filter-button-colored"
          : "dropdown-filter-button"
      }`}
    >
      <div className="dropdown-filter-content">
        <div className="filter-content">
          <img className="user-Icon" src={icon}></img>

          <input
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#667085",
              fontSize: "16px",
              fontWeight: 400,
              fontFamily: "Work-Sans",
              width: "100%",
              outline: "none",
              margin: 0,
            }}
            className="dropdown-input"
            ref={inputRef}
            placeholder={name}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              debounceSearch(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
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
        <div className="dropdown-filter-wrapper">
          <div className="overflow-wrapper">
            {filter(data).map((option, index) =>
              data.length === index + 1 ? (
                <div
                  key={index}
                  onClick={() => selectOption(option)}
                  className="dropdown-filter-item"
                >
                  <ul style={{ margin: "0%", padding: "0%" }}>
                    <li
                      ref={lastUserRef}
                      style={{ fontFamily: "Work-Sans", color: "#616161" }}
                      className="dropdown-list-two"
                    >
                      {option}
                    </li>
                  </ul>
                </div>
              ) : (
                <li
                  style={{ fontFamily: "Work-Sans", color: "#616161" }}
                  onClick={() => selectOption(option)}
                  className="dropdown-list-two"
                  key={index}
                >
                  {option}
                </li>
              )
            )}
            {loading && <BeatLoader color="#F05728" loading={true} size={10} />}
          </div>
        </div>
      )}
    </button>
  );
};

export default DropdownButton;
