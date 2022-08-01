import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "636px",
  height: "462px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function MyComponent() {
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
    <div style={{ margin: "auto" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        margin="auto"
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
