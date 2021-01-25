import React, {useState} from 'react'
import {connect} from 'react-redux'
import {fetchMarkers, addMarker} from '../store/markers'
// import mapboxgl from 'mapbox-gl'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import socket from '../socket'

// mapboxgl.accessToken =
//   'pk.eyJ1IjoiZW1lc2huaWNrIiwiYSI6ImNraHVzdjZ0cjFhdHUycG5wMzM4YjQxNm8ifQ.tmoY8tVhd9okCvVgWwZapQ'
const mapboxToken =
  'pk.eyJ1IjoiZW1lc2huaWNrIiwiYSI6ImNraHVzdjZ0cjFhdHUycG5wMzM4YjQxNm8ifQ.tmoY8tVhd9okCvVgWwZapQ'
class MapGl extends React.Component {
  constructor() {
    super()
    this.mapBoxMarkers = []
    this.addMarker = this.addMarker.bind(this)
    this.makeGroupMarker = this.makeGroupMarker.bind(this)

    this.state = {
      viewport: {
        latitude: 35.9,
        longitude: -79,
        zoom: 9,
        bearing: 0,
        pitch: 0,
      },
    }
  }

  componentDidMount() {
    //Create map and add to 'map' div
    // this.map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   center: [-79, 35.9],
    //   zoom: 9,
    // })
    // //To locate user on map
    // this.map.addControl(
    //   new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //       enableHighAccuracy: true,
    //     },
    //     trackUserLocation: true,
    //   })
    // )
    //Create handler for user to add marker
    // this.map.on('click', (event) => {
    //   const coords = `lat: ${event.lngLat.lat} <br> lng: ${event.lngLat.lng}`
    //   this.addMarker({
    //     coords: coords,
    //     lngLat: event.lngLat,
    //   })
    //   this.makeGroupMarker(coords, event.lngLat)
    //   socket.emit('marker', {coords: coords, lngLat: event.lngLat})
    // })
    // //Socket to receive marker data and add to map
    // socket.on('marker', (data) => {
    //   this.addMarker(data)
    // })
    // console.log('props are', this.props)
    // this.props.conversation.id &&
    //   this.props.fetchMarkers(this.props.conversation.id)
  }

  //Helper function to use to add marker to local map
  addMarker(marker) {
    // const popup = new mapboxgl.Popup().setText(marker.coords)
    // const addedMarker = new mapboxgl.Marker()
    //   .setLngLat(marker.lngLat)
    //   .setPopup(popup)
    //   .addTo(this.map)
    // addedMarker.getElement().addEventListener('click', () => {
    //   console.log('clicked marker ', marker)
    // })
    // this.mapBoxMarkers.push(addedMarker)
  }

  makeGroupMarker(coords, lngLat) {
    const newMarker = {
      conversationId: 1,
      lngLat: lngLat,
      coords: coords,
      descriptions: [],
    }
    this.props.addMarker(newMarker)
  }

  render() {
    const {markers} = this.props
    markers.map((marker) => this.addMarker(marker))
    return (
      <ReactMapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={mapboxToken}
      />
    )
  }
}

const mapState = (state) => {
  return {
    conversation: state.conversation,
    markers: state.markers,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchMarkers: (conversationId) => dispatch(fetchMarkers(conversationId)),
    addMarker: (marker) => dispatch(addMarker(marker)),
  }
}

export default connect(mapState, mapDispatch)(MapGl)
