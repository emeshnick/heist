import axios from 'axios'

const FETCH_GROUPS = 'FETCH_GROUPS'
const CREATE_GROUP = 'CREATE_GROUP'

const fetchedGroups = groups => {
  return {
    type: FETCH_GROUPS,
    groups
  }
}

const createdGroup = group => {
  return {
    type: CREATE_GROUP,
    group
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

export const createGroup = participantId => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/conversation', {participantId})
      dispatch(createdGroup(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_GROUPS:
      return action.groups
    case CREATE_GROUP:
      return [action.group, ...state]
    default:
      return state
  }
}
