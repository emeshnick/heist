const markers = []

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('marker', data => {
      markers.push(data)
      io.emit('marker', data)
    })
  })
}
