import React, { useState } from "react";
import "./index.scss";
import WorldMap from "../../../Images/earth-rc.svg";
import Table from "../../../Images/tableIcon.svg";
import shareIcon from "../../../Images/share-2.svg";
import GoogleMap from "./GoogleMap/googleMap";
import TableData from "./Table/Table";
import Sort from "../../SortFilter/Sort";
import { data } from "./Table/TableData";

const MapChartComponent = () => {
  const mapData = ["Influencer", "Hashtags"];
  const [mapdata, setMapData] = useState("Filter");
  const [show, setShow] = useState("map");
  const [tableData, setTableData] = useState(data);
  const [tableBackupData, setTableBackupData] = useState(data);
  const [wordEntered, setWordEntered] = useState();

  const handleFilter = (event) => {
    let tempData = [...tableBackupData];
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = tempData.filter((value) => {
      return (
        value.country.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.rank.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.rankColored.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.Interest.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.InterestColred.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.Influencers.toLowerCase().includes(searchWord.toLowerCase())
      );
    });

    setTableData(newFilter);
  };

  const clearData = () => {
    setTableData(tableBackupData);
    setWordEntered("");
  };
  return (
    <div className="map-wrapper">
      <div className="content-map">
        <div className="heading-map">
          <h1 className="heading">Country Ranking</h1>
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
            <button>
              <img alt="BigArrow" className="bigArrow" src={shareIcon}></img>
            </button>
          </div>
        </div>
        {show === "map" && (
          <>
            <div className="map-sort">
              <Sort
                setData={setMapData}
                data={mapdata}
                dropdownOptions={mapData}
              />
            </div>
            <div className="bar-map-wrapper">
              <div className="chart-map">
                <GoogleMap />
              </div>
            </div>
          </>
        )}
        {show === "tableData" && (
          <>
            <div className="map-sort">
              <Sort
                clearData={clearData}
                filterData={tableData.length === 0}
                value={wordEntered}
                onchange={handleFilter}
                setData={setMapData}
                data={mapdata}
                dropdownOptions={mapData}
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
