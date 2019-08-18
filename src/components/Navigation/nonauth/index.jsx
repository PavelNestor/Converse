import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from '@material-ui/core/styles/withStyles';
import * as ROUTES from '../../../constants/routes';

import styles from './styles';

const NavigationNonAuth = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <img src="mstile-70x70.png" alt="logo" className={classes.logo} />
        <Typography variant="h6" className={classes.title} href={ROUTES.SIGN_IN}>
          Converse
        </Typography>
        <Button className={classes.menuButton} color="inherit" href={ROUTES.SIGN_IN}>Sign In</Button>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon  className={classes.burger} />
        </IconButton>
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(NavigationNonAuth);
