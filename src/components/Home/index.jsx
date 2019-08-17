import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withAuthentication, withEmailVerification } from '../Session';
import ChatListComponent from '../ChatList';
import * as ROUTES from '../../constants/routes';
import ChatViewComponent from '../ChatView';

import styles from './styles';

const initialState = {
  selectedChat: null,
  isNewChatVisible: false,
  email: null,
  chats: []
};

const HomePage = ({ firebase, history }) => {
  const [state, setState] = React.useState(initialState);

  const getChats = () => {
    firebase.auth.onAuthStateChanged(async user => {
      if (!user) {
        history.push(ROUTES.SIGN_IN);
      } else {
        await firebase.firestore
          .collection('chats')
          .where('users', 'array-contains', firebase.auth.currentUser.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(doc => doc.data());
            await setState({
              ...state,
              email: firebase.auth.currentUser.email,
              chats: chats
            });
          });
      }
    });
  };

  React.useEffect(() => getChats(), []);

  const newChatBtnClicked = () =>
    setState({ ...state, isNewChatVisible: true, selectedChat: null });

  const selectChat = index => {
    setState({ ...state, selectedChat: index })
  };

  return (
    <div>
      <ChatListComponent
        newChatBtnFn={newChatBtnClicked}
        selectChatFn={selectChat}
        chats={state.chats}
        userEmail={state.email}
        selectedChatIndex={state.selectedChat}
        test={console.log('state', state)}
      />
      {setState.isNewChatVisible && <ChatViewComponent user={state.email} chat={state.chats[state.selectedChat]}/>}
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthentication,
  withAuthorization(condition)
)(HomePage);
