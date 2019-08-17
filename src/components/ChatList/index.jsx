import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
// import NotificationImportant from '@material-ui/core/NotificationImportant';

import styles from './styles';

class ChatListComponent extends React.Component {
  newChat = () => {};

  selectChat = index => {
    this.props.selectChatFn(index);
  };

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
                        {chat.users
                          .filter(user => user !== userEmail)
                          .get(0)
                          .split('')
                          .get(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={chat.users.filter(user => user !== userEmail).get(0)}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" color="textPrimary">
                            {chat.messages[chat.messages - 1].message.substring(0, 30)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
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
