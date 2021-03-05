import React from "react";
import Chat from "./Chat";
import { Button, Dropdown, MenuItem } from "react-bootstrap";
import { connect } from "react-redux";

class ChatBar extends React.Component {
  render() {
    const { conversation } = this.props;
    return (
      <div id="chatbar">
        {conversation.id ? (
          <Chat conversationId={conversation.id} />
        ) : (
          <h2>Rendering Chat Bar</h2>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    conversation: state.conversation,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(ChatBar);
