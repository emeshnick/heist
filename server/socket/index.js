module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('send-marker', data => {
      socket.broadcast.emit('marker', data)
    })

    socket.on('send-marker-delete', data => {
      socket.broadcast.emit('marker-delete', data)
    })

    socket.on('send-chat-message', (message, userId) => {
      socket.broadcast.emit('chat-message', {...message, userId: userId})
    })
  })
}
