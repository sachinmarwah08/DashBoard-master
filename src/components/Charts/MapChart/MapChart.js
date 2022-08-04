import React, { useState } from "react";
import "./MapChart.scss";
import WorldMap from "../../../Images/WorldMap.svg";
import Table from "../../../Images/Table.png";
import shareIcon from "../../../Images/share.svg";
import GoogleMap from "./googleMap";
import Sort from "../../SortFilter/Sort";

const MapChartComponent = () => {
  const mapData = ["influencer", "hashtags"];
  const [mapdata, setMapData] = useState("Filter");

  return (
    <div className="map-wrapper">
      <div className="content-map">
        <div className="heading-map">
          <h1 className="heading">Country Ranking</h1>
          <div className="side-logos">
            <img alt="WorldMap" className="WorldMap" src={WorldMap}></img>
            <img alt="Table" className="table" src={Table}></img>
            <img alt="BigArrow" className="bigArrow" src={shareIcon}></img>
          </div>
        </div>
        <div className="map-sort">
          <Sort setData={setMapData} data={mapdata} optiondata={mapData} />
        </div>
      </div>
      <div className="bar-map-wrapper">
        <div className="chart-map">
          <GoogleMap />
        </div>
      </div>
    </div>
  );
};

export default MapChartComponent;
