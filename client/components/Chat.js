import React from 'react'
import {Form, Button} from 'react-bulma-components'
import {connect} from 'react-redux'
import {
  addMessage,
  receiveMessage,
  fetchConversation
} from '../store/conversation'
import socket from '../socket'
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      content: ''
    }
    this.setUpSocket = this.setUpSocket.bind(this)
    this.setUpSocket()
  }

  componentDidMount() {
    this.props.fetchConversation(1)
  }

  //Socket method
  setUpSocket() {
    socket.on('chat-message', data => {
      this.props.receiveMessage(data.data)
    })
  }

  //Form methods
  onChange(event) {
    const state = {...this.state}
    state[event.target.name] = event.target.value
    this.setState(state)
  }

  handleSubmit(event) {
    event.preventDefault()
    const message = {
      content: this.state.content,
      conversationId: this.props.conversation.id,
      userId: this.props.user.id
    }
    this.props.addMessage(message)
    this.setState({
      content: ''
    })
  }

  render() {
    const {conversation, user} = this.props
    return (
      <div id="chat-container">
        {conversation.messages &&
          conversation.messages.map(message => {
            if (message.userId === user.id) {
              return (
                <div key={message.id}>
                  <p>You: {message.content}</p>
                </div>
              )
            } else {
              return (
                <div key={message.id}>
                  <p>
                    User{message.userId}: {message.content}
                  </p>
                </div>
              )
            }
          })}
        <form onSubmit={this.handleSubmit}>
          <Form.Field size="small">
            <Form.Input
              placeholder="Message"
              name="content"
              type="text"
              onChange={this.onChange}
              value={this.state.content}
            />
            <Form.Control>
              <Button className="submit-button is-focused is-primary">
                <strong>Submit</strong>
              </Button>
            </Form.Control>
          </Form.Field>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    conversation: state.conversation
  }
}

const mapDispatch = dispatch => {
  return {
    addMessage: message => dispatch(addMessage(message)),
    receiveMessage: message => dispatch(receiveMessage(message)),
    fetchConversation: conversationId =>
      dispatch(fetchConversation(conversationId))
  }
}

export default connect(mapState, mapDispatch)(Chat)
