import React from 'react'
import {connect} from 'react-redux'
import {fetchGroups} from '../store/groups'
import {selectConversation} from '../store/conversation'
import {NewGroup} from './NewGroup'

class Groups extends React.Component {
  constructor() {
    super()
    this.toMap = this.toMap.bind(this)
  }

  componentDidMount() {
    this.props.fetchgroups()
  }

  toMap(conversationId) {
    this.props.selectConversation(conversationId)
    this.props.history.push('/home')
  }

  render() {
    const {groups} = this.props
    return (
      <div>
        {groups.map(group => {
          return (
            <div key={group.id} onClick={() => this.toMap(group.id)}>
              <h1>Conversation {group.id}</h1>
              <h4>Includes:</h4>
              {group.participant.map(participant => (
                <p key={participant.id}>{participant.email}</p>
              ))}
            </div>
          )
        })}
        {/* <NewGroup /> */}
      </div>
    )
  }
}
const mapState = state => {
  return {
    groups: state.groups,
    conversation: state.conversation
  }
}

const mapDispatch = dispatch => {
  return {
    fetchgroups: () => dispatch(fetchGroups()),
    selectConversation: conversationId =>
      dispatch(selectConversation(conversationId))
  }
}

export default connect(mapState, mapDispatch)(Groups)
