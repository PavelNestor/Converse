import React from 'react';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Button,
  Divider,
  IconButton,
  InputBase,
  Toolbar,
  Typography
} from '@material-ui/core';
import { PersonAdd as PersonAddIcon } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';

import { withFirebase } from '../../firebase';
import MenuComponent from '../menu';
import NewChatComponent from '../../newchat';
import * as ROUTES from '../../../constants/routes';

import styles from '../styles';


const initialState = {
  email: null,
  isNewChatVisible: false,
};

const NavigationNonAuth = ({ classes, firebase }) => {
  const [state, setState] = React.useState(initialState);

  const newChatBtnClicked = () => {
    setState({ ...state, isNewChatVisible: true });
  };
  
  const buildDocKey = friend => {
    return [state.email, friend].sort().join(':');
  };
  
  const newChatSubmit = async chatObj => {
    const docKey = buildDocKey(chatObj.sendTo);
    await firebase.firestore
      .collection('chats')
      .doc(docKey)
      .set({
        reciverHasRead: false,
        users: [state.email, chatObj.sendTo],
        messages: [
          {
            message: chatObj.message,
            sender: state.email
          }
        ]
      });
    await setState({ ...state, isNewChatVisible: false }); //????
    // selectChat(state.chats.length - 1);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src="mstile-70x70.png" alt="logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            Converse
          </Typography>

          <IconButton className={classes.searchButton} onClick={newChatBtnClicked}>
            <PersonAddIcon />
          </IconButton>
          <MenuComponent />
        </Toolbar>
      </AppBar>
     {state.isNewChatVisible && (
        <NewChatComponent
          // onGoToChat={goToChat}
          onNewChatSubmit={newChatSubmit}
        />
      )}
    </div>
  );
};
export default withStyles(styles)(withFirebase(NavigationNonAuth));
