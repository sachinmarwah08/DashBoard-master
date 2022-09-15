import React, { useState, useRef, useEffect } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AutoSizer,
  InfiniteLoader,
  List,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
import "react-virtualized/styles.css";
import { getCountryDropdownData } from "../../../actions/DropDownApis";

const NewDropdownButton = ({
  icon,
  name,
  data,
  selectedVal,
  handleChange,
  onLoadMoreCountry,
}) => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

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

  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
    parent,
  }) {
    return (
      <div style={style}>
        {/* {filter(data).map((option, index) => ( */}
        <CellMeasurer
          key={key}
          cache={cache.current}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div
            // style={{ padding: "1rem", paddingLeft: 0 }}

            onClick={() => selectOption(data[index])}
            className="dropdown-filter-item"
          >
            <ul style={{ margin: "0%", padding: "0%" }}>
              <li
                style={{ fontFamily: "Work-Sans", color: "#616161" }}
                className="dropdown-list"
              >
                {data[index]}
              </li>
            </ul>
          </div>
        </CellMeasurer>
        {/* ))} */}
      </div>
    );
  }

  function isRowLoaded({ index }) {
    return !!data[index];
  }

  async function loadMoreRows({ startIndex, stopIndex }) {
    const countryDataResponse = await getCountryDropdownData(2);
    console.log(countryDataResponse);
  }

  return (
    <button
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
        <>
          <div className="dropdown-filter-wrapper">
            <div className="overflow-wrapper">
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                width={100}
                height={100}
                loadMoreRows={onLoadMoreCountry}
                rowCount={100}
              >
                {({ onRowsRendered, registerChild }) => (
                  <AutoSizer>
                    {({ height, width }) => (
                      <div>
                        <List
                          onRowsRendered={onRowsRendered}
                          ref={registerChild}
                          width={width}
                          height={height}
                          rowCount={data.length}
                          rowHeight={cache.current.rowHeight}
                          deferredMeasurementCache={cache.current}
                          rowRenderer={rowRenderer}
                        />
                      </div>
                    )}
                  </AutoSizer>
                )}
              </InfiniteLoader>
            </div>
          </div>
        </>
      )}
    </button>
  );
};

export default NewDropdownButton;
