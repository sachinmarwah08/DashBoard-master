import React, { useState } from "react";
import ReactGlobe from "react-globe";
import * as THREE from "three";

const Globe = ({ mapDataApi }) => {
  console.log("chutiya", mapDataApi);
  const markers = [
    {
      id: "marker1",
      city: "Singapore",
      color: "red",
      coordinates: [1.3521, 103.8198],
      value: 50,
    },
    {
      id: "marker2",
      city: "New York",
      color: "blue",
      coordinates: [40.73061, -73.935242],
      value: 25,
    },
    {
      id: "marker3",
      city: "San Francisco",
      color: "orange",
      coordinates: [37.773972, -122.431297],
      value: 35,
    },
    {
      id: "marker4",
      city: "Beijing",
      color: "gold",
      coordinates: [39.9042, 116.4074],
      value: 135,
    },
    {
      id: "marker5",
      city: "London",
      color: "green",
      coordinates: [51.5074, 0.1278],
      value: 80,
    },
    {
      id: "marker6",
      city: "Los Angeles",
      color: "gold",
      coordinates: [29.7604, -95.3698],
      value: 54,
    },
  ];

  const options = {
    // ambientLightColor: "red",
    cameraRotateSpeed: 0.1,
    focusAnimationDuration: 2000,
    // focusEasingFunction: ["Linear", "None"],
    // pointLightColor: "gold",
    // pointLightIntensity: 1.5,
    globeGlowColor: "blue",
    markerTooltipRenderer: (marker) => `${marker.city}`,
  };

  const renderer = new THREE.WebGLRenderer({
    logging: false,
  });

  const [globe, setGlobe] = useState(null);

  return (
    <div>
      {mapDataApi && mapDataApi.length && (
        <ReactGlobe
          height="524px"
          // initialCoordinates={[1.3521, 103.8198]}
          globeBackgroundTexture={null}
          // markers={markers}
          markers={mapDataApi}
          options={options}
          globeTexture="https://unpkg.com/three-globe@2.18.5/example/img/earth-blue-marble.jpg"
          width="100%"
          onClickMarker={(marker, markerObject, event) =>
            console.log(marker, markerObject, event)
          }
          onGetGlobe={setGlobe}
          onMouseOutMarker={(marker, markerObject, event) =>
            console.log(marker, markerObject, event)
          }
          onGlobeTextureLoaded={() => console.log("globe loaded")}
          onMouseOverMarker={(marker, markerObject, event) =>
            console.log(marker, markerObject, event)
          }
        />
      )}
    </div>
  );
};

export default Globe;
