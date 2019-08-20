import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withAuthentication, withEmailVerification } from '../session';
import ChatListComponent from '../chatlist';
import ChatTextBoxComponent from '../chattextbox';
import * as ROUTES from '../../constants/routes';
import ChatViewComponent from '../chatview';

import styles from './styles';

const initialState = {
  chats: [],
  email: null,
  friends: [],
  selectedChat: null
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

  
  const clickedChatWhereNotSender = index => {
    return state.chats[index].messages[state.chats[index].messages.length - 1].sender !== state.email;
  };

  const selectChat =  index => {
    const newState = { ...state, selectedChat: index };
     setState(newState, () => messageRead());
  };

  const goToChat = async (docKey, message) => {
    const usersInChat = docKey.split(':');
    const chat = state.chats.find(chat => usersInChat.every(user => chat.users.includes(user)));
    setState({ ...state, isNewChatVisible: false });
    await selectChat(state.chats.indexOf(chat));
    submitMessage(message);
  };

  const buildDocKey = friend => {
    return [state.email, friend].sort().join(':');
  };

  const messageRead = () => {
    const docKey = buildDocKey(
      state.chats[state.selectedChat].users.filter(user => user !== state.email)[0]
    );
    if (clickedChatWhereNotSender(state.selectedChat)) {
      firebase.firestore
        .collection('chats')
        .doc(docKey)
        .update({ reciverHasRead: true });
    }
  };

  const submitMessage = message => {
    const docKey = buildDocKey(
      state.chats[state.selectedChat].users.filter(user => user !== state.email)[0]
    );
    const newMessages = state.chats[state.selectedChat].messages;
    newMessages.push({
      sender: state.email,
      message: message,
      timestamp: Date.now(),
    });
    firebase.firestore
      .collection('chats')
      .doc(docKey)
      .update({
        messages: newMessages,
        reciverHasRead: false
      });
  };

  return (
    <div className="dashboard-container" id="dashboard-container">
      <ChatListComponent
        onSelectChat={selectChat}
        chats={state.chats}
        userEmail={state.email}
        selectedChatIndex={state.selectedChat}
      />
      {!state.isNewChatVisible && (
        <>
          <ChatViewComponent
            test={console.log('state.isNewChatVisible -', state.isNewChatVisible)}
            user={state.email}
            chat={state.chats[state.selectedChat]}
          />
          {state.selectedChat !== null && <ChatTextBoxComponent onSubmitMessage={submitMessage} onMessageRead={messageRead} />}
        </>
      )}
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthentication,
  withAuthorization(condition)
)(HomePage);
