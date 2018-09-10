import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';

// ACTIONS
import { appendNewConversation } from '../../actions'

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    appendNewConversation: (newConversation) => dispatch(appendNewConversation(newConversation)),
  }
}

class ConversationsCables extends Component {

  // If a new broadcasted conversation from websockets is received, check if user is one of the user ids to whom the conversation belongs to (users are serialized). If so, appended into the list of conversations.
  handleReceivedConversation = (response) => {
    const { conversation } = response;
    if (conversation.users.map((i)=> i.id).includes(this.props.userId)) {
      this.props.appendNewConversation(conversation);
    }
  };

  render() {
    return (
            <ActionCable
                channel={{ 
                  channel: 'ConversationsChannel'
                }}
                onReceived={(response) => this.handleReceivedConversation(response)}
            />
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsCables);