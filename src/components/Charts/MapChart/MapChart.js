import React, { useState } from "react";
import "./MapChart.scss";
import WorldMap from "../../../Images/earth-rc.svg";
import Table from "../../../Images/tableIcon.svg";
import shareIcon from "../../../Images/share-2.svg";
import GoogleMap from "./googleMap";
import TableData from "./Table";
import Sort from "../../SortFilter/Sort";

const MapChartComponent = () => {
  const mapData = ["Influencer", "Hashtags"];
  const [mapdata, setMapData] = useState("Filter");
  const [show, setShow] = useState("map");

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

        <div className="map-sort">
          <Sort setData={setMapData} data={mapdata} dropdownOptions={mapData} />
        </div>
      </div>
      <div className="bar-map-wrapper">
        {show === "map" && (
          <div className="chart-map">
            <GoogleMap />
          </div>
        )}

        {show === "tableData" && <TableData />}
      </div>
    </div>
  );
};

export default MapChartComponent;
