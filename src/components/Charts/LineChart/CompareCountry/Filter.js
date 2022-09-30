import React, { useContext, useEffect, useRef, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import xCircle from "../../../../Images/x-circle.svg";
import threeDots from "../../../../Images/threeDots.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../../../context/FilterContext";
import { BeatLoader } from "react-spinners";

const CompareCountry = ({
  title,
  isValue,
  closeAddCountry,
  CompareCountryDropDownClick,
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
  const { countryValue } = state.filters;

  const [isActive, setIsActive] = useState(false);

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

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div className="Add-country">
        <div className="country">
          <img alt="threeDots" src={threeDots} />
          <p className="title">{countryValue ? countryValue : title}</p>
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
                Add Country
              </p>
            </>
          </button>
        ) : (
          !isValue && (
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
                  index score.
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
                                        CompareCountryDropDownClick(item)
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
                                        CompareCountryDropDownClick(item)
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

        {isValue && (
          <div className="country-added">
            <span className="circle-line-added-country-time"></span>
            <p className="title-line-added-country">
              {isValue}
              <button
                className="close-addCountry-btn"
                onClick={closeAddCountry}
              >
                <img alt="xCircle" src={xCircle} />
              </button>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CompareCountry;
