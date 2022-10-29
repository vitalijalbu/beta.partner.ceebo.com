import React, { useState, useEffect, useRef, memo } from 'react';
import { LoadScript, GoogleMap, Marker, InfoWindow, Polygon } from '@react-google-maps/api';
import markerIconActive from '../../assets/img/markerA.svg';
import markerIconCurrent from '../../assets/img/markerC.svg';

import { getOrdersMap } from '../../actions/orders';
import moment from 'moment';
import { getDeliveryAreas } from '../../actions/listings';

const OrdersMap = ({ opened, current }) => {
  const mapRef = useRef();
  const defaultCenter = useRef({ lat: 45.5415526, lng: 10.2118019 });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [listing, setListing] = useState(null);
  const [selected, setSelected] = useState(null);
  const [areas, setAreas] = useState([]);


  useEffect(() => {
    getDeliveryAreas()
      .then(({ data }) => {
        setAreas(data?.data || []);
        //console.log(delivery_areas);
        //setSummary(data?.summary || {});
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
    

  useEffect(() => {
    if (opened) {
      getOrdersMap().then(({ data }) => {
        setData(data?.data || []);
        //
        //console.log('map-orders', data);
        setListing(data?.listing || null);
        const bounds = new window.google.maps.LatLngBounds();
        const list = data.data;
        list.forEach((item) => {
          if (item.dropoff?.location) {
            bounds.extend(item.dropoff?.location);
          }
        });
        if (current?.dropoff?.location) {
          bounds.extend(current.dropoff?.location);
        }
        if (!bounds.isEmpty()) {
          mapRef.current.fitBounds(bounds);
        }
      });
    }
  }, [current, opened]);

  const handleClose = () => {
    setSelected(null);
  };

  //console.log("data---->", data);
  const position = listing
    ? {
        lat: listing.lat,
        lng: listing.lng,
      }
    : null;
    
    
  return (
    <div id="map-block">
       <LoadScript
        googleMapsApiKey="AIzaSyD2Lw1USpgz3afQT0hgVzaquw3g7tprClg"
      >
     <div style={{ width: '100%', height: '460px', flex: '1 1 auto' }}>
      <GoogleMap
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          maxZoom: 16,
          mapTypeControl: false,
        }}
        zoom={13}
        version="weekly"
        center={defaultCenter.current}
        mapContainerClassName="map-container"
        onLoad={(map) => (mapRef.current = map)}
      >
        {areas.map(({ paths, archived, color }, index) =>
          !archived ? (
            <Polygon
              key={index}
              label="deded"
              options={{
                fillColor: color || `#2196F3`,
                strokeColor: color || `#2196F3`,
                fillOpacity: 0.2,
                strokeOpacity: 0.5,
                strokeWeight: 2,
              }}
              path={paths}
            />
          ) : null
        )}
        {data.map((item, i) =>
          item.location ? (
            <Marker
              zoom={16}
              key={item.id}
              zIndex={i + 1}
              onClick={() => setSelected(item)}
              position={item.location}
              icon={{
                url: markerIconActive,
                scaledSize: new window.google.maps.Size(52, 34),
              }}
              label={item.dropoff_deadline}
            />
          ) : null
        )}

        {!!current?.dropoff?.location && (
          <Marker
            zoom={16}
            zIndex={1000}
            position={current.dropoff.location}
            onClick={() =>
              setSelected({
                id: current.id,
                dropoff_deadline:
                  typeof current.dropoff_deadline === 'string'
                    ? current.dropoff_deadline
                    : moment(current.dropoff_deadline).format(
                        'DD MMM YYYY HH:mm'
                      ),
                formatted_address: current.dropoff.formatted_address,
                location: current.dropoff.location,
              })
            }
            icon={{
              url: markerIconCurrent,
              scaledSize: new window.google.maps.Size(52, 34),
            }}
            label={{
              text:
                typeof current.dropoff_deadline === 'string'
                  ? current.dropoff_deadline
                  : moment(current.dropoff_deadline).format('HH:mm'),
              color: 'white',
            }}
          />
        )}

        {!!selected && (
          <InfoWindow position={selected.location} onCloseClick={handleClose}>
            <div className="info-window">
              <b>#{selected.id}</b> <br />
              {selected.dropoff_deadline} <br />
              {selected.formatted_address}
            </div>
          </InfoWindow>
        )}
        {position && (
          <Marker
            position={position}
            icon={{
              url: 'https://cdn.ceebo.com/assets/images/restaurant_pin.svg',
              scaledSize: new window.google.maps.Size(64, 40),
            }}
          />
        )}
      </GoogleMap>
    </div>
      </LoadScript>
      </div>
  );
};

export default memo(OrdersMap);
