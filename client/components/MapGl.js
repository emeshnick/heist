import React from 'react'
import {connect} from 'react-redux'
import {
  fetchMarkers,
  addMarker,
  receiveMarker,
  deleteMarker,
  deletedMarker
} from '../store/markers'
// import mapboxgl from 'mapbox-gl'
import ReactMapGL, {Popup} from 'react-map-gl'
import socket from '../socket'

import Pins from './pins'
import MarkerDescription from './MarkerDescription'

const mapboxToken =
  'pk.eyJ1IjoiZW1lc2huaWNrIiwiYSI6ImNraHVzdjZ0cjFhdHUycG5wMzM4YjQxNm8ifQ.tmoY8tVhd9okCvVgWwZapQ'
class MapGl extends React.Component {
  constructor(props) {
    super(props)
    this.stopPropagation = this.stopPropagation.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.deleteMarker = this.deleteMarker.bind(this)
    this.onClickMarker = this.onClickMarker.bind(this)
    this.renderPopup = this.renderPopup.bind(this)

    this.state = {
      viewport: {
        latitude: 35.9,
        longitude: -79,
        zoom: 9,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    }
  }

  componentDidMount() {
    this.props.fetchMarkers(1)

    //Set up socket to receive marker and send to redux reducer
    socket.on('marker', data => this.props.receiveMarker(data.markerId))

    //Calls action creator from markers reducer since nothing
    //needs to be requested from the database
    socket.on('marker-delete', data => {
      this.props.deletedMarker(data.markerId)
      if (this.state.popupInfo && data.markerId === this.state.popupInfo.id) {
        this.setState({popupInfo: null})
      }
    })
  }

  //Creates new marker object and sends to redux reducer
  addMarker(lngLat) {
    const newMarker = {
      conversationId: 1,
      lngLat: lngLat,
      descriptions: []
    }
    this.props.addMarker(newMarker)
  }

  //Deletes marker and sends to redux reducer
  //Sets state so that popup closes
  deleteMarker(markerId) {
    this.props.deleteMarker(markerId)
    this.setState({popupInfo: null})
  }

  onClickMarker = marker => {
    this.setState({popupInfo: marker})
  }

  stopPropagation = event => {
    event.nativeEvent.stopImmediatePropagation()
  }

  renderPopup() {
    const {popupInfo} = this.state
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.lngLat[0]}
          latitude={popupInfo.lngLat[1]}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <MarkerDescription
            info={popupInfo}
            deleteMarker={this.deleteMarker}
            stopPropagation={this.stopPropagation}
          />
        </Popup>
      )
    )
  }

  render() {
    const {markers} = this.props
    return (
      <ReactMapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={mapboxToken}
        onClick={event => this.addMarker(event.lngLat)}
      >
        <Pins data={markers} onClickMarker={this.onClickMarker} />
        {this.renderPopup()}
      </ReactMapGL>
    )
  }
}

const mapState = state => {
  return {
    conversation: state.conversation,
    markers: state.markers
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMarkers: conversationId => dispatch(fetchMarkers(conversationId)),
    addMarker: marker => dispatch(addMarker(marker)),
    receiveMarker: markerId => dispatch(receiveMarker(markerId)),
    deleteMarker: markerId => dispatch(deleteMarker(markerId)),
    deletedMarker: markerId => dispatch(deletedMarker(markerId))
  }
}

export default connect(mapState, mapDispatch)(MapGl)
