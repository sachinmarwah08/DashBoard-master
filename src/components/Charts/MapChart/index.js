import React, { useState, useContext, useEffect } from "react";
import "./index.scss";
import WorldMap from "../../../Images/earth-rc.svg";
import Table from "../../../Images/tableIcon.svg";
import shareIcon from "../../../Images/share-2.svg";
import GoogleMap from "./GoogleMap/googleMap";
import Sort from "../../SortFilter/Sort";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import infoIcon from "../../../Images/info.svg";
import { useJsApiLoader } from "@react-google-maps/api";
import { countryData } from "../MapChart/GoogleMap/Cordinates";
import { FilterContext } from "../../../context/FilterContext";
import { getMapData } from "../../../actions/GoogleMapApis";
import {
  getCountryDropdownData,
  getHashtagDropdownData,
  getInfluencerDropdownData,
} from "../../../actions/DropDownApis";
import TableData from "../MapChart/Table/Table";

const MapChartComponent = () => {
  const mapData = ["Country", "Influencer", "Hashtag"];
  const [mapdata, setMapData] = useState("Filters");
  const [show, setShow] = useState("map");
  const [tableData, setTableData] = useState([]);
  const [tableBackupData, setTableBackupData] = useState([]);
  const [wordEntered, setWordEntered] = useState();
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapDataApi, setMapDataApi] = useState();
  const { state } = useContext(FilterContext);
  const [inputValue, setInputValue] = useState("");
  const [influencerdata, setInfluencerData] = useState([]);
  const [influencerBackupdata, setInfluencerBackupdata] = useState([]);
  const [hashtagBackupdata, setHashtagBackupdata] = useState([]);
  const [hashtag, sethashtag] = useState([]);
  const [showInfluencerHashtag, setShowInfluencerHashtag] = useState(false);
  const [countryDataDropdown, setCountryDataDropdown] = useState([]);
  const [countryBackupdata, setCountryBackupdata] = useState([]);

  const {
    loaders: { countryLineChartLoading },
    filters: {
      countryValue,
      influencerValue,
      hashtagValue,
      dateRangeValue: { fromDate, toDate },
    },
  } = state;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBjcLIeVQ02aYHchflfqslJz_9NPLYfNP0", // Add your API key
  });

  const onInputChange = async (e) => {
    setInputValue(e.target.value);
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
  };

  useEffect(() => {
    if (countryLineChartLoading) {
      const callApi = async () => {
        // let today = Date.now();
        // var check = moment(today);
        // var month = check.format("M");
        // var day = check.format("D");
        // var year = check.format("YYYY");
        // let fromDate = `${year}-${month}-01`;
        // let toDate = `${year}-${month}-${day}`;
        // console.log(month, day, year);

        // let fromDate = "2022-07-01";
        // let toDate = "2022-07-31";
        // let country = "United States";
        const response = await getMapData(
          fromDate,
          toDate,
          countryValue,
          influencerValue,
          hashtagValue
        );

        const getInfluenser = await getInfluencerDropdownData();
        const hashtagDataResponse = await getHashtagDropdownData();
        const countryDataResponse = await getCountryDropdownData();

        let tempData = [...response.data];
        console.log(tempData, "backup");

        for (let i = 0; i < tempData.length; i++) {
          for (let j = 0; j < countryData.length; j++) {
            if (tempData[i]._id === countryData[j].country) {
              tempData[i]["position"] = {
                lat: countryData[j]["latitude"],
                lng: countryData[j]["longitude"],
              };
            }
          }
        }
        setCountryDataDropdown(countryDataResponse);
        setCountryBackupdata(countryDataResponse);
        setInfluencerData(getInfluenser);
        setInfluencerBackupdata(getInfluenser);
        sethashtag(hashtagDataResponse);
        setHashtagBackupdata(hashtagDataResponse);
        setMapDataApi(tempData);
        setTableData(response.data);
        setTableBackupData(response.data);
      };
      callApi();
    }
  }, [countryLineChartLoading]);

  const onFilterDropClick = (option) => {
    setMapData(option);
  };

  const onEnterInputClick = async (e) => {
    if (e.key === "Enter") {
      let influencerTypedValue = "";
      let hashtagTypedValue = "";
      let countryTypedValue = "";
      if (mapdata === "Influencer") {
        influencerTypedValue = inputValue;
      }
      if (mapdata === "Hashtag") {
        hashtagTypedValue = inputValue;
      }
      if (mapdata === "Country") {
        countryTypedValue = inputValue;
      }
      const response = await getMapData(
        fromDate,
        toDate,
        countryTypedValue,
        influencerTypedValue,
        hashtagTypedValue
      );

      let tempData = [...response.data];

      for (let i = 0; i < tempData.length; i++) {
        for (let j = 0; j < countryData.length; j++) {
          if (tempData[i]._id === countryData[j].country) {
            tempData[i]["position"] = {
              lat: countryData[j]["latitude"],
              lng: countryData[j]["longitude"],
            };
          }
        }
      }

      setMapDataApi(tempData);
    }
  };

  const onDropDownClick = async (val) => {
    setInputValue(val);
    setShowInfluencerHashtag(false);
    let influencerTypedValue = "";
    let hashtagTypedValue = "";
    let countryTypedValue = "";
    if (mapdata === "Influencer") {
      influencerTypedValue = val;
    }
    if (mapdata === "Hashtag") {
      hashtagTypedValue = val;
    }
    if (mapdata === "Country") {
      countryTypedValue = val;
    }
    const response = await getMapData(
      fromDate,
      toDate,
      countryTypedValue,
      influencerTypedValue,
      hashtagTypedValue
    );

    let tempData = [...response.data];

    for (let i = 0; i < tempData.length; i++) {
      for (let j = 0; j < countryData.length; j++) {
        if (tempData[i]._id === countryData[j].country) {
          tempData[i]["position"] = {
            lat: countryData[j]["latitude"],
            lng: countryData[j]["longitude"],
          };
        }
      }
    }

    setMapDataApi(tempData);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    // const bounds = new google.maps.LatLngBounds();
    // mapData && mapData.forEach(({ position }) => bounds.extend(position));
    // map.fitBounds(bounds);
  };

  // const handleFilter = (event) => {
  //   let tempData = [...tableBackupData];
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = tempData.filter((value) => {
  //     return (
  //       value._id.toLowerCase().includes(searchWord.toLowerCase()) ||
  //       value.rank.toLowerCase().includes(searchWord.toLowerCase()) ||
  //       value.change_in_rank.toLowerCase().includes(searchWord.toLowerCase()) ||
  //       value.change_in_index_persentage
  //         .toLowerCase()
  //         .includes(searchWord.toLowerCase()) ||
  //       value.happy.toLowerCase().includes(searchWord.toLowerCase()) ||
  //       value.sad_per.toLowerCase().includes(searchWord.toLowerCase())
  //     );
  //   });

  //   setTableData(newFilter);
  // };

  // const clearData = () => {
  //   setTableData(tableBackupData);
  //   setWordEntered("");
  // };
  // console.log(tableData, "dataaaaaaaaaaaaa");
  return (
    <div className="map-wrapper">
      <div className="content-map">
        <div className="heading-map">
          <div className="heading-map-content">
            <h1 className="heading">Geographical Wellbeing Analysis</h1>
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
                    Geography Wise Wellbeing Analysis
                  </p>
                  This shows geography-wise wellbeing insights. It shows each
                  country's ranking for wellbeing, wellbeing index score,
                  percentages of positive and negative sentiment towards
                  wellbeing, and the net change in ranking and wellbeing index
                  score from the previous period.
                </div>
              }
            >
              <img className="info-icon" src={infoIcon}></img>
            </Tippy>
          </div>

          <div className="side-logos">
            <button onClick={() => setShow("map")}>
              <img
                alt="WorldMap"
                className={`${show === "map" ? "worldMapColored" : "WorldMap"}`}
                src={WorldMap}
              ></img>
            </button>
            <button onClick={() => setShow("tableData")}>
              <img
                alt="Table"
                className={`${
                  show === "tableData" ? "table-colored" : "table"
                }`}
                src={Table}
              ></img>
            </button>
            {/* <button>
              <img alt="BigArrow" className="bigArrow" src={shareIcon}></img>
            </button> */}
          </div>
        </div>
        {show === "map" && (
          <>
            <div className="map-sort">
              <Sort
                influencerdata={
                  (mapdata === "Influencer" && influencerdata) ||
                  (mapdata === "Hashtag" && hashtag) ||
                  (mapdata === "Country" && countryDataDropdown)
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
              />
            </div>
            <div className="bar-map-wrapper">
              <div className="chart-map">
                <GoogleMap
                  isLoaded={isLoaded}
                  setActiveMarker={setActiveMarker}
                  handleOnLoad={handleOnLoad}
                  handleActiveMarker={handleActiveMarker}
                  mapDataApi={mapDataApi}
                  activeMarker={activeMarker}
                />
              </div>
            </div>
          </>
        )}
        {show === "tableData" && (
          <>
            <div className="map-sort">
              <Sort
                influencerdata={
                  (mapdata === "Influencer" && influencerdata) ||
                  (mapdata === "Hashtag" && hashtag) ||
                  (mapdata === "Country" && countryDataDropdown)
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
              />
            </div>
            <div className="bar-map-wrapper">
              <div className="chart-map">
                <TableData tableData={tableData} />
              </div>
            </div>
          </>
        )}
      </div>
      {/* {show ===  && } */}
    </div>
  );
};

export default MapChartComponent;
