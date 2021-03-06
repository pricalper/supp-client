import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';

// ACTIONS
import { saveUpdatedConversations } from './../../Actions/userConversationsActions'

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      conversations: state.userConversations.conversations,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveUpdatedConversations: (conversations) => dispatch(saveUpdatedConversations(conversations)),
  }
}

class MessagesCables extends Component {
  // If a new broadcasted message from websockets is received, find the corresponding conversation and append it.
  handleReceivedMessage = (response) => {
      const { message } = response;
      const conversations = [...this.props.conversations];
      const conversation = conversations.find(
        conversation => conversation.id === message.conversation_id
      );
      conversation.messages = [...conversation.messages, message];
      this.props.saveUpdatedConversations(conversations)
  };

  render () {
    return (
      <Fragment>
        {this.props.conversations.map(conversation => {
          return (
            <ActionCable
              key={conversation.id}  //mapping purposes
              channel={{ 
                channel: 'MessagesChannel', 
                conversation: conversation.id }}
              onReceived={this.handleReceivedMessage}
            />
          )
        })}
      </Fragment>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesCables);