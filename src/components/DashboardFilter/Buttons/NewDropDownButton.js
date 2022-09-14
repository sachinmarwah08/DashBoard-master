import React, { useState, useRef, useEffect } from 'react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { getCountryDropdownData } from '../../../actions/DropDownApis';

const NewDropdownButton = ({
  icon,
  name,
  data,
  selectedVal,
  handleChange,
  onLoadMoreCountry,
}) => {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => '');
    handleChange(option);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return '';
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
  }) {
    return (
      <div
        key={key}
        style={style}
        onClick={() => selectOption(data[index])}
        className="dropdown-filter-item"
      >
        <ul style={{ margin: '0%', padding: '0%' }}>
          <li
            style={{ fontFamily: 'Work-Sans', color: '#616161' }}
            className="dropdown-list"
          >
            {data[index]}
          </li>
        </ul>
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
          ? ' dropdown-filter-button-colored'
          : 'dropdown-filter-button'
      }`}
    >
      <div className="dropdown-filter-content">
        <div className="filter-content">
          <img className="user-Icon" src={icon}></img>

          <input
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#667085',
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: 'Work-Sans',
              width: '100%',
              outline: 'none',
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
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={onLoadMoreCountry}
          rowCount={100}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer defaultHeight={100}>
              {({ height, width }) => (
                <List
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                  width={width}
                  height={height}
                  rowCount={data.length}
                  rowHeight={30}
                  rowRenderer={rowRenderer}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      )}
    </button>
  );
};

export default NewDropdownButton;
