import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

import styles from './styles';

class ChatListComponent extends React.Component {
  newChat = () => this.props.onNewChatBtn();

  selectChat = index => {
    this.props.onSelectChat(index);
  };

  userIsSender = chat => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;

  render() {
    const { classes, chats, selectedChatIndex, userEmail } = this.props;

    return (
      <main className={classes.root}>
        <Button
          className={classes.newChatButton}
          color="primary"
          fullWidth
          onClick={this.newChat}
          variant="contained"
        >
          New Message
        </Button>
        {chats && (
          <List>
            {chats.map((chat, index) => {
              return (
                <div key={index}>
                  <ListItem
                    alignItems="flex-start"
                    onClick={() => this.selectChat(index)}
                    className={classes.listItem}
                    selected={selectedChatIndex === index}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        {chat && chat.users
                          .filter(user => user !== userEmail)[0]
                          .split('')[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={chat.users.filter(user => user !== userEmail)[0]}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" color="textPrimary" test={console.log('chat', chat.messages[chat.messages.length - 1])}>
                            {chat && chat.messages[chat.messages.length - 1].message.substring(0, 30)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    {!chat.reciverHasRead && !this.userIsSender(chat) ? (
                      <ListItemIcon>
                        <NotificationImportant className={classes.unreadMessage} />
                      </ListItemIcon>
                    ) : null}
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        )}
      </main>
    );
  }
}

export default withStyles(styles)(ChatListComponent);
