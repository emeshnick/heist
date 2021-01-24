import axios from 'axios'

const FETCH_GROUPS = 'FETCH_GROUPS'

const fetchedGroups = groups => {
  return {
    type: FETCH_GROUPS,
    groups
  }
}

export const fetchGroups = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/conversation')
      dispatch(fetchedGroups(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_GROUPS:
      return action.groups
    default:
      return state
  }
}
