/*global google */
import React, { useContext } from 'react';
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { FilterContext } from '../../../../context/FilterContext';

const center = {
  lat: 20,
  lng: 77,
};

const containerStyle = {
  width: 'auto',
  height: '100%',
  borderRadius: '0.5rem',
};

function MyComponent({
  isLoaded,
  setActiveMarker,
  handleOnLoad,
  handleActiveMarker,
  mapDataApi,
  activeMarker,
}) {
  const { state } = useContext(FilterContext);
  // console.log(state);
  const { influencerValue, hashtagValue, countryValue } = state.filters;
  function twoDecimalPlacesIfCents(amount) {
    return amount % 1 !== 0 ? amount.toFixed(2) : amount;
  }

  function ParseFloat(str, val) {
    str = str.toString();
    str = str.slice(0, str.indexOf('.') + val + 1);
    return Number(str);
  }

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num;
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
      zoom={5}
      onLoad={handleOnLoad}
      // onUnmount={onUnmount}
    >
      {mapDataApi &&
        mapDataApi.map(
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
              // icon={icon}
              key={_id}
              position={position}
              onMouseOver={() => handleActiveMarker(_id)}
              onMouseOut={() => handleActiveMarker()}
            >
              {activeMarker === _id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#212121',
                        lineHeight: '24px',
                        fontFamily: 'Work-Sans',
                      }}
                    >
                      {_id}
                    </div>
                    <pre></pre>
                    {rank && (
                      <div
                        style={{
                          fontWeight: 400,
                          fontSize: '12px',
                          fontFamily: 'Work-Sans',
                          color: '#212121',
                        }}
                      >
                        Rank:{' '}
                        <span style={{ fontWeight: 600, color: '#F05728' }}>
                          {rank}
                        </span>
                      </div>
                    )}
                    <pre></pre>
                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        fontFamily: 'Work-Sans',
                        color: '#212121',
                        marginTop: '-0.5rem',
                      }}
                    >
                      Wellbeing Index :{' '}
                      <span style={{ fontWeight: 600, color: '#F05728' }}>
                        {nFormatter(count)}
                      </span>
                    </div>
                    <pre></pre>
                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        color: '#212121',
                        fontFamily: 'Work-Sans',
                        marginTop: '-0.5rem',
                      }}
                    >
                      Positive:{' '}
                      <span style={{ fontWeight: 600, color: '#F05728' }}>
                        {twoDecimalPlacesIfCents(happy)}%
                      </span>
                    </div>
                    <pre></pre>

                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        color: '#212121',
                        fontFamily: 'Work-Sans',
                        marginTop: '-0.5rem',
                      }}
                    >
                      Negative:{' '}
                      <span style={{ fontWeight: 600, color: '#F05728' }}>
                        {twoDecimalPlacesIfCents(sad_per)}%
                      </span>
                    </div>

                    <pre></pre>
                    {/* {change_in_rank ? ( */}
                    {!influencerValue && !hashtagValue && !countryValue && (
                      <div
                        style={{
                          fontWeight: 400,
                          fontSize: '12px',
                          fontFamily: 'Work-Sans',
                          color: '#212121',
                          marginTop: '-0.5rem',
                        }}
                      >
                        Net Change in Rank:{' '}
                        <span style={{ fontWeight: 600, color: '#F05728' }}>
                          {change_in_rank}
                        </span>
                      </div>
                    )}
                    {/* ) : ( "" )} */}
                    <pre></pre>
                    <div
                      style={{
                        fontWeight: 400,
                        fontSize: '12px',
                        fontFamily: 'Work-Sans',
                        color: '#212121',
                        marginTop: '-0.5rem',
                      }}
                    >
                      Change in Wellbeing Index:{' '}
                      <span style={{ fontWeight: 600, color: '#F05728' }}>
                        {ParseFloat(change_in_index_persentage, 2)}%
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
