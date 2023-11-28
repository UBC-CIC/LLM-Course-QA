import React from 'react';
import PropTypes from 'prop-types';
import './ChatMessage.css';
import { Message } from '../pages/Chat';

const ChatMessage = (props: Message) => {
  const messageClass = props.sender === 'me' ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      {props.sender === 'loading' ? (
        <div className="loading-animation">Loading...</div>
      ) : (
        <p className="content">{props.content}</p>
      )}
    </div>
  );
};

export default ChatMessage;
