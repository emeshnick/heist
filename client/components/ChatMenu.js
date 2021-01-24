import React from 'react'
import Chat from './Chat'
import {Button, Dropdown, MenuItem} from 'react-bootstrap'
import {connect} from 'react-redux'

class ChatMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  toggle = () => {
    this.setState(oldstate => ({open: !oldstate.open}))
  }

  onToggle = (isOpen, e, source) => {
    //This closes the menu on toggling the dropdown or hitting esc.
    if (source.source === 'click' || source.source === 'rootClose') {
      this.toggle()
    }
  }

  render() {
    const {conversation} = this.props
    return (
      <div
        ref={ref => (this.myRef = ref)}
        id="navChat"
        className="CustomDropdown"
      >
        {conversation.id ? (
          <Dropdown
            open={this.state.open}
            onToggle={this.onToggle}
            id="Dropdown"
          >
            <Dropdown.Toggle
            // style={{textAlign: right, paddingBottom: 5}}
            >
              Messages
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{
                overflowY: 'scroll',
                maxHeight:
                  window.innerHeight -
                  (this.myRef
                    ? this.myRef.getBoundingClientRect().top +
                      this.myRef.getBoundingClientRect().height +
                      100
                    : 200)
              }}
            >
              <Chat conversationId={conversation.id} />
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <h3>Choose Group To Begin Heist</h3>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    conversation: state.conversation
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(ChatMenu)
