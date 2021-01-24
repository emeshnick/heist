const User = require('./user')
const Message = require('./message')
const Conversation = require('./conversation')
const Marker = require('./marker')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Conversation, {through: 'threadUser', as: 'group'})
Conversation.belongsToMany(User, {through: 'threadUser', as: 'participant'})
Conversation.hasMany(Message)
Conversation.hasMany(Marker)
Message.belongsTo(User)
Message.belongsTo(Conversation)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Message,
  Conversation,
  Marker
}
