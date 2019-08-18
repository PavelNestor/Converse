import React from 'react';
import { compose } from 'recompose';

import { withAuthorization, withAuthentication, withEmailVerification } from '../Session';
import ChatListComponent from '../ChatList';
import ChatTextBoxComponent from '../chattextbox';
import * as ROUTES from '../../constants/routes';
import ChatViewComponent from '../ChatView';
import NewChatComponent from '../newchat';

import styles from './styles';

const fb = require("firebase");
// Required for side-effects
require("firebase/firestore");


const initialState = {
  chats: [],
  email: null,
  friends: [],
  isNewChatVisible: false,
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

  const newChatBtnClicked = () => {
    console.log('newChatBtnClicked');

    setState({ ...state, isNewChatVisible: true, selectedChat: null });
  };

  const clickedChatWhereNotSender = index => {
    console.log('state.chats[index]', state.chats[index]);

    return state.chats[index].messages[state.chats[index].messages.length - 1].sender !== state.email;
  };

  const selectChat =  index => {
    console.log('index', index);

    const newState = { ...state, selectedChat: index };
    console.log('newState +++', newState);

     setState(newState, () => messageRead());
    console.log('state +++', state);
  };

  const goToChat = async (docKey, message) => {
    console.log('docKey', docKey);
    console.log('message', message);

    const usersInChat = docKey.split(':');
    const chat = state.chats.find(chat => usersInChat.every(user => chat.users.includes(user)));
    setState({ ...state, isNewChatVisible: false });
    await selectChat(state.chats.indexOf(chat));
    submitMessage(message);
  };

  const newChatSubmit = async chatObj => {
    console.log('chatObj', chatObj);

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
    selectChat(state.chats.length - 1);
  };

  const buildDocKey = friend => {
    console.log('friend', friend);

    return [state.email, friend].sort().join(':');
  };

  const messageRead = () => {
    console.log('state', state);

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
    
    console.log('docKey', docKey);
    console.log('state', state.chats[state.selectedChat].messages);

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
        onNewChatBtn={newChatBtnClicked}
        onSelectChat={selectChat}
        chats={state.chats}
        userEmail={state.email}
        selectedChatIndex={state.selectedChat}
      />
      {!state.isNewChatVisible ? (
        <>
          <ChatViewComponent
            test={console.log('state.isNewChatVisible -', state.isNewChatVisible)}
            user={state.email}
            chat={state.chats[state.selectedChat]}
          />
          {state.selectedChat !== null && <ChatTextBoxComponent onSubmitMessage={submitMessage} onMessageRead={messageRead} />}
        </>
      ) : (
        <NewChatComponent
          test={console.log('state.isNewChatVisible', state.isNewChatVisible)}
          onGoToChat={goToChat}
          onNewChatSubmit={newChatSubmit}
        />
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
