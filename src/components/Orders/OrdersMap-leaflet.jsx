
import React, { useState, useEffect, useRef, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { getOrdersMap } from '../../actions/orders';
import moment from 'moment';
import { getDeliveryAreas } from '../../actions/listings';



const OrdersMap = ({ props }) => {
  const mapRef = useRef();
  const defaultCenter = useRef([45.5553667, 10.1450559]);
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

  const position = listing
  ? [listing.lat,  listing.lng]
  : [];
  

  return (
    <div id="map-container">
  <MapContainer center={[45.5553667, 10.1450559]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
          {areas.map(({ paths, archived, color, name }, index) =>
          !archived ? (
            <Polyline
              key={index}
              label={name}
              pathOptions={{
                fillColor: color || `#2196F3`,
                strokeColor: color || `#2196F3`,
                fillOpacity: 0.2,
                strokeOpacity: 0.5,
                strokeWeight: 2,
              }}
              positions={paths}
            />
          ) : null
        )}
  <Marker position={[45.5553667, 10.1450559]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </div>

  );
};

export default OrdersMap;
