import React, { useEffect, useRef, useState } from "react";
import "./Sort.scss";
import filterBarLogo from "../../Images/filter.svg";
import searchBarLogo from "../../Images/search.svg";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sort = ({
  dropdownOptions,
  data,
  setData,
  value,
  onchange,
  filterData,
  clearData,
  onEnterInputClick,
  influencerdata,
  onDropDownClick,
  inputValue,
  showInfluencerHashtag,
}) => {
  const [isActive, setIsActive] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert("You clicked outside of me!");
          setIsActive(false);
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

  return (
    <div className="search-bar-filter">
      <div className="bar-search">
        <input
          style={{
            fontFamily: "Work-Sans",
          }}
          className="bar-search-data"
          name="search"
          value={value}
          onChange={onchange}
          placeholder="Search..."
          type="text"
          onKeyDown={onEnterInputClick}
        />
        {showInfluencerHashtag && inputValue && (
          <div className="search-bar-dropdown">
            {influencerdata &&
              influencerdata.map((item) => (
                <div
                  onClick={() => onDropDownClick(item)}
                  className="dropdown-item"
                >
                  {item}
                </div>
              ))}
          </div>
        )}

        {filterData ? (
          <FontAwesomeIcon
            onClick={clearData}
            className="close-icon-image"
            icon={faXmark}
          />
        ) : (
          <img
            alt="share-icon"
            className="search-icon-image-sort"
            src={searchBarLogo}
          />
        )}
      </div>

      <div ref={wrapperRef} className="filter-bar-data">
        <div
          onClick={() => {
            setIsActive(!isActive);
          }}
          className="sort-filter-wrapper"
        >
          <img
            alt="share-icon"
            src={filterBarLogo}
            className="filter-logo-img"
          ></img>

          {data}
          {/* {influencerdata && (
            <FontAwesomeIcon
              onClick={clearData}
              className="close-icon-image"
              icon={faXmark}
            />
          )} */}

          {isActive && (
            <div className="content-container">
              {dropdownOptions.map((option) => (
                <>
                  <div
                    onClick={() => {
                      setData(option);
                    }}
                    className="filter-item"
                  >
                    {option}
                    <div className="sort-circle">
                      {data === option && (
                        <div className="sort-circle-colored"></div>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sort;
