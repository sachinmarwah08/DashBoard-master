import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const center = {
  lat: 40,
  lng: 70,
};

const containerStyle = {
  width: "auto",
  height: "100%",
  borderRadius: "8px",
};

function MyComponent() {
  const [widthState, setWidthState] = useState(null);

  // useEffect(() => {
  //   console.log("window.innerWidth", window.innerWidth);
  //   setWidthState(window.innerWidth);
  // }, []);

  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: "AIzaSyC_3Wo9FRrSnT4idegucxu2wIjVgPJH84I",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      margin="auto"
      center={center}
      zoom={2}
      // onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
