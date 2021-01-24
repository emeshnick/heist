import axios from 'axios'
import socket from '../socket'

const ADD_MESSAGE = 'ADD_MESSAGE'
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'
const FETCH_CONVERSATION = 'FETCH_CONVERSATION'

//Action creator to add message by sending updated conversation
const addedMessage = message => {
  return {
    type: ADD_MESSAGE,
    message
  }
}

//Action creator to fetch conversation
const fetchedConversation = conversation => {
  return {
    type: FETCH_CONVERSATION,
    conversation
  }
}

//Method to recieve message and add to state but not the database
export const receiveMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    message
  }
}

//Takes message makes api request to add it to conversation dispatches
export const addMessage = message => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/conversation/${message.conversationId}`,
        {
          message
        }
      )
      socket.emit('send-chat-message', {data})
      dispatch(addedMessage(data))
    } catch (err) {
      console.error(err)
    }
  }
}

//Takes conversation id makes request to api dispatches conversation
export const fetchConversation = conversationId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/conversation/${conversationId}`)
      dispatch(fetchedConversation(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {...state, messages: [...state.messages, action.message]}
    case RECEIVE_MESSAGE:
      return {...state, messages: [...state.messages, action.message]}
    case FETCH_CONVERSATION:
      return action.conversation
    default:
      return state
  }
}
