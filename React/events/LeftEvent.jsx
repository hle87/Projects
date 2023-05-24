import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function LeftEvent(props) {
  console.log("leftEventProps", props);
  const metaEvent = props.theEvents;
  const latitude = metaEvent.metaData.location.latitude;
  const long = metaEvent.metaData.location.longitude;
  return (
    <React.Fragment>
      <div className="row pt-4" key={metaEvent.id}>
        <div className="panel panel-default">
          <h1 className="panel-heading"> {metaEvent.name}</h1>
          <img src={metaEvent.slug} className="card-img-top" alt="content" />
          <h3 className="panael-body">{metaEvent.headline}</h3>
          <h6 className="panael-body">{metaEvent.metaData.location.address}</h6>
          <h6 className="panael-body">{metaEvent.metaData.location.zipCode}</h6>
          <LoadScript googleMapsApiKey="AIzaSyBzqIzl7gh3GpZiaWvLJIC6VWU-Hp85Xx4">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              lat={latitude}
              long={long}
            ></GoogleMap>
          </LoadScript>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(LeftEvent);
