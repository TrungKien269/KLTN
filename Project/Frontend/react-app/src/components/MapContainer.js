import React, { useState, useMemo, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";

function MapContainer(props) {

  const [lat, setLat] = useState(10.851769);
  const [lng, setLng] = useState(106.772179);

  Geocode.setApiKey("AIzaSyChZPizXo_3sk70Cm4yveOd0YfQtuxc7As");
  Geocode.setLanguage("vn");
  Geocode.setRegion("vn");

  const LoadMap = useMemo(() => {
    const mapStyles = {
      width: "100%",
      height: "75%",
      position: "static"
    };

    return (
      <div>
        <Map
          google={props.google}
          zoom={15}
          style={mapStyles}
          initialCenter={{ lat: lat, lng: lng }}
          containerStyle={{
            height: `400px`,
          }}
        >
          <Marker position={{ lat: lat, lng: lng }} />
        </Map>
      </div>
    );
  });

  return (
    <React.Fragment>
      {LoadMap}
    </React.Fragment>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyChZPizXo_3sk70Cm4yveOd0YfQtuxc7As"
})(MapContainer);
