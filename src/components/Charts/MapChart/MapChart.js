import React, { useState } from "react";
import "./MapChart.scss";
import WorldMap from "../../../Images/WorldMap.svg";
import Table from "../../../Images/Table.png";
// import BigArrow from "../../../Images/bif-Arrow.png";
import shareIcon from "../../../Images/share.svg";
// import { MapContainer, CircleMarker, TileLayer, Tooltip } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import data from "./Cities";
import GoogleMap from "./googleMap";
import Sort from "../../SortFilter/Sort";
// import { Chart } from "react-google-charts";

// const data = [
//   ["Country", "Popularity"],
//   ["Germany", 200],
//   ["United States", 300],
//   ["Brazil", 400],
//   ["Canada", 500],
//   ["France", 600],
//   ["RU", 700],
// ];

const MapChartComponent = () => {
  const mapData = ["influencer", "hashtags"];
  const [mapdata, setMapData] = useState("Filter");
  // var centerLat = (data.minLat + data.maxLat) / 2;
  // var distanceLat = data.maxLat - data.minLat;
  // var bufferLat = distanceLat * 0.05;
  // var centerLong = (data.minLong + data.maxLong) / 2;
  // var distanceLong = data.maxLong - data.minLong;
  // var bufferLong = distanceLong * 0.05;
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
          <div>
            {/* <h3 style={{ textAlign: "center" }}>
              Most Populous Cities in Asia
            </h3> */}
            {/* <MapContainer
              style={{ height: "500px", width: "95%", margin: "auto" }}
              zoom={4}
              center={[centerLat, centerLong]}
              bounds={[
                [data.minLat - bufferLat, data.minLong - bufferLong],
                [data.maxLat + bufferLat, data.maxLong + bufferLong],
              ]}
            >
              <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {data.city.map((city, k) => {
                return (
                  <CircleMarker
                    key={k}
                    center={[city["coordinates"][1], city["coordinates"][0]]}
                    radius={20 * Math.log(city["population"] / 10000000)}
                    fillOpacity={0.5}
                    stroke={false}
                  >
                    <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                      <span>
                        {city["name"] +
                          ": " +
                          "Population" +
                          " " +
                          city["population"]}
                      </span>
                    </Tooltip>
                  </CircleMarker>
                );
              })}
            </MapContainer> */}
          </div>
          {/* <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = data[selection[0].row + 1];
                  console.log("Selected : " + region);
                },
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="500px"
            data={data}
          /> */}
          {/* <ResponsiveContainer height={data.length * 50 + 10}> */}
          {/* <BarChart
        width={600}
        height={300}
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 230 }}
      > */}
          {/* <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" /> */}
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          {/* <Bar radius={[0, 10, 10, 0]} dataKey="pv" fill="#FFB800" /> */}
          {/* </BarChart> */}
          {/* </ResponsiveContainer> */}
        </div>
      </div>
    </div>
  );
};

export default MapChartComponent;
