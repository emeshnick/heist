import React, {useState} from 'react'
import {connect} from 'react-redux'
import {fetchMarkers, addMarker} from '../store/markers'
// import mapboxgl from 'mapbox-gl'
import ReactMapGL, {Popup} from 'react-map-gl'
import socket from '../socket'

import Pins, {pinSize} from './pins'
import MarkerDescription from './MarkerDescription'

const mapboxToken =
  'pk.eyJ1IjoiZW1lc2huaWNrIiwiYSI6ImNraHVzdjZ0cjFhdHUycG5wMzM4YjQxNm8ifQ.tmoY8tVhd9okCvVgWwZapQ'
class MapGl extends React.Component {
  constructor(props) {
    super(props)
    this.addMarker = this.addMarker.bind(this)
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
  }

  //Creates new marker object and sends to redux store
  addMarker(lngLat) {
    const newMarker = {
      conversationId: 1,
      lngLat: lngLat,
      descriptions: []
    }
    this.props.addMarker(newMarker)
  }

  onClickMarker = marker => {
    this.setState({popupInfo: marker})
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
          <MarkerDescription info={popupInfo} />
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
    addMarker: marker => dispatch(addMarker(marker))
  }
}

export default connect(mapState, mapDispatch)(MapGl)
