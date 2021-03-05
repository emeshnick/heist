import React from "react";
import { connect } from "react-redux";
import {
  fetchMarkers,
  addMarker,
  receiveMarker,
  deleteMarker,
  deletedMarker,
} from "../store/markers";
import { Button } from "react-bulma-components";
import ReactMapGL, { Popup, GeolocateControl } from "react-map-gl";
import socket from "../socket";

import Pins from "./pins";
import MarkerDescription from "./MarkerDescription";
import UserMarker from "./UserMarker";

const mapboxToken =
  "pk.eyJ1IjoiZW1lc2huaWNrIiwiYSI6ImNraHVzdjZ0cjFhdHUycG5wMzM4YjQxNm8ifQ.tmoY8tVhd9okCvVgWwZapQ";

const geolocateStyle = {
  bottom: 0,
  right: 0,
  margin: 10,
  position: "fixed",
  captureClick: "true",
};
const positionOptions = { enableHighAccuracy: true };
class MapGl extends React.Component {
  constructor(props) {
    super(props);
    this.addMarker = this.addMarker.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this);
    this.onClickMarker = this.onClickMarker.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
    this.checkPopup = this.checkPopup.bind(this);

    this.state = {
      viewport: {
        width: "100%",
        height: "100%",
        latitude: 35.9,
        longitude: -79,
        zoom: 9,
        bearing: 0,
        pitch: 0,
      },
      popupInfo: null,
      userLocation: {
        lngLat: [],
      },
    };
  }

  componentDidMount() {
    this.props.fetchMarkers(1);

    //Set up socket to receive marker and send to redux reducer
    socket.on("marker", (data) => this.props.receiveMarker(data.markerId));

    //Calls action creator from markers reducer since nothing
    //needs to be requested from the database
    socket.on("marker-delete", (data) => {
      this.props.deletedMarker(data.markerId);
      if (this.state.popupInfo && data.markerId === this.state.popupInfo.id) {
        this.setState({ popupInfo: null });
      }
    });
  }

  //Resize map
  onViewportChange(viewport) {
    this.setState({
      viewport: { ...viewport, height: "100%", width: "100%" },
    });
  }

  //Creates new marker object and sends to redux reducer
  addMarker(event) {
    if (window.innerHeight - event.center.y > 50) {
      const newMarker = {
        conversationId: 1,
        lngLat: event.lngLat,
        descriptions: [],
      };
      this.props.addMarker(newMarker);
    }
  }

  //Deletes marker and sends to redux reducer
  //Sets state so that popup closes
  deleteMarker(markerId) {
    this.props.deleteMarker(markerId);
  }

  onClickMarker = (marker) => {
    this.setState({ popupInfo: marker });
  };

  renderPopup() {
    const { popupInfo } = this.state;
    //checks if markers includes the current popup marker id

    return (
      popupInfo && (
        <span onClick={() => window.setTimeout(this.checkPopup, 1000)}>
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.lngLat[0]}
            latitude={popupInfo.lngLat[1]}
            closeOnClick={false}
            onClose={() => this.setState({ popupInfo: null })}
          >
            <MarkerDescription
              info={popupInfo}
              deleteMarker={this.deleteMarker}
            />
          </Popup>
        </span>
      )
    );
  }

  checkPopup() {
    const { markers } = this.props;
    let markerDeleted = true;
    for (let i = 0; i < markers.length; i++) {
      if (markers[i].id === this.state.popupInfo.id) {
        markerDeleted = false;
      }
    }
    if (markers && this.state.popupInfo && markerDeleted) {
      this.setState({ popupInfo: null });
    }
  }

  //User location methods
  sendCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((data) =>
      this.setState({
        userLocation: {
          lngLat: [data.coords.longitude, data.coords.latitude],
        },
      })
    );

    // this.getPosition()
    //   .then((data) => {
    //     return {
    //       userLocation: {
    //         lngLat: [data.coords.longitude, data.coords.latitude],
    //       },
    //     }
    //   })
    //   .then((data) => this.setState({userLocation: data}))
  };

  // getPosition() {
  // }

  renderUserMarker(userMarker) {
    return <UserMarker userMarker={userMarker} />;
  }

  render() {
    const { markers } = this.props;
    return (
      <div id="map-gl">
        <ReactMapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={(viewport) => this.onViewportChange(viewport)}
          mapboxApiAccessToken={mapboxToken}
          onClick={(event) => this.addMarker(event)}
          style={{ marginbottom: 30 }}
          id="react-map-gl"
        >
          {this.state.userLocation.lngLat.length &&
            this.renderUserMarker(this.state.userLocation.lngLat)}
          <Pins data={markers} onClickMarker={this.onClickMarker} />
          {this.renderPopup(markers)}
          <div id="geolocate">
            <GeolocateControl
              style={geolocateStyle}
              captureClick={false}
              positionOptions={positionOptions}
              trackUserLocation={true}
            />
          </div>
        </ReactMapGL>

        <Button id="send-location-button" onClick={this.sendCurrentLocation}>
          Send Current Location
        </Button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    conversation: state.conversation,
    markers: state.markers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchMarkers: (conversationId) => dispatch(fetchMarkers(conversationId)),
    addMarker: (marker) => dispatch(addMarker(marker)),
    receiveMarker: (markerId) => dispatch(receiveMarker(markerId)),
    deleteMarker: (markerId) => dispatch(deleteMarker(markerId)),
    deletedMarker: (markerId) => dispatch(deletedMarker(markerId)),
  };
};

export default connect(mapState, mapDispatch)(MapGl);
