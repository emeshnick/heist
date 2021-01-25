import axios from 'axios'
import socket from '../socket'

const FETCH_MARKERS = 'FETCH_MARKER'
const ADD_MARKER = 'ADD_MARKER'
// const RECEIVE_MARKER = 'RECEIVE_MARKER'
const DELETE_MARKER = 'DELETE_MARKER'

const fetchedMarkers = markers => {
  return {
    type: FETCH_MARKERS,
    markers
  }
}

const addedMarker = marker => {
  return {
    type: ADD_MARKER,
    marker
  }
}

export const deletedMarker = markerId => {
  console.log('deleting', markerId)
  return {
    type: DELETE_MARKER,
    markerId
  }
}

export const fetchMarkers = conversationId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/markers/conversation/${conversationId}`
      )
      dispatch(fetchedMarkers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addMarker = marker => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/markers/${marker.conversationId}`, {
        marker: marker
      })
      socket.emit('send-marker', {markerId: data.id})
      dispatch(addedMarker(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const receiveMarker = markerId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/markers/${markerId}`)
      dispatch(addedMarker(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteMarker = markerId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/markers/${markerId}`)
      socket.emit('send-marker-delete', {markerId: markerId})
      dispatch(deletedMarker(markerId))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MARKERS:
      return action.markers
    case ADD_MARKER:
      return [...state, action.marker]
    // case RECEIVE_MARKER:
    //   return [...state, action.marker]
    case DELETE_MARKER:
      const newMarkers = state.filter(marker => marker.id !== action.markerId)
      return newMarkers
    default:
      return state
  }
}
