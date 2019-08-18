import React from 'react';
import { compose } from 'recompose';

import {
  Button,
  CssBaseline,
  FormControl,
  Typography,
  Input,
  InputLabel,
  Paper,
  withStyles
} from '@material-ui/core';

import { withAuthorization, withAuthentication, withEmailVerification } from '../Session';

import styles from './styles';

const initialState = {
  username: null,
  message: null
};

const NewChatComponent = ({ classes, firebase, onNewChatSubmit, onGoToChat }) => {
  console.log('NewChatComponent');

  const [state, setState] = React.useState(initialState);

  const userTyping = ({target: { name, value }}) => {
    console.log('name', name);
    console.log('value', value);

    setState({ ...state, [name]: value });
  };

  const buildDocKey = () => [firebase.auth.currentUser.email, state.username].sort().join(':');

  const isUserExists = async () => {
    const userSnapshot = await firebase.firestore.collection('users').get();
    console.log('userSnapshots', userSnapshot);
    const exists = userSnapshot.docs.map(doc => {
      console.log('doc', doc.data().email);
      console.log('doc', state.username);
      
      return  doc.data().email
    }).includes(state.username);
    console.log('isUserExists', exists);
    setState({ ...state, serverError: !exists });
    return exists;
  };

  const isChatExists = async () => {
    const docKey = buildDocKey();
    const chat = await firebase.firestore
      .collection('chats')
      .doc(docKey)
      .get();
    console.log('Chat Exists', chat.exists);
    return chat.exists;
  };

  const submitNewChat = async event => {
    event.preventDefault();
    console.log('event', event);
    
    const userExists = await isUserExists();
    console.log('userExists', userExists);

    if (userExists) {
      const chatExists = await isChatExists();
      chatExists ? goToChat() : createChat();
    }
  };

  const goToChat = async () => {
    onGoToChat(buildDocKey(), state.message);
  };

  const createChat = async () => {
    onNewChatSubmit({
      sendTo: state.username,
      message: state.message
    });
  };

  return (
    <div className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Send A Message!
        </Typography>
        <form className={classes.form} onSubmit={event => submitNewChat(event)}>
          <FormControl fullWidth>
            <InputLabel htmlFor="new-chat-username">Enter Your Friend's Email</InputLabel>
            <Input
              required
              className={classes.input}
              autoFocus
              name='username'
              onChange={event => userTyping(event)}
              id="new-chat-username"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="new-chat-message">Enter Your Message</InputLabel>
            <Input
              required
              className={classes.input}
              autoFocus
              name='message'
              onChange={event => userTyping(event)}
              id="new-chat-message"
            />
          </FormControl>
          <Button
            fullWidth
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </form>
      </Paper>
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthentication,
  withAuthorization(condition),
  withStyles(styles)
)(NewChatComponent);
