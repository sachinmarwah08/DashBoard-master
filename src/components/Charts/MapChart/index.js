import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import './index.scss';
import WorldMap from '../../../Images/earth-rc.svg';
import Table from '../../../Images/tableIcon.svg';
import Sort from '../../SortFilter/Sort';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/svg-arrow.css';
import infoIcon from '../../../Images/info.svg';
import { countryData } from '../MapChart/GoogleMap/Cordinates';
import { FilterContext } from '../../../context/FilterContext';
import { getMapData } from '../../../actions/GoogleMapApis';
import {
  getCountryDropdownData,
  getHashtagDropdownData,
  getInfluencerDropdownData,
} from '../../../actions/DropDownApis';
import TableData from '../MapChart/Table/Table';
import { FadeLoader } from 'react-spinners';
import Map from './Map';
import moment from 'moment';
import Globe from '../../Globe';
// import { useJsApiLoader } from "@react-google-maps/api";
// import GoogleMap from "./GoogleMap/googleMap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const MapChartComponent = () => {
  const mapData = ['Country', 'Influencer', 'Hashtag'];
  const [mapdata, setMapData] = useState('Filters');
  const [show, setShow] = useState('map');
  const [tableData, setTableData] = useState([]);
  const [tableBackupData, setTableBackupData] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapDataApi, setMapDataApi] = useState();
  const [inputValue, setInputValue] = useState('');
  const [influencerdata, setInfluencerData] = useState([]);
  const [influencerBackupdata, setInfluencerBackupdata] = useState([]);
  const [hashtagBackupdata, setHashtagBackupdata] = useState([]);
  const [hashtag, sethashtag] = useState([]);
  const [showInfluencerHashtag, setShowInfluencerHashtag] = useState(false);
  const [countryDataDropdown, setCountryDataDropdown] = useState([]);
  const [countryBackupdata, setCountryBackupdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hideRank, setHideRank] = useState(false);
  const [page, setPage] = useState(1);
  // const [reCenterMap, setReCenterMap] = useState(
  //   /** @type google.maps.Map */ (null)
  // );

  const { state } = useContext(FilterContext);
  const {
    loaders: { countryLineChartLoading },
    filters: {
      countryValue,
      influencerValue,
      hashtagValue,
      dateRangeValue: { fromDate, toDate },
    },
  } = state;

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyDJqhd2TL6DayrN8E5GiqZqrjnmtrq45hU", // Add your API key
  // });

  useEffect(() => {
    if (countryLineChartLoading) {
      setLoading(true);
      const callApi = async () => {
        let c = moment(toDate).isSame(moment(new Date()).format('YYYY-MM-DD'))
          ? false
          : null;

        const response = await getMapData(
          fromDate,
          toDate,
          countryValue,
          influencerValue,
          hashtagValue,
          c
        );

        const getInfluenser = await getInfluencerDropdownData();
        const hashtagDataResponse = await getHashtagDropdownData();
        const countryDataResponse = await getCountryDropdownData();

        let tempData = [...response.data];
        for (let i = 0; i < tempData.length; i++) {
          tempData[i]['coordinates'] = [];
        }

        let colors = ['red', 'green', 'blue', 'orange', 'yellow'];
        for (let i = 0; i < tempData.length; i++) {
          for (let j = 0; j < countryData.length; j++) {
            if (tempData[i]._id === countryData[j].country) {
              tempData[i]['coordinates'] = [
                countryData[j]['latitude'],
                countryData[j]['longitude'],
              ];
              tempData[i]['city'] = tempData[i]._id;
              tempData[i]['ISO3'] = countryData[j].alpha3;
              tempData[i]['value'] = countryData[j].value || 350;
              tempData[i]['id'] = i;
              tempData[i]['color'] =
                countryData[j].color ||
                colors[Math.floor(Math.random() * colors.length)];
              // tempData[i]["count"] = tempData[i].count;
            }
          }
        }
        tempData = tempData.filter((item) => item.coordinates.length > 0);
        console.table(tempData, 'mapsss');
        console.log(countryData, 'country data');
        setCountryDataDropdown(countryDataResponse);
        setCountryBackupdata(countryDataResponse);
        setInfluencerData(getInfluenser);
        setInfluencerBackupdata(getInfluenser);
        sethashtag(hashtagDataResponse);
        setHashtagBackupdata(hashtagDataResponse);
        setMapDataApi(tempData);

        setTableData(response.data);
        setTableBackupData(response.data);
        setLoading(false);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  useEffect(() => {
    const loadUsers = async () => {
      // setLoading(true);
      const countryData = await getCountryDropdownData(page);
      setCountryDataDropdown((prev) => [...prev, ...countryData]);

      const HashtagData = await getHashtagDropdownData(page);
      sethashtag((prev) => [...prev, ...HashtagData]);

      const influencerData = await getInfluencerDropdownData(page);
      setInfluencerData((prev) => [...prev, ...influencerData]);
      setLoading(false);
    };
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

  const onInputChange = async (e) => {
    setInputValue(e.target.value);
    if (mapdata === 'Filters') {
      let tempTableData = [...tableBackupData];
      const tableFilter = tempTableData.filter((value) => {
        return value._id.toLowerCase().includes(inputValue.toLowerCase());
      });
      setTableData(tableFilter);
    } else {
      setShowInfluencerHashtag(true);
      let tempData = [...influencerBackupdata];
      let tempHasgtagData = [...hashtagBackupdata];
      let tempCountryData = [...countryBackupdata];
      const newFilter = tempData.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      const hashtagFilter = tempHasgtagData.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      const countryFilter = tempCountryData.filter((value) => {
        return value.toLowerCase().includes(inputValue.toLowerCase());
      });
      setCountryDataDropdown(countryFilter);
      sethashtag(hashtagFilter);
      setInfluencerData(newFilter);
    }
  };

  const onInfluencerInputChange = async (searchValue) => {
    if (mapdata === 'Country') {
      setLoading(true);
      const countryData = await getCountryDropdownData(1, searchValue);
      setCountryDataDropdown(countryData);
      setLoading(false);
    }
    if (mapdata === 'Influencer') {
      setLoading(true);
      const influencerData = await getInfluencerDropdownData(1, searchValue);
      setInfluencerData(influencerData);
      setLoading(false);
    }
    if (mapdata === 'Hashtag') {
      setLoading(true);
      const hashtagData = await getHashtagDropdownData(1, searchValue);
      sethashtag(hashtagData);
      setLoading(false);
    }
  };

  const onEnterInputClick = async (e) => {
    setShowInfluencerHashtag(false);
    if (e.key === 'Enter') {
      setLoading(true);
      let countryTypedValue = '';
      let influencerTypedValue = '';
      let hashtagTypedValue = '';
      if (mapdata === 'Influencer') {
        influencerTypedValue = inputValue;
      }
      if (mapdata === 'Hashtag') {
        hashtagTypedValue = inputValue;
      }
      if (mapdata === 'Country') {
        countryTypedValue = inputValue;
      }

      let c = moment(toDate).isSame(moment(new Date()).format('YYYY-MM-DD'))
        ? false
        : null;

      const response = await getMapData(
        fromDate,
        toDate,
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue,
        c
      );

      let tempData = [...response.data];

      for (let i = 0; i < tempData.length; i++) {
        for (let j = 0; j < countryData.length; j++) {
          if (tempData[i]._id === countryData[j].country) {
            tempData[i]['cordinates'] = [
              countryData[j]['longitude'],
              countryData[j]['latitude'],
            ];
            tempData[i]['name'] = tempData[i]._id;
            tempData[i]['ISO3'] = countryData[j].alpha3;
            tempData[i]['count'] = tempData[i].count;
          }
        }
      }
      setMapDataApi(tempData);
      setTableData(response.data);
      setHideRank(true);
      setLoading(false);
    }
  };

  const onDropDownClick = async (val) => {
    setInputValue(val);
    setShowInfluencerHashtag(false);
    setLoading(true);
    let countryTypedValue = '';
    let influencerTypedValue = '';
    let hashtagTypedValue = '';
    if (mapdata === 'Influencer') {
      influencerTypedValue = val;
    }
    if (mapdata === 'Hashtag') {
      hashtagTypedValue = val;
    }
    if (mapdata === 'Country') {
      countryTypedValue = val;
    }

    let c = moment(toDate).isSame(moment(new Date()).format('YYYY-MM-DD'))
      ? false
      : null;

    const response = await getMapData(
      fromDate,
      toDate,
      countryTypedValue,
      influencerTypedValue,
      hashtagTypedValue,
      c
    );

    let tempData = [...response.data];

    for (let i = 0; i < tempData.length; i++) {
      for (let j = 0; j < countryData.length; j++) {
        if (tempData[i]._id === countryData[j].country) {
          tempData[i]['cordinates'] = [
            countryData[j]['longitude'],
            countryData[j]['latitude'],
          ];
          tempData[i]['name'] = tempData[i]._id;
          tempData[i]['ISO3'] = countryData[j].alpha3;
          tempData[i]['count'] = tempData[i].count;
        }
      }
    }

    setMapDataApi(tempData);
    setTableData(response.data);
    setLoading(false);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const clearData = () => {
    setTableData(tableBackupData);
    setShowInfluencerHashtag(false);
    setInputValue('');
    setMapData('Filters');
    setHideRank(false);
  };

  const onFilterDropClick = (option) => {
    setMapData(option);
  };

  return (
    <div className="map-wrapper">
      <div className="content-map">
        <div className="heading-map">
          <div className="heading-map-content">
            <h1 className="heading">Geographical Wellbeing Analysis</h1>
            <Tippy
              theme={'light'}
              interactive={true}
              content={
                <div
                  style={{
                    padding: '0.5rem',
                    fontWeight: 400,
                    fontFamily: 'Work-Sans',
                    fontSize: '14px',
                  }}
                >
                  <p style={{ fontWeight: 600, marginTop: 0 }}>
                    Geography Wise Wellbeing Analysis
                  </p>
                  This shows geography-wise wellbeing insights. It shows each
                  country's ranking for wellbeing interest, percentages of
                  positive and negative sentiment towards wellbeing, and the net
                  change in ranking and wellbeing interest from the previous
                  period.
                </div>
              }
            >
              <img className="info-icon" src={infoIcon}></img>
            </Tippy>
          </div>

          <div className="side-logos">
            {/* {show === "map" && (
              <button onClick={() => reCenterMap.panTo(center)}>
                <FontAwesomeIcon className="navigator" icon={faLocationArrow} />
              </button>
            )} */}
            <button onClick={() => setShow('map')}>
              <img
                alt="WorldMap"
                className={`${show === 'map' ? 'worldMapColored' : 'WorldMap'}`}
                src={WorldMap}
              ></img>
            </button>
            <button onClick={() => setShow('tableData')}>
              <img
                alt="Table"
                className={`${
                  show === 'tableData' ? 'table-colored' : 'table'
                }`}
                src={Table}
              ></img>
            </button>
          </div>
        </div>

        {show === 'map' && (
          <>
            <div className="map-sort">
              <Sort
                influencerdata={
                  (mapdata === 'Influencer' && influencerdata) ||
                  (mapdata === 'Hashtag' && hashtag) ||
                  (mapdata === 'Country' && countryDataDropdown)
                }
                setData={onFilterDropClick}
                data={mapdata}
                dropdownOptions={mapData}
                onchange={onInputChange}
                onEnterInputClick={onEnterInputClick}
                onDropDownClick={onDropDownClick}
                inputValue={inputValue}
                showInfluencerHashtag={showInfluencerHashtag}
                value={inputValue}
                lastUserRef={lastUserRef}
                onSearch={onInfluencerInputChange}
              />
            </div>

            <div className="bar-map-wrapper">
              <div className="chart-map">
                {loading ? (
                  <div className="googleMap-loader">
                    <FadeLoader color="#F05728" loading={loading} size={50} />
                  </div>
                ) : (
                  // <GoogleMap
                  //   influencerdata={
                  //     mapdata === "Country" ||
                  //     mapdata === "Influencer" ||
                  //     mapData === "Hashtag"
                  //   }
                  //   isLoaded={isLoaded}
                  //   setActiveMarker={setActiveMarker}
                  //   handleOnLoad={handleOnLoad}
                  //   handleActiveMarker={handleActiveMarker}
                  //   mapDataApi={mapDataApi}
                  //   activeMarker={activeMarker}
                  //   setReCenterMap={setReCenterMap}
                  //   reCenterMap={reCenterMap}
                  //   center={center}
                  // />
                  // <Map
                  //   influencerdata={
                  //     mapdata === "Country" ||
                  //     mapdata === "Influencer" ||
                  //     mapData === "Hashtag"
                  //   }
                  //   hideRank={hideRank}
                  //   activeMarker={activeMarker}
                  //   mapDataApi={mapDataApi}
                  //   handleActiveMarker={handleActiveMarker}
                  // />
                  mapDataApi &&
                  mapDataApi.length && <Globe mapDataApi={mapDataApi} />
                )}
              </div>
              {/* 
              {countryValue || hashtagValue || influencerValue ? (
                ""
              ) : (
                <div className="progress-bar">
                  <div className="inside-bar">
                    <span>1</span>
                    <span>222</span>
                  </div>
                </div>
              )} */}
            </div>
          </>
        )}

        {show === 'tableData' && (
          <>
            <div className="map-sort">
              <Sort
                influencerdata={
                  (mapdata === 'Influencer' && influencerdata) ||
                  (mapdata === 'Hashtag' && hashtag) ||
                  (mapdata === 'Country' && countryDataDropdown)
                }
                setData={onFilterDropClick}
                data={mapdata}
                filterData={inputValue}
                dropdownOptions={mapData}
                onchange={onInputChange}
                onEnterInputClick={onEnterInputClick}
                onDropDownClick={onDropDownClick}
                inputValue={inputValue}
                showInfluencerHashtag={showInfluencerHashtag}
                value={inputValue}
                clearData={clearData}
                lastUserRef={lastUserRef}
                onSearch={onInfluencerInputChange}
              />
            </div>

            <div className="bar-map-wrapper">
              <div className="chart-map-table">
                {loading ? (
                  <div className="googleMap-loader">
                    <FadeLoader color="#F05728" loading={loading} size={50} />
                  </div>
                ) : (
                  <TableData tableData={tableData} hideRank={hideRank} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MapChartComponent;
