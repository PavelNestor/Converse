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
import { Search } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';

import { withFirebase } from '../../firebase';
import MenuComponent from '../menu';
import * as ROUTES from '../../../constants/routes';

import styles from '../styles';

const NavigationNonAuth = ({ classes, firebase }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <img src="mstile-70x70.png" alt="logo" className={classes.logo} />
        <Typography variant="h6" className={classes.title}>
          Converse
        </Typography>
        <Button
          className={classes.menuButton}
          color="inherit"
          href={ROUTES.SIGN_IN}
          onClick={firebase.doSignOut}
        >
          Sign Out
        </Button>
        <InputBase
          className={classes.inputSearch}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton className={classes.searchButton} aria-label="search">
          <Search size='medium'/>
        </IconButton>
        <Divider className={classes.divider} />
        <MenuComponent />
      </Toolbar>
    </AppBar>
  </div>
);

export default withStyles(styles)(withFirebase(NavigationNonAuth));
