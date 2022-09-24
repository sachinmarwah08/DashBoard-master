import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { countries } from "./TestData";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

const colorScale = scaleLinear()
  .domain([0, 6300000])
  .range(["#CD5C5C", "#FFA07A"]);

const marker = [
  {
    markerOffset: -15,
    name: "Sau Paulo",
    cordinates: [-58.3816, -34.6037],
  },
  {
    markerOffset: -15,
    name: "Melbourne",
    cordinates: [144.963038, -37.813629],
  },
  {
    markerOffset: 25,
    name: "Dhaka",
    cordinates: [90.412521, 23.810331],
  },
  //   {
  //     markerOffset: 25,
  //     name: "India",
  //     cordinates: [20, 77],
  //   },
  {
    markerOffset: 25,
    name: "San Francisco",
    cordinates: [-122.419418, 37.774929],
  },
];

const Map = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [tootilp, setTooltip] = useState("");
  const [data] = useState(countries);

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
  return (
    <>
      <ReactTooltip>{tootilp}</ReactTooltip>
      <div
        data-tip=""
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ComposableMap>
          {data.length > 0 ? (
            <ZoomableGroup
              zoom={1.2}
              // zoom={position.zoom}
              // center={position.coordinates}
              // onMoveEnd={handleMoveEnd}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isos = data.find((s) => s.ISO3 === geo.id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={
                          isos
                            ? colorScale([isos.population_density])
                            : "#D6D6DA"
                        }
                        onMouseEnter={() => {
                          setTooltip(`${geo.properties.name}`);
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
              {marker.map(({ name, cordinates, markerOffset }) => (
                <Marker
                  onMouseEnter={() => {
                    setTooltip(`${name}`);
                  }}
                  onMouseLeave={() => {
                    setTooltip("");
                  }}
                  key={name}
                  coordinates={cordinates}
                >
                  <circle r={10} fill="red" stroke="#fff" strokeWidth={2} />
                  {/* <text
                    textAnchor="middle"
                    y={markerOffset}
                    style={{ fontFamily: "Work-Sans", fill: "#212121" }}
                  >
                    {name}
                  </text> */}
                </Marker>
              ))}
            </ZoomableGroup>
          ) : (
            <p>Loading...</p>
          )}
        </ComposableMap>
      </div>
    </>
  );
};

export default Map;
