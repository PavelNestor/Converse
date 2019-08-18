import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';

import styles from './styles';

const ChatTextBoxComponent = ({ classes, onSubmitMessage, onMessageRead }) => {
  const [message, setMessage] = React.useState('');

  const onUserTyping = event => {
    if (event.keyCode === 13) {
      submitMessage();
    } else {
      const text = event.target.value;
      setMessage(text); 
    }
  };

  const userClickedInput = event => onMessageRead()
  
  const messageValid = text => text && text.replace(/\s/g, '').length;

  const submitMessage = event => {
    if(messageValid(message)){
      onSubmitMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={classes.chatTextBoxContainer}>
      <TextField
        className={classes.chatTextBox}
        id="chat-text-box"
        onFocus={userClickedInput}
        onKeyUp={event => onUserTyping(event)}
        onChange={event => onUserTyping(event)}
        placeholder="Type your message..."
        value={message}
      />
      <Send className={classes.sendBtn} onClick={submitMessage} />
    </div>
  );
};

export default withStyles(styles)(ChatTextBoxComponent);
