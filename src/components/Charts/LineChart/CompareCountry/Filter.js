import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import xCircle from "../../../../Images/x-circle.svg";
import threeDots from "../../../../Images/threeDots.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../../../context/FilterContext";
import { getCountryDropdownData } from "../../../../actions/DropDownApis";

const CompareCountry = ({
  title,
  addCountry,
  AddCountryonClick,
  addCountryClickName,
  isValue,
  onKeyDown,
  closeAddCountry,
  onChange,
  value,
  options,
  lastUserRef,
  onDropDownClick,
  showDropDown,
  onCountryInputChange,
}) => {
  const { state } = useContext(FilterContext);
  const { countryValue } = state.filters;

  return (
    <>
      <div className="Add-country">
        <div className="country">
          <img alt="dots" src={threeDots} />
          <p className="title">{countryValue ? countryValue : title}</p>
        </div>
        {!addCountry ? (
          <button onClick={AddCountryonClick} className="country-add">
            <>
              <span className="faplus">
                <FontAwesomeIcon icon={faPlus} />
              </span>

              <p className="title">{addCountryClickName}</p>
            </>
          </button>
        ) : (
          !isValue && (
            <div className="country-added">
              <div className="container-type-country-name">
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
                        Type Country Name
                      </p>
                      Choose the country for comparison in the same time frame.
                    </div>
                  }
                >
                  <input
                    type="text"
                    onKeyDown={onKeyDown}
                    // onChange={(e) => {
                    //   onCountryInputChange(e.target.value);
                    //   onChange(e);
                    // }}
                    style={{ fontFamily: "Work-Sans" }}
                    onChange={onChange}
                    value={value}
                    className="contry-name"
                    placeholder="Type country name"
                  />
                </Tippy>

                {addCountry && showDropDown && (
                  <div className="type-country-name-dropdown">
                    <div className="overflow-wrapper">
                      {options.map((item, index) =>
                        options.length === index + 1 ? (
                          <div
                            onClick={() => onDropDownClick(item)}
                            className="dropdown-item"
                          >
                            <ul style={{ margin: "0", padding: "0" }}>
                              <li ref={lastUserRef} className="dropdown-list">
                                {item}
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <div
                            onClick={() => onDropDownClick(item)}
                            className="dropdown-item"
                          >
                            <ul style={{ margin: "0", padding: "0" }}>
                              <li
                                ref={lastUserRef}
                                style={{ listStyle: "none" }}
                                className="dropdown-list"
                              >
                                {item}
                              </li>
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        )}
        {isValue && (
          <div className="country-added">
            <span className="circle-line-added-country"></span>
            <p className="title-line-added-country">
              {value}
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
