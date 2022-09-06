/*global google */

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  MarkerF,
} from "@react-google-maps/api";
import { getMapData } from "../../../../actions/GoogleMapApis";
import { countryData } from "./Cordinates";

const center = {
  lat: 40,
  lng: 70,
};

const containerStyle = {
  width: "auto",
  height: "100%",
  borderRadius: "0.5rem",
};

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 },
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 },
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 },
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 40.712776, lng: -74.005974 },
  },
];

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBjcLIeVQ02aYHchflfqslJz_9NPLYfNP0", // Add your API key
  });
  console.log(window.google, "gogol");

  const [activeMarker, setActiveMarker] = useState(null);
  const [mapData, setMapData] = useState();

  useEffect(() => {
    const callApi = async () => {
      // let today = Date.now();
      // var check = moment(today);
      // var month = check.format("M");
      // var day = check.format("D");
      // var year = check.format("YYYY");
      // let fromDate = `${year}-${month}-01`;
      // let toDate = `${year}-${month}-${day}`;
      // console.log(month, day, year);

      let fromDate = "2022-07-01";
      let toDate = "2022-07-26";
      let country = "United States";
      const response = await getMapData(fromDate, toDate, country);

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
      setMapData(tempData);
    };
    callApi();
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    mapData && mapData.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  let iconMarker = new window.google.maps.MarkerImage(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrCU2BSbAzpeyJx_rxUONfn8cVSwGsuF4ig&usqp=CAU",
    null /* size is determined at runtime */,
    null /* origin is 0,0 */,
    null /* anchor is bottom center of the scaled image */,
    new window.google.maps.Size(50, 50)
  );

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null);
  // }, []);

  return isLoaded ? (
    <GoogleMap
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={containerStyle}
      margin="auto"
      center={center}
      zoom={2}
      onLoad={handleOnLoad}
      // onUnmount={onUnmount}
    >
      {mapData &&
        mapData.map(({ id, name, position }) => (
          <MarkerF
            // icon={iconMarker}
            key={id}
            position={position}
            onClick={() => handleActiveMarker(name._id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{name}</div>
              </InfoWindow>
            ) : null}
          </MarkerF>
        ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
