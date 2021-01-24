import axios from 'axios'

const FETCH_MARKERS = 'FETCH_MARKER'
const ADD_MARKER = 'ADD_MARKER'

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

export const fetchMarkers = conversationId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/markers/${conversationId}`)
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
      dispatch(addedMarker(data))
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
    default:
      return state
  }
}
