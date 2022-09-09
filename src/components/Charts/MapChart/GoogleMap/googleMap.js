/*global google */

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { getMapData } from "../../../../actions/GoogleMapApis";
import { countryData } from "./Cordinates";

const center = {
  lat: 38,
  lng: -99,
};

const containerStyle = {
  width: "auto",
  height: "100%",
  borderRadius: "0.5rem",
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBjcLIeVQ02aYHchflfqslJz_9NPLYfNP0", // Add your API key
  });

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
      let toDate = "2022-07-31";
      let country = "United States";
      const response = await getMapData(fromDate, toDate);

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

  function twoDecimalPlacesIfCents(amount) {
    return amount % 1 !== 0 ? amount.toFixed(2) : amount;
  }

  // let iconMarker = new window.google.maps.MarkerImage(
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrCU2BSbAzpeyJx_rxUONfn8cVSwGsuF4ig&usqp=CAU",
  //   null /* size is determined at runtime */,
  //   null /* origin is 0,0 */,
  //   null /* anchor is bottom center of the scaled image */,
  //   new window.google.maps.Size(50, 50)
  // );

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   mapData && mapData.forEach(({ position }) => bounds.extend(position));
  //   map.fitBounds(bounds);
  //   setMapData(map);
  // }, []);

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMapData(null);
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
        mapData.map(
          ({
            _id,
            position,
            rank,
            count,
            happy,
            change_in_rank,
            sad_per,
            change_in_index_persentage,
          }) => (
            <MarkerF
              // icon={iconMarker}
              key={_id}
              position={position}
              onClick={() => handleActiveMarker(_id)}
            >
              {activeMarker === _id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#212121",
                        lineHeight: "24px",
                        fontFamily: "Work-Sans",
                      }}
                    >
                      {_id}
                    </div>
                    <pre></pre>
                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: "12px",
                        fontFamily: "Work-Sans",
                        color: "#212121",
                      }}
                    >
                      Rank:{" "}
                      <span style={{ fontWeight: 600, color: "#F05728" }}>
                        {rank}
                      </span>
                    </div>
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
                      Wellbeing Index :{" "}
                      <span style={{ fontWeight: 600, color: "#F05728" }}>
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
                      <span style={{ fontWeight: 600, color: "#F05728" }}>
                        {twoDecimalPlacesIfCents(happy)}%
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
                      <span style={{ fontWeight: 600, color: "#F05728" }}>
                        {twoDecimalPlacesIfCents(sad_per)}%
                      </span>
                    </div>
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
                      Net Change in Rank:{" "}
                      <span style={{ fontWeight: 600, color: "#F05728" }}>
                        {change_in_rank}
                      </span>
                    </div>
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
                      Percentage Change in Wellbeing Index:{" "}
                      <span style={{ fontWeight: 600, color: "#F05728" }}>
                        {twoDecimalPlacesIfCents(change_in_index_persentage)}
                      </span>
                    </div>

                    <pre></pre>
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          )
        )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
