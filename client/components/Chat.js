import React from 'react'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import socket from '../socket'

class Chat extends React.Component {
  render() {
    return <div id="chat-container" />
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Chat)
