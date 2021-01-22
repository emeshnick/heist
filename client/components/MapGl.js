import React from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import socket from '../socket'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZW1lc2huaWNrIiwiYSI6ImNraHVzdjZ0cjFhdHUycG5wMzM4YjQxNm8ifQ.tmoY8tVhd9okCvVgWwZapQ'

class MapGl extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79, 35.9],
      zoom: 9
    })

    this.map.on('click', e => {
      const coords = `lat: ${e.lngLat.lat} <br> lng: ${e.lngLat.lng}`
      const popup = new mapboxgl.Popup().setText(coords)
      new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .setPopup(popup)
        .addTo(this.map)
      socket.emit('marker', {coords: coords, lngLat: e.lngLat})
    })

    socket.on('marker', data => {
      const popup = new mapboxgl.Popup().setText(data.coords)
      new mapboxgl.Marker()
        .setLngLat(data.lngLat)
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  render() {
    return <div id="map" />
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(MapGl)
