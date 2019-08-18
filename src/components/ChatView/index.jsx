import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

const ChatViewComponent = ({ classes, chat, user }) => {

  const scrollToEnd = () => {
    const container = document.getElementById('chatview-container');
    if(container){
      container.scrollTo(0, container.scrollHeight);
    }
  }

  React.useEffect(() => scrollToEnd(), []); //TODO Change 
  
  return (
    chat ? (
      <>
        <div className={classes.chatHeader}>{
          chat.users.filter(usr => usr !== user).get(0)
        }</div>
        <main id={'chatview-container'} className={classes.content}>
          {chat.messages.map((msg, index) => {
            return (
              <div key={index} className={msg.sender === user ? classes.userSent : classes.friendSent}>
                {msg.message}
              </div>
            )
          })}
        </main>
      </>
    ) : (
      <div>No chats</div>
    )
  );
};

export default withStyles(styles)(ChatViewComponent);