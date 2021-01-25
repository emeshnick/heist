import io from 'socket.io-client'
// import store from '/store'
// import {addMessage} from '/store/conversation'
const socket = io(window.location.origin)

// const markers = []
// const users = {}

socket.on('connect', () => {
  console.log('Connected!')
})

// socket.on('new-user', (name) => {
//   users[socket.id] = name
//   socket.broadcast.emit('user-connected', name)
// })

// socket.on('send-chat-message', () => {
//   console.log('socket is emitting')
//   socket.broadcast.emit('chat-message')
// })

// socket.on('disconnect', () => {
//   socket.broadcast.emit('user-disconnected', users[socket.id])
//   delete users[socket.id]
// })

export default socket
