const router = require('express').Router()
const {Conversation, Marker} = require('../db/models')
module.exports = router

router.get('/:conversationId', async (req, res, next) => {
  try {
    const group = await Conversation.findByPk(req.params.conversationId, {
      include: {
        model: Marker
      }
    })
    const markers = group.markers
    res.json(markers)
  } catch (err) {
    next(err)
  }
})

router.put('/:conversationId', async (req, res, next) => {
  try {
    const newMarker = await Marker.create(req.body.marker)
    res.json(newMarker)
  } catch (err) {
    next(err)
  }
})
