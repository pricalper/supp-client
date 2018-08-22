import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react'

//ADAPTERS
import Adapters from './../Adapters/Adapters';
import {API_SHORT_ROOT} from './../Adapters/AdapterConstants';

//COMPONENTS
import NewMessageForm from './NewMessageForm';

// ACTIONS
import { cleanSelectedConversation } from '../actions'

// REDUX PROPS 
const mapStateToProps = state => {
  return {
      userId: state.userId,
      conversations: state.conversations,
      selectedConversation: state.selectedConversation,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cleanSelectedConversation: () => dispatch(cleanSelectedConversation()),
  }
}

const MessagesArea = (props) => {

  function friendUser () {
      return props.selectedConversation.users.find((u) => u.id !== props.userId).username
  }

  function orderedMessages () {
    const sortedMessages = props.selectedConversation.messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
      return  <div 
                key={message.id}
                className="message-box"
              >
              <p>{`${Adapters.capitalize(message.user.username)}: ${message.text}`}</p>
              </div>;
    });
  };

  return (
    <div className="messages-box animated slideInUp delay-5s">
      <div className="messages-header">
          <div className="chat-header-title">
              <Icon 
              color='teal' 
              name='chat'
              /> 
              with {Adapters.capitalize(friendUser())}
          </div>
          <img 
            className="chat-header-image"
            src={
                props.selectedConversation.users.find((u) => u.id !== props.userId).profile_image_url !== "undefined"
            ? `${API_SHORT_ROOT+props.selectedConversation.users.find((u) => u.id !== props.userId).profile_image_url}` 
            : `/assets/avatars/avatar${Math.ceil(Math.random() * Math.floor(4))}.gif`
            }
            alt="Mini profile"
          />
            <Icon 
              onClick={props.cleanSelectedConversation}
              color='teal' 
              name='close'
            />
      </div>
      <div className="outer-messages-list">
        <div className="messages-list">
          {orderedMessages()}
        </div>
      </div>
      <NewMessageForm conversation_id={props.selectedConversation.id} />
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(MessagesArea);