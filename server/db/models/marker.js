const Sequelize = require('sequelize')
const db = require('../db')

const Marker = db.define('marker', {
  lngLat: {
    type: Sequelize.JSON
  },
  descriptions: {
    type: Sequelize.JSON
  }
})

module.exports = Marker
