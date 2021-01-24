const router = require('express').Router()
const {Conversation, Message, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.user.id},
      include: {
        model: Conversation,
        as: 'group',
        include: {
          model: User,
          as: 'participant'
        }
      }
    })
    const groups = user.group
    res.json(groups)
  } catch (err) {
    next(err)
  }
})

router.get('/:conversationId', async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      include: {
        model: Message
      },
      where: {
        id: req.params.conversationId
      }
    })
    res.json(conversation)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const newGroup = await Conversation.create()
    const participant = await User.findByPk(req.body.data.participantId)
    newGroup.addParticipant(participant)
    res.json(newGroup)
  } catch (err) {
    next(err)
  }
})

router.get('/:conversationId/participants', async (req, res, next) => {
  try {
    const groups = await Conversation.findAll({
      include: {
        model: User,
        as: 'participant'
      }
    })
    res.json(groups)
  } catch (err) {
    next(err)
  }
})

router.put('/:conversationId', async (req, res, next) => {
  try {
    const message = await Message.create(req.body.message)
    const conversation = await Conversation.findByPk(req.params.conversationId)
    await conversation.addMessage(message)
    res.json(message)
  } catch (err) {
    next(err)
  }
})
