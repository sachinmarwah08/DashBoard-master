import React, { useContext, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import ReactTooltip from "react-tooltip";
import { scaleLinear } from "d3-scale";
import { FilterContext } from "../../../context/FilterContext";

const geoUrl =
  "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const colorScale = scaleLinear().domain([0, 220]).range(["#00008B", "#6495ED"]);

const Map = ({ mapDataApi, influencerdata, hideRank }) => {
  const { state } = useContext(FilterContext);
  const { influencerValue, hashtagValue, countryValue } = state.filters;
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [tootilp, setTooltip] = useState("");
  const [mapMarkerTootilp, setMapMarkerTooltip] = useState("");

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  function twoDecimalPlacesIfCents(amount) {
    return amount % 1 !== 0 ? amount.toFixed(2) : amount;
  }

  function ParseFloat(str, val) {
    str = str.toString();
    str = str.slice(0, str.indexOf(".") + val + 1);
    return Number(str);
  }

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num;
  }
  return (
    <>
      <ReactTooltip backgroundColor="white">{tootilp}</ReactTooltip>

      <ReactTooltip backgroundColor="white">{mapMarkerTootilp}</ReactTooltip>

      <div
        data-tip=""
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ComposableMap>
          <ZoomableGroup
            zoom={1.2}
            // zoom={position.zoom}
            // center={position.coordinates}
            // onMoveEnd={handleMoveEnd}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isos =
                    mapDataApi && mapDataApi.find((s) => s.ISO3 === geo.id);

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        isos
                          ? colorScale(isos.rank) ||
                            colorScale(
                              !influencerValue &&
                                !hashtagValue &&
                                !countryValue &&
                                !influencerdata
                            )
                          : "#B0C4DE"
                      }
                      onMouseEnter={() => {
                        setTooltip(
                          <>
                            <div
                              style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "#212121",
                                marginBottom: "0.5rem",
                              }}
                            >
                              {isos._id}
                            </div>
                            <pre></pre>

                            {!influencerValue &&
                              !hashtagValue &&
                              !countryValue &&
                              !hideRank &&
                              isos.rank && (
                                <div
                                  style={{
                                    fontWeight: 400,
                                    fontSize: "12px",
                                    fontFamily: "Work-Sans",
                                    color: "#212121",
                                  }}
                                >
                                  Rank:{" "}
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      color: "#F05728",
                                    }}
                                  >
                                    {parseFloat(isos.rank, 2)}
                                  </span>
                                </div>
                              )}

                            <pre></pre>
                            <div
                              style={{
                                fontWeight: 400,
                                fontSize: "12px",
                                fontFamily: "Work-Sans",
                                color: "#212121",
                                marginTop: "-0.5rem",
                              }}
                            >
                              Wellbeing Interest :{" "}
                              <span
                                style={{ fontWeight: 600, color: "#F05728" }}
                              >
                                {nFormatter(isos.count)}
                              </span>
                            </div>
                            <pre></pre>
                            <div
                              style={{
                                fontWeight: 400,
                                fontSize: "12px",
                                color: "#212121",
                                fontFamily: "Work-Sans",
                                marginTop: "-0.5rem",
                              }}
                            >
                              Positive:{" "}
                              <span
                                style={{ fontWeight: 600, color: "#F05728" }}
                              >
                                {parseFloat(
                                  isos.happy % 1 !== 0
                                    ? isos.happy.toFixed(2)
                                    : isos.happy
                                )}
                                %
                              </span>
                            </div>
                            <pre></pre>
                            <div
                              style={{
                                fontWeight: 400,
                                fontSize: "12px",
                                color: "#212121",
                                fontFamily: "Work-Sans",
                                marginTop: "-0.5rem",
                              }}
                            >
                              Negative:{" "}
                              <span
                                style={{ fontWeight: 600, color: "#F05728" }}
                              >
                                {parseFloat(
                                  isos.sad_per % 1 !== 0
                                    ? isos.sad_per.toFixed(2)
                                    : isos.sad_per
                                )}
                                %
                              </span>
                            </div>
                            <pre></pre>
                            {!influencerValue &&
                              !hashtagValue &&
                              !countryValue &&
                              !influencerdata &&
                              !hideRank && (
                                <div
                                  style={{
                                    fontWeight: 400,
                                    fontSize: "12px",
                                    fontFamily: "Work-Sans",
                                    color: "#212121",
                                    marginTop: "-0.5rem",
                                  }}
                                >
                                  Net Change in Rank:{" "}
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      color: "#F05728",
                                    }}
                                  >
                                    {parseFloat(isos.change_in_rank, 2)}
                                  </span>
                                </div>
                              )}
                            <pre></pre>
                            <div
                              style={{
                                fontWeight: 400,
                                fontSize: "12px",
                                fontFamily: "Work-Sans",
                                color: "#212121",
                                marginTop: "-0.5rem",
                              }}
                            >
                              Change in Wellbeing Interest:{" "}
                              <span
                                style={{ fontWeight: 600, color: "#F05728" }}
                              >
                                {ParseFloat(isos.change_in_index_persentage, 2)}
                                %
                              </span>
                            </div>
                            <pre></pre>
                          </>
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltip("");
                      }}
                      style={{
                        default: {
                          // fill: "#D6D6DA",
                          outline: "none",
                        },
                        hover: {
                          fill: "#F05728",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
            {countryValue && (
              <>
                {mapDataApi &&
                  mapDataApi.length &&
                  mapDataApi.map(
                    ({
                      name,
                      cordinates,
                      rank,
                      count,
                      happy,
                      sad_per,
                      change_in_rank,
                      change_in_index_persentage,
                    }) => (
                      <Marker
                        onMouseEnter={() => {
                          setMapMarkerTooltip(
                            <>
                              <div
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: "#212121",
                                  paddingBottom: "1rem",
                                }}
                              >
                                {name}
                              </div>
                              <pre></pre>
                              {!influencerValue &&
                                !hashtagValue &&
                                !countryValue &&
                                !hideRank &&
                                rank && (
                                  <div
                                    style={{
                                      fontWeight: 400,
                                      fontSize: "12px",
                                      fontFamily: "Work-Sans",
                                      color: "#212121",
                                    }}
                                  >
                                    Rank:{" "}
                                    <span
                                      style={{
                                        fontWeight: 600,
                                        color: "#F05728",
                                      }}
                                    >
                                      {parseFloat(rank, 2)}
                                    </span>
                                  </div>
                                )}
                              <pre></pre>
                              <div
                                style={{
                                  fontWeight: 400,
                                  fontSize: "12px",
                                  fontFamily: "Work-Sans",
                                  color: "#212121",
                                  marginTop: "-0.5rem",
                                }}
                              >
                                Wellbeing Interest :{" "}
                                <span
                                  style={{ fontWeight: 600, color: "#F05728" }}
                                >
                                  {nFormatter(count)}
                                </span>
                              </div>
                              <pre></pre>
                              <div
                                style={{
                                  fontWeight: 400,
                                  fontSize: "12px",
                                  color: "#212121",
                                  fontFamily: "Work-Sans",
                                  marginTop: "-0.5rem",
                                }}
                              >
                                Positive:{" "}
                                <span
                                  style={{ fontWeight: 600, color: "#F05728" }}
                                >
                                  {parseFloat(
                                    happy % 1 !== 0 ? happy.toFixed(2) : happy
                                  )}
                                </span>
                              </div>
                              <pre></pre>
                              <div
                                style={{
                                  fontWeight: 400,
                                  fontSize: "12px",
                                  color: "#212121",
                                  fontFamily: "Work-Sans",
                                  marginTop: "-0.5rem",
                                }}
                              >
                                Negative:{" "}
                                <span
                                  style={{ fontWeight: 600, color: "#F05728" }}
                                >
                                  {parseFloat(
                                    sad_per % 1 !== 0
                                      ? sad_per.toFixed(2)
                                      : sad_per
                                  )}
                                  %
                                </span>
                              </div>
                              <pre></pre>
                              {!influencerValue &&
                                !hashtagValue &&
                                !countryValue &&
                                !influencerdata &&
                                !hideRank && (
                                  <div
                                    style={{
                                      fontWeight: 400,
                                      fontSize: "12px",
                                      fontFamily: "Work-Sans",
                                      color: "#212121",
                                      marginTop: "-0.5rem",
                                    }}
                                  >
                                    Net Change in Rank:{" "}
                                    <span
                                      style={{
                                        fontWeight: 600,
                                        color: "#F05728",
                                      }}
                                    >
                                      {parseFloat(change_in_rank, 2)}
                                    </span>
                                  </div>
                                )}
                              <pre></pre>
                              <div
                                style={{
                                  fontWeight: 400,
                                  fontSize: "12px",
                                  fontFamily: "Work-Sans",
                                  color: "#212121",
                                  marginTop: "-0.5rem",
                                }}
                              >
                                Change in Wellbeing Index:{" "}
                                <span
                                  style={{ fontWeight: 600, color: "#F05728" }}
                                >
                                  {ParseFloat(change_in_index_persentage, 2)}%
                                </span>
                              </div>
                              <pre></pre>
                            </>
                          );
                        }}
                        onMouseLeave={() => {
                          setMapMarkerTooltip("");
                        }}
                        key={name}
                        coordinates={
                          cordinates && cordinates.length ? cordinates : []
                        }
                      >
                        <circle
                          r={6}
                          fill="#F05728"
                          stroke="#fff"
                          strokeWidth={1}
                        />
                        {/* <text

                      
                    textAnchor="middle"
                    y={markerOffset}
                    style={{ fontFamily: "Work-Sans", fill: "#212121" }}
                  >
                    {name}
                  </text> */}
                      </Marker>
                    )
                  )}
              </>
            )}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </>
  );
};

export default Map;
