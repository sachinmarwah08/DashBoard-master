import React, { useState } from "react";
import "./index.scss";
import WorldMap from "../../../Images/earth-rc.svg";
import Table from "../../../Images/tableIcon.svg";
import shareIcon from "../../../Images/share-2.svg";
import GoogleMap from "./GoogleMap/googleMap";
import TableData from "./Table/Table";
import Sort from "../../SortFilter/Sort";
import { data } from "./Table/TableData";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import infoIcon from "../../../Images/info.svg";

const MapChartComponent = () => {
  const mapData = ["Country", "Influencer", "Hashtag"];
  const [mapdata, setMapData] = useState("Filters");
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
                  percentages of happiness and sadness towards wellbeing, and
                  the net change in ranking and wellbeing index score from the
                  previous period.
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
