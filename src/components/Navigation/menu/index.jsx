import React from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Menu, MenuItem, Fade} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../firebase';
import * as ROUTES from '../../../constants/routes';

import styles from '../styles';

const useStyles = makeStyles(styles);

const MenuComponent = ({ firebase }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    console.log('event.currentTarget', event.currentTarget);
    
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton  aria-label="menu" aria-controls="menu" aria-haspopup="true" edge="start" className={classes.menuButton} color="inherit" onClick={handleClick}>
          <MoreVertIcon className={classes.burger} />
        </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={firebase.doSignOut}><Link to={ROUTES.LANDING}>Logout</Link></MenuItem>
      </Menu>
    </div>
  );
}

export default withFirebase(MenuComponent);
